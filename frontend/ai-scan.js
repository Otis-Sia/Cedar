// ═══════════════════════════════════════════════════════════════════
// Cedar — AI CV Scanner & Form Auto-Fill Engine
// Uses pdf.js + mammoth.js (CDN) for client-side text extraction,
// then calls the Next.js /api/parse-cv endpoint which uses Gemini.
// ═══════════════════════════════════════════════════════════════════

(function () {
    'use strict';

    // ── Configuration ────────────────────────────────────────────────
    const API_URL = 'http://localhost:3000/api/parse-cv';

    // CDN URLs for file parsers
    const PDFJS_CDN   = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs';
    const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';
    const MAMMOTH_CDN  = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js';

    // ── State ────────────────────────────────────────────────────────
    let selectedFile = null;
    let pdfjsLib = null;
    let mammothReady = false;
    let cvUploadArea = null; // resolved in DOMContentLoaded

    // ── Load pdf.js dynamically ──────────────────────────────────────
    async function loadPdfJs() {
        if (pdfjsLib) return pdfjsLib;
        try {
            const module = await import(PDFJS_CDN);
            module.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
            pdfjsLib = module;
            return module;
        } catch (err) {
            console.error('Failed to load pdf.js:', err);
            throw new Error('Could not load PDF parser. Please try again.');
        }
    }

    // ── Load mammoth.js dynamically ──────────────────────────────────
    function loadMammoth() {
        return new Promise((resolve, reject) => {
            if (window.mammoth || mammothReady) {
                mammothReady = true;
                resolve(window.mammoth);
                return;
            }
            const script = document.createElement('script');
            script.src = MAMMOTH_CDN;
            script.onload = () => { mammothReady = true; resolve(window.mammoth); };
            script.onerror = () => reject(new Error('Could not load DOCX parser.'));
            document.head.appendChild(script);
        });
    }

    // ── Extract text from uploaded file ──────────────────────────────
    async function extractText(file) {
        const ext = file.name.split('.').pop()?.toLowerCase();

        if (ext === 'pdf') {
            const pdfjs = await loadPdfJs();
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items
                    .filter(item => 'str' in item)
                    .map(item => item.str)
                    .join(' ');
                fullText += pageText + '\n';
            }
            return fullText;
        }

        if (ext === 'docx') {
            const mammoth = await loadMammoth();
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            return result.value;
        }

        throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
    }

    // ── Build progress overlay UI ────────────────────────────────────
    function createProgressOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'aiScanOverlay';
        overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center';
        overlay.style.cssText = 'background: rgba(27,48,34,0.65); backdrop-filter: blur(8px);';
        overlay.innerHTML = `
            <div class="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl text-center space-y-6 relative overflow-hidden">
                <div class="absolute top-0 left-0 right-0 h-1 bg-black/5">
                    <div id="aiScanProgress" class="h-full bg-gradient-to-r from-cedar-forest to-cedar-bronze transition-all duration-700 ease-out" style="width: 0%"></div>
                </div>
                <div class="w-20 h-20 rounded-full bg-cedar-forest/10 flex items-center justify-center mx-auto">
                    <span class="material-symbols-outlined text-4xl text-cedar-forest animate-spin" style="animation-duration: 2s;">auto_awesome</span>
                </div>
                <div>
                    <h3 class="font-headline text-2xl font-bold text-cedar-midnight mb-2">AI Scan in Progress</h3>
                    <p id="aiScanStatus" class="text-sm text-cedar-slate">Preparing your document…</p>
                </div>
                <div class="flex items-center gap-3 p-4 bg-cedar-alabaster rounded-xl border border-black/5 text-left">
                    <span class="material-symbols-outlined text-cedar-bronze text-lg">description</span>
                    <div>
                        <p id="aiScanFileName" class="text-sm font-bold text-cedar-midnight truncate max-w-[280px]">—</p>
                        <p id="aiScanFileSize" class="text-[10px] uppercase tracking-widest text-cedar-slate font-semibold">—</p>
                    </div>
                </div>
                <p class="text-[11px] text-cedar-slate/60 italic">Your data is encrypted and processed securely.</p>
            </div>
        `;
        document.body.appendChild(overlay);
        return {
            overlay,
            progress: overlay.querySelector('#aiScanProgress'),
            status:   overlay.querySelector('#aiScanStatus'),
            fileName: overlay.querySelector('#aiScanFileName'),
            fileSize: overlay.querySelector('#aiScanFileSize'),
        };
    }

    function updateOverlay(els, { progress, status, fileName, fileSize }) {
        if (progress !== undefined && els.progress) els.progress.style.width = progress + '%';
        if (status   !== undefined && els.status)   els.status.textContent = status;
        if (fileName !== undefined && els.fileName) els.fileName.textContent = fileName;
        if (fileSize !== undefined && els.fileSize) els.fileSize.textContent = fileSize;
    }

    function removeOverlay() {
        const el = document.getElementById('aiScanOverlay');
        if (el) {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.4s ease';
            setTimeout(() => el.remove(), 400);
        }
    }

    // ── Show success / error toast ───────────────────────────────────
    function showToast(message, isError = false) {
        const existing = document.getElementById('cedarToast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'cedarToast';
        toast.style.cssText = `
            position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(20px);
            z-index: 10000; padding: 16px 28px; border-radius: 16px; font-size: 14px;
            font-weight: 600; display: flex; align-items: center; gap: 10px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15); opacity: 0;
            transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
            background: ${isError ? '#dc2626' : '#1B3022'}; color: white;
        `;
        toast.innerHTML = `
            <span class="material-symbols-outlined text-lg">${isError ? 'error' : 'check_circle'}</span>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // ── Show file preview in upload area ─────────────────────────────
    function showFilePreview(file) {
        if (!cvUploadArea) return;
        const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
        cvUploadArea.innerHTML = `
            <div class="flex items-center gap-4 w-full">
                <div class="w-14 h-14 rounded-2xl bg-cedar-forest/10 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-2xl text-cedar-forest">description</span>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-cedar-midnight truncate">${escapeHtml(file.name)}</p>
                    <p class="text-[10px] text-cedar-slate uppercase tracking-widest font-semibold">${ext} · ${sizeMB} MB</p>
                </div>
                <button type="button" id="removeFileBtn" class="w-9 h-9 rounded-xl bg-white border border-black/10 flex items-center justify-center text-cedar-slate hover:text-red-500 hover:border-red-200 transition-all shrink-0">
                    <span class="material-symbols-outlined text-base">close</span>
                </button>
            </div>
            <input class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" type="file" accept=".pdf,.docx" aria-label="File upload" />
        `;
        // Re-bind events
        const newInput = cvUploadArea.querySelector('input[type="file"]');
        newInput.addEventListener('change', handleFileSelect);

        const removeBtn = document.getElementById('removeFileBtn');
        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                resetUploadArea();
            });
        }
    }

    function resetUploadArea() {
        selectedFile = null;
        if (!cvUploadArea) return;
        cvUploadArea.innerHTML = `
            <div class="w-16 h-16 rounded-full bg-cedar-alabaster flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform border border-black/5 shadow-sm text-cedar-bronze">
                <span class="material-symbols-outlined text-3xl">cloud_upload</span>
            </div>
            <h4 class="font-headline text-xl font-bold text-cedar-midnight mb-2">Drag and drop your file here</h4>
            <p class="text-cedar-slate text-sm mb-6">Or click to browse from your computer</p>
            <div class="flex gap-3">
                <span class="px-4 py-1.5 rounded-lg bg-white text-cedar-slate text-[10px] font-bold tracking-widest uppercase border border-black/10 shadow-sm">PDF</span>
                <span class="px-4 py-1.5 rounded-lg bg-white text-cedar-slate text-[10px] font-bold tracking-widest uppercase border border-black/10 shadow-sm">DOCX</span>
            </div>
            <input class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" type="file" accept=".pdf,.docx" aria-label="File upload" />
        `;
        const newInput = cvUploadArea.querySelector('input[type="file"]');
        newInput.addEventListener('change', handleFileSelect);
    }

    // ── Handle file selection ────────────────────────────────────────
    function handleFileSelect(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const ext = file.name.split('.').pop()?.toLowerCase();
        if (ext !== 'pdf' && ext !== 'docx') {
            showToast('Please upload a PDF or DOCX file.', true);
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            showToast('File too large. Maximum size is 10 MB.', true);
            return;
        }

        selectedFile = file;
        showFilePreview(file);
    }

    // ── Helper: escape HTML ──────────────────────────────────────────
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ── Populate form with extracted data ────────────────────────────
    function populateForm(data) {
        // Helper to set input value
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el && val) {
                el.value = val;
                el.dispatchEvent(new Event('input', { bubbles: true }));
            }
        };

        // Section 1: Identity & Contact
        setVal('fullName', data.name);
        setVal('professionalTitle', data.title);
        setVal('email', data.contactInfo?.email);
        setVal('phone', data.contactInfo?.phone);
        setVal('city', data.contactInfo?.city);
        setVal('country', data.contactInfo?.country);
        setVal('linkedin', data.contactInfo?.linkedin);
        setVal('github', data.contactInfo?.github);
        setVal('behance', data.contactInfo?.behance);
        setVal('website', data.contactInfo?.website);

        // Section 2: Professional Summary
        setVal('roleTitle', data.title);
        setVal('yearsExperience', data.yearsExperience);
        setVal('valueProp', data.valueProp);
        setVal('profileSummary', data.bio);

        // Section 3: Work Experience
        if (data.experience?.length > 0) {
            const container = document.getElementById('experienceEntries');
            container.innerHTML = '';
            // Reset global counter
            if (typeof window.expId !== 'undefined') window.expId = 0;
            data.experience.forEach((exp, i) => {
                if (typeof window.addExperience === 'function') {
                    window.addExperience();
                }
                const idx = i + 1;
                setFieldByName(`exp_title_${idx}`, exp.role);
                setFieldByName(`exp_company_${idx}`, exp.company);
                setFieldByName(`exp_location_${idx}`, exp.location);
                setFieldByName(`exp_start_${idx}`, exp.startDate);
                if (exp.endDate && exp.endDate !== 'Present') {
                    setFieldByName(`exp_end_${idx}`, exp.endDate);
                }
                setFieldByName(`exp_achievements_${idx}`, exp.achievements);
            });
        }

        // Section 4: Education
        if (data.education?.length > 0) {
            const container = document.getElementById('educationEntries');
            container.innerHTML = '';
            // Reset global counter
            if (typeof window.eduId !== 'undefined') window.eduId = 0;
            data.education.forEach((edu, i) => {
                if (typeof window.addEducation === 'function') {
                    window.addEducation();
                }
                const idx = i + 1;
                setFieldByName(`edu_degree_${idx}`, edu.degree);
                setFieldByName(`edu_institution_${idx}`, edu.institution);
                setFieldByName(`edu_start_${idx}`, edu.startDate);
                setFieldByName(`edu_end_${idx}`, edu.endDate);
                setFieldByName(`edu_honors_${idx}`, edu.honors);
                setFieldByName(`edu_coursework_${idx}`, edu.coursework);
            });
        }

        // Section 5: Skills — clear existing first
        if (data.skills?.length > 0) {
            // Clear existing skills
            if (typeof window.skills !== 'undefined') {
                window.skills.length = 0;
            }
            const skillContainer = document.getElementById('skillTagsContainer');
            if (skillContainer) {
                skillContainer.innerHTML = '';
            }
            data.skills.forEach(skill => {
                if (typeof window.addSkill === 'function') {
                    const input = document.getElementById('skillInput');
                    if (input) {
                        input.value = skill;
                        window.addSkill();
                    }
                }
            });
        }

        // Certifications
        setVal('certifications', data.certifications);

        // Section 6: Projects
        if (data.projects?.length > 0) {
            const container = document.getElementById('projectEntries');
            container.innerHTML = '';
            // Reset global counter
            if (typeof window.projId !== 'undefined') window.projId = 0;
            data.projects.forEach((proj, i) => {
                if (typeof window.addProject === 'function') {
                    window.addProject();
                }
                const idx = i + 1;
                setFieldByName(`proj_title_${idx}`, proj.title);
                setFieldByName(`proj_role_${idx}`, proj.role);
                setFieldByName(`proj_problem_${idx}`, proj.problem);
                setFieldByName(`proj_results_${idx}`, proj.results);
                setFieldByName(`proj_url_${idx}`, proj.url);
                setFieldByName(`proj_timeline_${idx}`, proj.timeline);
            });
        }

        // Section 7: About
        if (data.about) {
            setVal('whoYouHelp', data.about.whoYouHelp);
            setVal('workingStyle', data.about.workingStyle);
            setVal('keyClients', data.about.keyClients);
            setVal('toolsUsed', data.about.toolsUsed);
        }

        // Section 8: Testimonials
        if (data.testimonials?.length > 0) {
            const container = document.getElementById('testimonialEntries');
            container.innerHTML = '';
            // Reset global counter
            if (typeof window.testId !== 'undefined') window.testId = 0;
            data.testimonials.forEach((test, i) => {
                if (typeof window.addTestimonial === 'function') {
                    window.addTestimonial();
                }
                const idx = i + 1;
                setFieldByName(`test_quote_${idx}`, test.quote);
                setFieldByName(`test_name_${idx}`, test.name);
                setFieldByName(`test_title_${idx}`, test.title);
                setFieldByName(`test_company_${idx}`, test.company);
            });
        }

        // Section 9: Contact
        if (data.contact) {
            if (data.contact.availability) {
                const availEl = document.getElementById('availability');
                if (availEl) {
                    availEl.value = data.contact.availability;
                    availEl.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
            setVal('cta', data.contact.cta);
        }

        // Open all populated sections for visibility
        openPopulatedSections(data);

        // Update progress
        if (typeof window.updateProgress === 'function') {
            window.updateProgress();
        }
        if (typeof window.updateCounts === 'function') {
            window.updateCounts();
        }
    }

    function setFieldByName(name, value) {
        if (!value) return;
        const el = document.querySelector(`[name="${name}"]`);
        if (el) {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    function openPopulatedSections(data) {
        const sectionsToOpen = [];
        if (data.name || data.contactInfo?.email) sectionsToOpen.push('identity');
        if (data.title || data.valueProp) sectionsToOpen.push('summary');
        if (data.experience?.length > 0) sectionsToOpen.push('experience');
        if (data.education?.length > 0) sectionsToOpen.push('education');
        if (data.skills?.length > 0) sectionsToOpen.push('skills');
        if (data.projects?.length > 0) sectionsToOpen.push('projects');
        if (data.about?.whoYouHelp) sectionsToOpen.push('about');
        if (data.testimonials?.length > 0) sectionsToOpen.push('testimonials');
        if (data.contact?.availability) sectionsToOpen.push('contact');

        sectionsToOpen.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                const body = section.querySelector('.section-body');
                const chevron = section.querySelector('.section-chevron');
                if (body && !body.classList.contains('open')) {
                    body.classList.add('open');
                    chevron?.classList.add('rotated');
                }
            }
        });
    }

    // ── Main scan handler ────────────────────────────────────────────
    async function startAIScan() {
        if (!selectedFile) {
            showToast('Please upload a CV/Resume file first.', true);
            return;
        }

        const ols = createProgressOverlay();
        const ext = selectedFile.name.split('.').pop()?.toUpperCase() || 'FILE';
        const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);

        updateOverlay(ols, {
            progress: 5,
            status: 'Reading your document…',
            fileName: selectedFile.name,
            fileSize: `${ext} · ${sizeMB} MB`,
        });

        try {
            // Step 1: Extract text
            updateOverlay(ols, { progress: 15, status: 'Extracting text from document…' });
            const cvText = await extractText(selectedFile);

            if (!cvText.trim()) {
                throw new Error('Could not extract any text from the document. The file may be image-based or corrupted.');
            }

            updateOverlay(ols, { progress: 35, status: 'Text extracted. Sending to AI engine…' });

            // Step 2: Call API
            updateOverlay(ols, { progress: 50, status: 'Gemini AI is analyzing your career data…' });

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cvText: cvText,
                    fileName: selectedFile.name,
                }),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || `Server error (${response.status})`);
            }

            updateOverlay(ols, { progress: 80, status: 'Populating your portfolio form…' });
            const result = await response.json();

            if (!result.portfolio) {
                throw new Error('No portfolio data returned from AI.');
            }

            // Step 3: Populate form
            await new Promise(r => setTimeout(r, 400)); // Brief pause for UX
            populateForm(result.portfolio);

            updateOverlay(ols, { progress: 100, status: 'Complete! Your form has been filled.' });
            await new Promise(r => setTimeout(r, 1200));
            removeOverlay();

            showToast('Portfolio form auto-filled successfully!');

            // Scroll to identity section
            const identitySection = document.getElementById('identity');
            if (identitySection) {
                identitySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

        } catch (error) {
            removeOverlay();
            console.error('[AI Scan Error]', error);
            showToast(error.message || 'Something went wrong. Please try again.', true);
        }
    }

    // ── Bind events ──────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        // Resolve DOM reference now that the page is ready
        cvUploadArea = document.querySelector('.group.relative.border-2.border-dashed');

        // Bind file input in upload zone
        const uploadInput = document.querySelector('.group.relative.border-2.border-dashed input[type="file"]');
        if (uploadInput) {
            uploadInput.setAttribute('accept', '.pdf,.docx');
            uploadInput.addEventListener('change', handleFileSelect);
        }

        // Bind the "START AI SCAN" button
        const scanBtns = document.querySelectorAll('button');
        scanBtns.forEach(btn => {
            if (btn.textContent.includes('START AI SCAN')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    startAIScan();
                });
            }
        });

        // Drag & drop support
        const dropZone = document.querySelector('.group.relative.border-2.border-dashed');
        if (dropZone) {
            ['dragenter', 'dragover'].forEach(evt => {
                dropZone.addEventListener(evt, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.classList.add('border-cedar-bronze/50', 'bg-cedar-alabaster/30');
                });
            });

            ['dragleave', 'drop'].forEach(evt => {
                dropZone.addEventListener(evt, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.classList.remove('border-cedar-bronze/50', 'bg-cedar-alabaster/30');
                });
            });

            dropZone.addEventListener('drop', (e) => {
                const file = e.dataTransfer?.files?.[0];
                if (file) {
                    const dummyEvent = { target: { files: [file] } };
                    handleFileSelect(dummyEvent);
                }
            });
        }
    });

})();
