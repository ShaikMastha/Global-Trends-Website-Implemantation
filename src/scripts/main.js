$(document).ready(function() {
    // Mobile menu toggle
    $('#nav-toggle').click(function() {
        $(this).toggleClass('active');
        $('#nav-menu').toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.nav__link').click(function() {
        $('#nav-toggle').removeClass('active');
        $('#nav-menu').removeClass('active');
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        var target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Header background on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    // Project filter functionality
    $('.filter__btn').click(function() {
        $('.filter__btn').removeClass('filter__btn--active');
        $(this).addClass('filter__btn--active');
        
        var filterValue = $(this).data('filter');
        
        if (filterValue === 'all') {
            $('.project__item').fadeIn(300);
        } else {
            $('.project__item').hide();
            $('.project__item[data-category="' + filterValue + '"]').fadeIn(300);
        }
    });

    // Counter animation for achievements
    function animateCounters() {
        $('.stat__number').each(function() {
            var $this = $(this);
            var countTo = parseInt($this.text());
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation when achievements section is visible
                if (entry.target.classList.contains('achievements')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('.service__card, .about, .achievements, .milestones, .projects, .blog, .contact');
    elementsToObserve.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Timeline items animation
    $('.timeline__item').each(function(index) {
        $(this).addClass('fade-in');
        observer.observe(this);
    });

    // Form submission
    $('.contact__form').submit(function(e) {
        e.preventDefault();
        
        // Simple form validation
        var isValid = true;
        $(this).find('input[required], textarea[required]').each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).css('border-color', '#ff4081');
            } else {
                $(this).css('border-color', '#e9ecef');
            }
        });
        
        if (isValid) {
            // Simulate form submission
            $('.form__submit').text('Sending...').prop('disabled', true);
            
            setTimeout(function() {
                alert('Message sent successfully!');
                $('.contact__form')[0].reset();
                $('.form__submit').text('Send Message').prop('disabled', false);
            }, 1500);
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Add hover effects to service cards
    $('.service__card').hover(
        function() {
            $(this).find('.service__icon img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.service__icon img').css('transform', 'scale(1)');
        }
    );

    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(this).scrollTop();
        var parallax = $('.hero__person');
        var speed = 0.5;
        
        parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    });

    // Add stagger animation to timeline items
    $('.timeline__item').each(function(index) {
        $(this).css('animation-delay', (index * 0.2) + 's');
    });

    // Dynamic year colors for timeline
    $('.timeline__item').each(function(index) {
        var colors = ['#ff4081', '#4caf50', '#00bcd4', '#ff9800'];
        $(this).find('.timeline__year').css('color', colors[index % colors.length]);
        $(this).find('.timeline__icon').css('background', colors[index % colors.length]);
    });
});