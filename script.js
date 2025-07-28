// Data Arrays - Edit these to update content
const skills = [
    {
        name: 'JavaScript',
        level: 'Advanced',
        description: 'Modern ES6+ JavaScript, DOM manipulation, async programming, and functional programming concepts.'
    },
    {
        name: 'React',
        level: 'Intermediate',
        description: 'Building interactive UIs with hooks, state management, component architecture, and modern React patterns.'
    },
    {
        name: 'Python',
        level: 'Advanced',
        description: 'Data analysis, machine learning, web scraping, automation, and backend development with Django/Flask.'
    },
    {
        name: 'Machine Learning',
        level: 'Intermediate',
        description: 'Supervised and unsupervised learning, neural networks, data preprocessing, and model evaluation.'
    },
    {
        name: 'SQL & Databases',
        level: 'Advanced',
        description: 'Database design, complex queries, optimization, and working with PostgreSQL, MySQL, and MongoDB.'
    },
    {
        name: 'Data Visualization',
        level: 'Intermediate',
        description: 'Creating insightful charts and dashboards using D3.js, Plotly, and various Python visualization libraries.'
    }
];

const experiences = [
    {
        role: 'Frontend Developer Intern',
        company: 'TechCorp Solutions',
        duration: 'Jan 2024 - Mar 2024',
        details: 'Developed responsive web applications using React and modern CSS. Collaborated with the design team to implement pixel-perfect UI components and improved website performance by 40%.'
    },
    {
        role: 'Data Analysis Intern',
        company: 'Analytics Pro',
        duration: 'Jun 2023 - Aug 2023',
        details: 'Analyzed large datasets using Python and SQL to extract business insights. Created automated reporting dashboards that saved 20+ hours per week for the analytics team.'
    },
    {
        role: 'Freelance Web Developer',
        company: 'Self-Employed',
        duration: 'Mar 2023 - Present',
        details: 'Built custom websites and web applications for small businesses. Specialized in e-commerce solutions, landing pages, and portfolio websites using modern web technologies.'
    }
];

const projects = [
    {
        name: 'Portfolio Website',
        description: 'A modern, responsive portfolio website built with HTML, CSS, and JavaScript featuring 3D animations and smooth interactions.',
        link: 'https://github.com/parth-12pm/portfolio'
    },
    {
        name: 'E-Commerce Dashboard',
        description: 'React-based admin dashboard for managing products, orders, and analytics with real-time data visualization.',
        link: 'https://github.com/parth-12pm/ecommerce-dashboard'
    },
    {
        name: 'ML Stock Predictor',
        description: 'Machine learning model using LSTM neural networks to predict stock prices with interactive web interface.',
        link: 'https://github.com/parth-12pm/stock-predictor'
    },
    {
        name: 'Task Management App',
        description: 'Full-stack web application with user authentication, real-time updates, and collaborative features.',
        link: 'https://github.com/parth-12pm/task-manager'
    },
    {
        name: 'Data Visualization Tool',
        description: 'Interactive dashboard for exploring and visualizing complex datasets with multiple chart types and filters.',
        link: 'https://github.com/parth-12pm/data-viz-tool'
    },
    {
        name: 'Weather App',
        description: 'Responsive weather application with location-based forecasts, interactive maps, and beautiful animations.',
        link: 'https://github.com/parth-12pm/weather-app'
    }
];

const contactInfo = {
    email: 'parthsmahadik12027@gmail.com',
    phone: '+91 98765 43210'
};

// Typewriter Effect
const typewriterTexts = [
    'React Developer',
    'ML Enthusiast',
    'Data Scientist',
    'Full Stack Developer',
    'Problem Solver'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function typewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter-text');
    const currentText = typewriterTexts[currentTextIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }
    
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentCharIndex === currentText.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
        typingSpeed = 500; // Pause before next text
    }
    
    typewriterTimeout = setTimeout(typewriterEffect, typingSpeed);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations
