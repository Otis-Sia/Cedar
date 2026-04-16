import { useState } from 'react';

// Configure CDN imports for pdf.js and mammoth
const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs';
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';
const MAMMOTH_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js';

export interface ScanStatus {
  isScanning: boolean;
  progress: number;
  statusText: string;
  error: string | null;
}

export function useAiScanner() {
  const [scanState, setScanState] = useState<ScanStatus>({
    isScanning: false,
    progress: 0,
    statusText: '',
    error: null,
  });

  const loadPdfJs = async () => {
    // @ts-ignore
    if (window.pdfjsLib) return window.pdfjsLib;
    try {
      const module = await import(/* webpackIgnore: true */ PDFJS_CDN);
      module.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
      // @ts-ignore
      window.pdfjsLib = module;
      return module;
    } catch (err) {
      console.error('Failed to load pdf.js:', err);
      throw new Error('Could not load PDF parser. Please try again.');
    }
  };

  const loadMammoth = () => {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      if (window.mammoth) {
        // @ts-ignore
        resolve(window.mammoth);
        return;
      }
      const script = document.createElement('script');
      script.src = MAMMOTH_CDN;
      script.onload = () => {
        // @ts-ignore
        resolve(window.mammoth);
      };
      script.onerror = () => reject(new Error('Could not load DOCX parser.'));
      document.head.appendChild(script);
    });
  };

  const extractText = async (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'pdf') {
      const pdfjs = await loadPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        // @ts-ignore
        const pageText = content.items.filter(item => 'str' in item).map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      return fullText;
    }

    if (ext === 'docx') {
      const mammoth = await loadMammoth();
      const arrayBuffer = await file.arrayBuffer();
      // @ts-ignore
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }

    throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
  };

  const startAiScan = async (file: File, onComplete: (data: any) => void) => {
    if (!file) {
      setScanState(prev => ({ ...prev, error: 'Please upload a CV/Resume file first.' }));
      return;
    }

    setScanState({
      isScanning: true,
      progress: 5,
      statusText: 'Reading your document…',
      error: null,
    });

    try {
      setScanState(prev => ({ ...prev, progress: 15, statusText: 'Extracting text from document…' }));
      const cvText = await extractText(file);

      if (!cvText.trim()) {
        throw new Error('Could not extract any text from the document.');
      }

      setScanState(prev => ({ ...prev, progress: 35, statusText: 'Text extracted. Sending to AI engine…' }));
      
      // MOCK CALL for migration: Replace with actual Gemini endpoint in phase 5
      // Wait for 2 seconds
      await new Promise(r => setTimeout(r, 2000));
      
      // Simulate successful parsing
      const mockResult = {
        portfolio: {
          name: "Generated Name",
          title: "AI Parsed Role",
          contactInfo: { email: "ai@example.com" }
        }
      };

      setScanState(prev => ({ ...prev, progress: 80, statusText: 'Populating your form…' }));
      await new Promise(r => setTimeout(r, 500));

      onComplete(mockResult.portfolio);
      
      setScanState(prev => ({ ...prev, progress: 100, statusText: 'Complete! Your form has been filled.' }));
      
      setTimeout(() => {
        setScanState(prev => ({ ...prev, isScanning: false }));
      }, 1200);

    } catch (error: any) {
      console.error('[AI Scan Error]', error);
      setScanState(prev => ({
        ...prev,
        isScanning: false,
        error: error.message || 'Something went wrong. Please try again.',
      }));
    }
  };

  return {
    scanState,
    startAiScan,
    clearError: () => setScanState(prev => ({ ...prev, error: null }))
  };
}
