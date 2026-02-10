document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeNavigation();
    initializeCursorFollower();
    initializeScrollTop();
});

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-divider');
    sections.forEach(function(section) {
        observer.observe(section);
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card) {
        observer.observe(card);
    });

    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        observer.observe(contactSection);
    }
}

function initializeScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.getElementById('scrollTop');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        if (scrollTop) {
            scrollTop.classList.add('visible');
        }
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.8)';
        navbar.style.boxShadow = 'none';
        if (scrollTop) {
            scrollTop.classList.remove('visible');
        }
    }
}

function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            if (window.innerWidth <= 968) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    const currentPath = window.location.hash || '#home';
    links.forEach(function(link) {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = 'var(--text)';
        }
    });
}

function initializeCursorFollower() {
    const cursor = document.querySelector('.cursor-follower');
    
    if (!cursor || window.innerWidth <= 968) {
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });

    function animateCursor() {
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;
        
        cursorX += distX * 0.1;
        cursorY += distY * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--primary-light)';
        });

        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--primary)';
        });
    });
}

function initializeScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-8px) scale(1)';
    });
});

const techBadges = document.querySelectorAll('.tech-badge');
techBadges.forEach(function(badge, index) {
    badge.style.animationDelay = (index * 0.1) + 's';
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach(function(element, index) {
        element.style.animationDelay = (index * 0.1) + 's';
    });
});

let lastScroll = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

const contactBtns = document.querySelectorAll('.contact-btn');
contactBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(10);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        this.style.transform = '';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

function createParticles() {
    const container = document.querySelector('.hero-image');
    if (!container || window.innerWidth <= 968) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary);
            border-radius: 50%;
            opacity: 0.3;
            animation: float-particle ${5 + Math.random() * 10}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(20px, -20px);
        }
        50% {
            transform: translate(-20px, 20px);
        }
        75% {
            transform: translate(20px, 20px);
        }
    }
`;
document.head.appendChild(particleStyle);

setTimeout(createParticles, 1000);

const cards = document.querySelectorAll('.project-card');
cards.forEach(function(card) {
    const randomDelay = Math.random() * 0.5;
    card.style.transitionDelay = randomDelay + 's';
});