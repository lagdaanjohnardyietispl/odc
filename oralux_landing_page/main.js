// OraLux Dental Clinic — site interactions
// Mobile nav toggle, sticky header on scroll, and scroll-triggered reveals.

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile menu ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    function closeMenu() {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        if (menuIcon) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    }

    function toggleMenu() {
        const isOpen = navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars', !isOpen);
            menuIcon.classList.toggle('fa-xmark', isOpen);
        }
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', toggleMenu);

        // Close the menu after tapping a link (mobile UX expectation)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close if the viewport is resized back up to desktop width
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    /* ---------- Sticky header on scroll ---------- */
    const header = document.querySelector('header');
    const SCROLL_THRESHOLD = 40;

    function updateHeaderState() {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
    }

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    /* ---------- Scroll-triggered reveal ---------- */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealEls.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    } else {
        // No IntersectionObserver support — just show everything
        revealEls.forEach(el => el.classList.add('is-visible'));
    }
});
