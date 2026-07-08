/* ==========================================================================
   Relax Spa Studio JavaScript functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Header scroll state styling */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* 2. Mobile Nav drawer slider toggle */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Auto-close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    /* 3. Navigation Active Link highlight on Scroll */
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 220)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* 4. Select service from cards, autofills dropdown selection */
    const selectServiceBtns = document.querySelectorAll('.select-service-btn');
    const bookingServiceSelect = document.getElementById('form-service');

    selectServiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            if (bookingServiceSelect && serviceName) {
                bookingServiceSelect.value = serviceName;
            }
        });
    });

    /* 5. FAQ Accordion panel show/hide toggler */
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parentItem = trigger.parentElement;
            const content = trigger.nextElementSibling;
            
            // Check if active
            const isActive = parentItem.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });

            // If not previously active, open clicked one
            if (!isActive) {
                parentItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* 6. Intersection Observer for Scroll entrance animations */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    /* 7. AJAX booking Form Netlify handler */
    const bookingForm = document.getElementById('spa-booking-form');
    const successPopup = document.getElementById('form-success-popup');
    const successName = document.getElementById('success-name');
    const successPhone = document.getElementById('success-phone');
    const successCloseBtn = document.getElementById('success-close-btn');

    if (bookingForm && successPopup) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value;
            const phone = document.getElementById('form-phone').value;
            
            const formData = new FormData(bookingForm);

            // POST to netlify endpoint via AJAX
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                if (successName) successName.textContent = name;
                if (successPhone) successPhone.textContent = phone;
                successPopup.classList.add('show');
            })
            .catch(error => {
                console.warn('Form post failed (offline/local):', error);
                // Visual fallback
                if (successName) successName.textContent = name;
                if (successPhone) successPhone.textContent = phone;
                successPopup.classList.add('show');
            });
        });

        if (successCloseBtn) {
            successCloseBtn.addEventListener('click', () => {
                successPopup.classList.remove('show');
                bookingForm.reset();
            });
        }
    }
});
