// script.js - Xenon Pro JavaScript

// DOM Elements
const nav = document.querySelector('nav');
const hero = document.querySelector('.hero');
const featureCards = document.querySelectorAll('.feature-card');
const navLinks = document.querySelectorAll('.nav-links a');

// Configuration
const CONFIG = {
    particleCount: 20,
    particleSpeed: 300, // ms between particle creation
    scrollOffset: 100,
    animationDuration: 1000
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Show loading screen briefly
    showLoadingScreen();
    
    // Initialize all features
    setTimeout(() => {
        hideLoadingScreen();
        initSmoothScrolling();
        initNavbarEffects();
        initParticleSystem();
        initScrollAnimations();
        initFeatureCardEffects();
        initAnalytics();
        
        console.log('🚀 Xenon Pro initialized successfully!');
    }, 1500);
}

// ====== LOADING SCREEN ======
function showLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
}

function hideLoadingScreen() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => loading.remove(), 500);
    }
}

// ====== SMOOTH SCROLLING ======
function initSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNav(this.getAttribute('href'));
            }
        });
    });
}

function updateActiveNav(activeHref) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeHref) {
            link.classList.add('active');
        }
    });
}

// ====== NAVBAR EFFECTS ======
function initNavbarEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Change navbar background on scroll
        if (currentScrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
            nav.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Update active section
        updateActiveSection();
    }, 10));
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ====== PARTICLE SYSTEM ======
function initParticleSystem() {
    setInterval(createParticle, CONFIG.particleSpeed);
}

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size and position
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    
    // Random animation duration and delay
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // Random color variation
    const colors = [
        'rgba(0, 212, 255, 0.6)',
        'rgba(123, 104, 238, 0.6)',
        'rgba(255, 107, 107, 0.4)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 6000);
}

// ====== SCROLL ANIMATIONS ======
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Add scroll animation to feature cards
    featureCards.forEach(card => {
        card.classList.add('scroll-fade');
        observer.observe(card);
    });
    
    // Add scroll animation to section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.classList.add('scroll-fade');
        observer.observe(sectionTitle);
    }
}

// ====== FEATURE CARD EFFECTS ======
function initFeatureCardEffects() {
    featureCards.forEach((card, index) => {
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.animationDelay = `${index * 0.1}s`;
            
            // Create ripple effect
            createRippleEffect(this, event);
        });
        
        // Add click analytics
        card.addEventListener('click', function() {
            const featureTitle = this.querySelector('h3').textContent;
            trackEvent('feature_click', { feature: featureTitle });
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (event?.clientX || rect.left + rect.width / 2) - rect.left;
    const y = (event?.clientY || rect.top + rect.height / 2) - rect.top;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 212, 255, 0.3);
        transform: scale(0);
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation keyframes
if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ====== ANALYTICS & TRACKING ======
function initAnalytics() {
    // Track page view
    trackEvent('page_view', { page: 'home' });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (scrollPercent >= 25 && scrollPercent < 50) {
                trackEvent('scroll_depth', { depth: '25%' });
            } else if (scrollPercent >= 50 && scrollPercent < 75) {
                trackEvent('scroll_depth', { depth: '50%' });
            } else if (scrollPercent >= 75) {
                trackEvent('scroll_depth', { depth: '75%' });
            }
        }
    }, 500));
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', { seconds: timeSpent });
    });
}

function trackEvent(eventName, data = {}) {
    // Console log for development
    console.log(`📊 Event: ${eventName}`, data);
    
    // In production, send to analytics service
    // Example: sendToAnalytics(eventName, data);
}

// ====== UTILITY FUNCTIONS