function initAnimations() {
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe skill cards, timeline items, and project cards with delay
    setTimeout(() => {
        document.querySelectorAll('.skill-card').forEach((card, index) => {
            setTimeout(() => {
                observer.observe(card);
            }, index * 100);
        });
        
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            setTimeout(() => {
                observer.observe(item);
            }, index * 200);
        });
        
        document.querySelectorAll('.project-card').forEach((card, index) => {
            setTimeout(() => {
                observer.observe(card);
            }, index * 150);
        });
    }, 500);
}

// Render Skills
function renderSkills() {
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <div class="skill-header">
                <h3 class="skill-name">${skill.name}</h3>
                <span class="skill-level">${skill.level}</span>
            </div>
            <p class="skill-description">${skill.description}</p>
        </div>
    `).join('');
}

// Render Experience
function renderExperience() {
    const experienceContainer = document.getElementById('experience-container');
    experienceContainer.innerHTML = experiences.map(exp => `
        <div class="timeline-item">
            <div class="experience-card">
                <h3 class="experience-role">${exp.role}</h3>
                <h4 class="experience-company">${exp.company}</h4>
                <p class="experience-duration">${exp.duration}</p>
                <p class="experience-details">${exp.details}</p>
            </div>
        </div>
    `).join('');
}

// Render Projects
function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card" onclick="window.open('${project.link}', '_blank')">
            <div class="project-content">
                <h3 class="project-name">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <a href="${project.link}" class="project-link" onclick="event.stopPropagation();">
                    View Project →
                </a>
            </div>
        </div>
    `).join('');
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Also handle hero buttons
    document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
        if (btn.getAttribute('href').startsWith('#')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" to clipboard!`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy to clipboard', 'error');
    });
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Navbar background on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial call
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    function updateParallax() {
        const scrolled = window.scrollY;
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    }
    
    window.addEventListener('scroll', updateParallax);
}

// Add loading animation
function addLoadingAnimation() {
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
}

// Handle mobile menu (if needed)
function initMobileMenu() {
    // Add mobile menu functionality if needed
    // For now, we'll hide the menu on mobile as per CSS
}

// Performance optimization - throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some interactive hover effects
function initInteractiveEffects() {
    // Add tilt effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
    
    // Add floating animation to skill cards
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = `float ${3 + (index % 3)}s ease-in-out infinite`;
    });
}

// Add floating keyframes to CSS dynamically
function addFloatingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// Easter egg - Konami code
function initEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showToast('🎉 Konami Code activated! You found the easter egg!');
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    addLoadingAnimation();
    
    // Render dynamic content
    renderSkills();
    renderExperience();
    renderProjects();
    
    // Initialize animations and interactions
    initAnimations();
    initSmoothScrolling();
    initActiveNavigation();
    initNavbarScroll();
    initParallax();
    initInteractiveEffects();
    initEasterEgg();
    
    // Add floating animation CSS
    addFloatingAnimation();
    
    // Start typewriter effect
    setTimeout(typewriterEffect, 1000);
    
    // Throttle scroll events for better performance
    const throttledScroll = throttle(() => {
        // Any additional scroll-based functionality can go here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScroll);
    
    console.log('🚀 Portfolio website loaded successfully!');
    console.log('📧 Contact: parthsmahadik12027@gmail.com');
    console.log('💡 Tip: Try the Konami code (↑↑↓↓←→←→BA) for a surprise!');
});

// Expose functions globally for inline event handlers
window.copyToClipboard = copyToClipboard;

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        clearTimeout(typewriterTimeout);
    } else {
        // Resume animations when tab becomes visible
        setTimeout(typewriterEffect, 100);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'h' to go to home
    if (e.key === 'h' && !e.ctrlKey && !e.altKey) {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'c' to go to contact
    if (e.key === 'c' && !e.ctrlKey && !e.altKey) {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}