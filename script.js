/* ============================================
   PARTH MAHADIK — PORTFOLIO SCRIPTS
   Anti-bot contact protection, cursor spotlight,
   magnetic buttons, tilt cards, interactive grid,
   typewriter, scroll reveals, nav behavior
   ============================================ */

(function () {
    'use strict';

    // =============================================
    // ANTI-BOT: Email Deobfuscation
    // Email is base64-encoded in data attributes,
    // assembled only at runtime via JS. Bots
    // scraping raw HTML will find nothing.
    // =============================================
    function deobfuscateEmail() {
        var emailEl = document.getElementById('contact-email');
        if (!emailEl) return;

        try {
            var user = atob(emailEl.getAttribute('data-user'));
            var host = atob(emailEl.getAttribute('data-host'));
            var addr = user + '@' + host;

            emailEl.href = 'mail' + 'to:' + addr;

            var textSpan = emailEl.querySelector('.contact__obfuscated');
            if (textSpan) {
                textSpan.textContent = addr;
            }
        } catch (e) {
            // Silently fail for bots that somehow break atob
        }
    }

    // Delay deobfuscation so it doesn't fire on initial parse
    setTimeout(deobfuscateEmail, 800);

    // =============================================
    // TYPEWRITER EFFECT
    // =============================================
    var typewriterEl = document.getElementById('typewriter');
    var commands = [
        'cat ./about.md',
        'go build -o 12pm .',
        'ssh parth@dev-server',
        'docker compose up -d',
        'git push origin main',
        'npm run dev',
    ];

    var commandIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;

    function typewrite() {
        var current = commands[commandIndex];

        if (!isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else {
                typeSpeed = 60 + Math.random() * 60;
            }
        } else {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
                typeSpeed = 400;
            } else {
                typeSpeed = 30;
            }
        }

        setTimeout(typewrite, typeSpeed);
    }

    if (typewriterEl) {
        setTimeout(typewrite, 1200);
    }

    // =============================================
    // NAVIGATION: Scroll behavior + active tracking
    // =============================================
    var nav = document.getElementById('nav');
    var navLinks = document.querySelectorAll('.nav__link');
    var sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        var currentScroll = window.scrollY;

        // Compact nav on scroll
        if (currentScroll > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        // Active section tracking
        var scrollPos = currentScroll + window.innerHeight / 3;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // =============================================
    // MOBILE MENU TOGGLE
    // =============================================
    var navToggle = document.getElementById('navToggle');
    var mobileMenu = document.getElementById('mobileMenu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('.mobile-menu__link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // =============================================
    // SCROLL REVEAL
    // =============================================
    var revealElements = document.querySelectorAll('.reveal-up');

    function checkReveal() {
        var windowHeight = window.innerHeight;
        var triggerPoint = windowHeight * 0.88;

        revealElements.forEach(function (el) {
            var elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerPoint) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('load', checkReveal);
    checkReveal();

    // =============================================
    // SMOOTH SCROLL for anchor links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                var navHeight = nav.offsetHeight;
                var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // STAGGER REVEAL for grids
    // =============================================
    var staggerGroups = document.querySelectorAll('.skills__grid .skill-group, .projects__small-grid .project-card');

    var staggerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var parent = entry.target.parentElement;
                var siblings = Array.from(parent.children);
                var index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = (index * 0.08) + 's';
                entry.target.classList.add('visible');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    staggerGroups.forEach(function (el) {
        staggerObserver.observe(el);
    });

    // =============================================
    // CURSOR SPOTLIGHT (desktop only)
    // Subtle radial glow follows mouse
    // =============================================
    var spotlight = document.getElementById('cursorSpotlight');
    var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (spotlight && !isTouch) {
        var spotlightActive = false;

        document.addEventListener('mousemove', function (e) {
            if (!spotlightActive) {
                spotlight.classList.add('active');
                spotlightActive = true;
            }
            spotlight.style.left = e.clientX + 'px';
            spotlight.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseleave', function () {
            spotlight.classList.remove('active');
            spotlightActive = false;
        });

        document.addEventListener('mouseenter', function () {
            spotlight.classList.add('active');
            spotlightActive = true;
        });
    }

    // =============================================
    // MAGNETIC BUTTONS
    // Buttons subtly pull toward cursor on hover
    // =============================================
    if (!isTouch) {
        var magneticEls = document.querySelectorAll('[data-magnetic]');

        magneticEls.forEach(function (el) {
            el.addEventListener('mousemove', function (e) {
                var rect = el.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                var strength = 0.3;
                el.style.transform = 'translate(' + (x * strength) + 'px, ' + (y * strength) + 'px)';
            });

            el.addEventListener('mouseleave', function () {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // =============================================
    // TILT EFFECT on project cards
    // Subtle 3D perspective tilt on mousemove
    // =============================================
    if (!isTouch) {
        var tiltEls = document.querySelectorAll('[data-tilt]');

        tiltEls.forEach(function (el) {
            el.addEventListener('mousemove', function (e) {
                var rect = el.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width;
                var y = (e.clientY - rect.top) / rect.height;
                var tiltX = (y - 0.5) * 6;  // max 3deg
                var tiltY = (x - 0.5) * -6;
                el.style.transform = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
            });

            el.addEventListener('mouseleave', function () {
                el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
                el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            el.addEventListener('mouseenter', function () {
                el.style.transition = 'transform 0.1s ease-out';
            });
        });
    }

    // =============================================
    // INTERACTIVE ATRIUM GRID
    // Tiles light up on mouse proximity
    // =============================================
    var atriumGrid = document.querySelector('.atrium-grid');

    if (atriumGrid && !isTouch) {
        var tiles = atriumGrid.querySelectorAll('.atrium-tile');

        atriumGrid.addEventListener('mousemove', function (e) {
            var gridRect = atriumGrid.getBoundingClientRect();

            tiles.forEach(function (tile) {
                var tileRect = tile.getBoundingClientRect();
                var tileCenterX = tileRect.left + tileRect.width / 2 - gridRect.left;
                var tileCenterY = tileRect.top + tileRect.height / 2 - gridRect.top;
                var mouseX = e.clientX - gridRect.left;
                var mouseY = e.clientY - gridRect.top;

                var distance = Math.sqrt(
                    Math.pow(mouseX - tileCenterX, 2) +
                    Math.pow(mouseY - tileCenterY, 2)
                );

                if (distance < 50) {
                    tile.classList.add('atrium-tile--hover');
                } else {
                    tile.classList.remove('atrium-tile--hover');
                }
            });
        });

        atriumGrid.addEventListener('mouseleave', function () {
            tiles.forEach(function (tile) {
                tile.classList.remove('atrium-tile--hover');
            });
        });
    }

    // =============================================
    // PARALLAX on hero elements
    // Slight Y-shift on scroll for depth
    // =============================================
    var heroTitle = document.querySelector('.hero__title');
    var heroTerminal = document.querySelector('.hero__terminal');

    if (heroTitle && !isTouch) {
        window.addEventListener('scroll', function () {
            var scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                var offset = scrollY * 0.15;
                heroTitle.style.transform = 'translateY(' + offset + 'px)';
                if (heroTerminal) {
                    heroTerminal.style.transform = 'translateY(' + (offset * 0.6) + 'px)';
                }
            }
        }, { passive: true });
    }

    // =============================================
    // COUNTER ANIMATION for stats (if any numeric)
    // Used for the 5.5s boot time in the terminal
    // =============================================

    // Initial nav state
    handleNavScroll();

})();
