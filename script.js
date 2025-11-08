// Bright Minds Foundation - Single Page JavaScript
// Smooth scrolling, active navigation, modals, and form handling

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveSection() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Highlight active section on scroll
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial call

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Donation Amount Buttons
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    let selectedAmount = null;

    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            selectedAmount = this.getAttribute('data-amount');
            // Clear custom amount input
            if (customAmountInput) {
                customAmountInput.value = '';
            }
        });
    });

    // Custom amount input handler
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            // Remove active class from all amount buttons when custom amount is entered
            amountButtons.forEach(btn => btn.classList.remove('active'));
            selectedAmount = this.value;
        });
    }

    // Modal Functions
    window.openVolunteerForm = function() {
        const modal = document.getElementById('volunteerModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeVolunteerForm = function() {
        const modal = document.getElementById('volunteerModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    window.openDonationForm = function() {
        const modal = document.getElementById('donationModal');
        if (modal) {
            // Update selected amount display
            const amountDisplay = document.getElementById('selected-amount-display');
            if (amountDisplay) {
                if (selectedAmount) {
                    amountDisplay.textContent = selectedAmount + ' TND';
                } else if (customAmountInput && customAmountInput.value) {
                    amountDisplay.textContent = customAmountInput.value + ' TND';
                } else {
                    amountDisplay.textContent = 'Please select an amount above';
                }
            }
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeDonationForm = function() {
        const modal = document.getElementById('donationModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const volunteerModal = document.getElementById('volunteerModal');
        const donationModal = document.getElementById('donationModal');
        
        if (event.target === volunteerModal) {
            closeVolunteerForm();
        }
        if (event.target === donationModal) {
            closeDonationForm();
        }
    });

    // Scroll to Contact function
    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Form Handling
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = selectedAmount || (customAmountInput ? customAmountInput.value : '');
            
            if (!amount) {
                alert('Please select or enter a donation amount.');
                return;
            }

            const formData = {
                name: document.getElementById('donor-name').value,
                email: document.getElementById('donor-email').value,
                phone: document.getElementById('donor-phone').value,
                amount: amount,
                message: document.getElementById('donation-message').value
            };

            // In a real application, this would send data to a server
            console.log('Donation Form Data:', formData);
            alert('Thank you for your donation! We will contact you shortly to complete the process.');
            donationForm.reset();
            amountButtons.forEach(btn => btn.classList.remove('active'));
            selectedAmount = null;
            if (customAmountInput) {
                customAmountInput.value = '';
            }
            closeDonationForm();
        });
    }

    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('volunteer-name').value,
                email: document.getElementById('volunteer-email').value,
                phone: document.getElementById('volunteer-phone').value,
                interest: document.getElementById('volunteer-interest').value,
                availability: document.getElementById('volunteer-availability').value,
                experience: document.getElementById('volunteer-experience').value
            };

            // In a real application, this would send data to a server
            console.log('Volunteer Form Data:', formData);
            alert('Thank you for your interest in volunteering! We will contact you within 5-7 business days.');
            volunteerForm.reset();
            closeVolunteerForm();
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                phone: document.getElementById('contact-phone').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value
            };

            // In a real application, this would send data to a server
            console.log('Contact Form Data:', formData);
            alert('Thank you for your message! We will get back to you within 2-3 business days.');
            contactForm.reset();
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections for animation
    const animateElements = document.querySelectorAll('.activity-card, .value-card, .problem-card, .team-member, .involve-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Update donation amount display when amount is selected
    function updateDonationDisplay() {
        const amountDisplay = document.getElementById('selected-amount-display');
        if (amountDisplay) {
            if (selectedAmount) {
                amountDisplay.textContent = selectedAmount + ' TND';
            } else if (customAmountInput && customAmountInput.value) {
                amountDisplay.textContent = customAmountInput.value + ' TND';
            } else {
                amountDisplay.textContent = 'Please select an amount';
            }
        }
    }

    // Add event listeners to update display
    amountButtons.forEach(button => {
        button.addEventListener('click', updateDonationDisplay);
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', updateDonationDisplay);
    }
});
