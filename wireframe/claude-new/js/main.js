/**
 * Codebolt Website - Main JavaScript
 * Basic interactivity for the wireframe website
 */

(function() {
    'use strict';

    // ============================================
    // Mobile Menu Toggle
    // ============================================

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('visible');
            const isExpanded = navLinks.classList.contains('visible');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close mobile menu when clicking a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navLinks.classList.remove('visible');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ============================================
    // FAQ Accordion
    // ============================================

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;

            // Close all other FAQs
            faqQuestions.forEach(function(otherQuestion) {
                if (otherQuestion !== question) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current FAQ
            this.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });

    // ============================================
    // Contact Form Handling
    // ============================================

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validate form
            if (!data.name || !data.email || !data.message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            // In production, this would send data to a server
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                showFormStatus('Thank you for your message! We\'ll get back to you within 24 business hours.', 'success');
            }, 1500);
        });
    }

    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = type === 'success' ? 'form-success' : 'form-error';

            // Clear status after 5 seconds
            setTimeout(function() {
                formStatus.textContent = '';
                formStatus.className = '';
            }, 5000);
        }
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Header Scroll Effect
    // ============================================

    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // ============================================
    // Active Navigation Link
    // ============================================

    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-links a[href^="index.html"], .nav-links a[href^="#"], .nav-links a[href$=".html"]');

    function updateActiveLink() {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === sectionId + '.html' ||
                        link.getAttribute('href') === '#' + sectionId ||
                        link.getAttribute('href') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial check

    // ============================================
    // Animation on Scroll (Simple)
    // ============================================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    document.querySelectorAll('.card, .step, .timeline-item, .stat-item').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // Pricing Toggle (Monthly/Annual) - Placeholder
    // ============================================

    // This is a placeholder for future pricing toggle functionality
    // const pricingToggle = document.querySelector('.pricing-toggle');
    // if (pricingToggle) {
    //     pricingToggle.addEventListener('change', function() {
    //         // Handle pricing toggle
    //     });
    // }

    // ============================================
    // Console Welcome Message
    // ============================================

    console.log('%c🚀 Codebolt', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cThe World\'s First Agentic Development Platform', 'font-size: 14px; color: #10b981;');
    console.log('%cInterested in joining our team? Check out careers at https://codebolt.dev/careers', 'font-size: 12px; color: #64748b;');
    console.log('\n%c📚 Documentation: https://codebolt.dev/docs', 'font-size: 12px; color: #64748b;');
    console.log('%c💬 Community Discord: https://codebolt.dev/discord', 'font-size: 12px; color: #64748b;');

    // ============================================
    // Initialize
    // ============================================

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Any additional initialization
        console.log('Codebolt website initialized');
    }

})();
