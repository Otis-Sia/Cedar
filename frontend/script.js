// Cedar Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Header transformation on scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Reveal animations using Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // FAQ Toggles — use event delegation so it works on touch too
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        // Make the entire item tappable, not just .faq-question
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Close mobile menu if open
                closeMobileMenu();
                closeMobileDrawer();

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission (Basic mock)
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = 'Request Sent Successfully';
                btn.style.background = '#AA8C55'; // Bronze accent
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = 'var(--cedar-forest)';
                }, 3000);
            }, 1500);
        });
    }

    // ═══════════════════════════════════════════
    // MOBILE MENU — Public pages (right slide-over)
    // ═══════════════════════════════════════════
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    if (mobileMenuBtn && mobileMenuPanel && mobileMenuBackdrop) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuPanel.classList.add('open');
            mobileMenuBackdrop.classList.add('open');
            document.body.classList.add('menu-open');
            mobileMenuBtn.classList.add('active');
        });

        mobileMenuClose?.addEventListener('click', closeMobileMenu);
        mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }

    // ═══════════════════════════════════════════
    // MOBILE DRAWER — Internal/dashboard pages (left slide-out)
    // ═══════════════════════════════════════════
    const drawerBtn = document.getElementById('mobileDrawerBtn');
    const drawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');

    if (drawerBtn && drawer && drawerBackdrop) {
        drawerBtn.addEventListener('click', () => {
            drawer.classList.add('open');
            drawerBackdrop.classList.add('open');
            document.body.classList.add('menu-open');
        });

        drawerBackdrop.addEventListener('click', closeMobileDrawer);
    }

    // Close drawer links when tapped
    if (drawer) {
        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileDrawer();
            });
        });
    }

    // Close mobile menu links when tapped
    if (mobileMenuPanel) {
        mobileMenuPanel.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }

    // Escape key closes any open menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeMobileDrawer();
        }
    });
});

// ═══════════════════════════════════════════
// Global close functions (accessible from inline handlers too)
// ═══════════════════════════════════════════
function closeMobileMenu() {
    const panel = document.getElementById('mobileMenuPanel');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    const btn = document.getElementById('mobileMenuBtn');
    if (panel) panel.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (btn) btn.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function closeMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.classList.remove('menu-open');
}
