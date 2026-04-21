const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute(
            'aria-expanded',
            mobileMenuBtn.classList.contains('active')
        );
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

const sections = document.querySelectorAll('section[id], header[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

function highlightNavOnScroll() {
    if (!navLinkEls.length) {
        return;
    }

    const scrollY = window.pageYOffset;
    const onHome = Boolean(document.getElementById('capabilities') && document.getElementById('projects'));

    if (!onHome) {
        return;
    }

    const capabilitiesEl = document.getElementById('capabilities');
    if (capabilitiesEl && scrollY < capabilitiesEl.offsetTop - 120) {
        navLinkEls.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#top') {
                link.classList.add('active');
            }
        });
        return;
    }

    navLinkEls.forEach((link) => link.classList.remove('active'));

    let matchedSection = false;
    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 110;
        const sectionId = section.getAttribute('id');
        if (!sectionId || sectionId === 'top') {
            return;
        }

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkEls.forEach((link) => {
                const href = link.getAttribute('href');
                if (href === `#${sectionId}`) {
                    link.classList.add('active');
                    matchedSection = true;
                }
            });
        }
    });

    if (!matchedSection) {
        navLinkEls.forEach((link) => {
            if (link.getAttribute('href') === '#top') {
                link.classList.add('active');
            }
        });
    }
}

window.addEventListener('scroll', highlightNavOnScroll);

const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
    if (!navbar) {
        return;
    }
    navbar.classList.toggle('is-scrolled', window.scrollY > 8);
}

window.addEventListener('scroll', handleNavbarScroll);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.06,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

if (!prefersReducedMotion.matches) {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>
            .reveal-on-scroll {
                opacity: 0;
                transform: translateY(14px);
                transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .reveal-on-scroll.animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>`
    );

    document
        .querySelectorAll(
            '.project-card, .timeline-item, .surface-card, .photo-card, .capabilities-grid .surface-card, .tech-col, .case-study-section, .challenge-card, .case-highlight-tile, .case-outcome-panel'
        )
        .forEach((el) => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    highlightNavOnScroll();
    handleNavbarScroll();
});
