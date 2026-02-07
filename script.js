// ========================================
// SQUID GAME THEMED BACKGROUND ANIMATION
// Enhanced with Mobile Optimization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initAnimatedBackground();
    initCanvas();
    initGeometricShapes();
    initSmoothScroll();
    initButtonEffects();
    initLightning();
    initScrollAnimations();
    initEventCardModals();
    initMobileOptimizations();
    initTouchSupport();
});

// ========================================
// MOBILE OPTIMIZATIONS
// ========================================

function initMobileOptimizations() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    
    // Reduce particle count on mobile
    if (isMobile && !isTablet) {
        document.documentElement.style.setProperty('--particle-count', '30');
    }
    
    // Add mobile class to body
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    // Optimize animations for low-end devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
    handleOrientationChange();
}

function handleOrientationChange() {
    const isLandscape = window.innerWidth > window.innerHeight;
    document.body.classList.toggle('landscape', isLandscape);
    
    // Adjust modal max-height on orientation change
    setTimeout(() => {
        const modals = document.querySelectorAll('.modal-content');
        modals.forEach(modal => {
            if (isLandscape) {
                modal.style.maxHeight = '80vh';
            } else {
                modal.style.maxHeight = '90vh';
            }
        });
    }, 300);
}

// ========================================
// TOUCH SUPPORT
// ========================================

function initTouchSupport() {
    // Prevent zoom on double-tap for buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.card, .tap-details-btn, .register-btn, .modal-close');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 200);
        }, { passive: true });
    });
    
    // Improve scrolling on mobile
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// ========================================
// EVENT CARD MODAL FUNCTIONALITY
// ========================================

function initEventCardModals() {
    const eventCards = document.querySelectorAll('.event-card');
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
    
    eventCards.forEach(card => {
        const cardHeader = card.querySelector('.card-header');
        
        
        // Create "Tap for Details" button
        const tapButton = document.createElement('div');
        tapButton.className = 'tap-details-btn';
        tapButton.innerHTML = `
            Tap for Details <span class="arrow">→</span>
        `;
        
        // Add button to card header
        cardHeader.appendChild(tapButton);
        
        // Make entire card clickable
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(card, modalOverlay);
        });
        
        // Touch support for cards
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal(modalOverlay);
        }
    });
    
    // Prevent body scroll when modal is open
    modalOverlay.addEventListener('touchmove', (e) => {
        if (e.target === modalOverlay) {
            e.preventDefault();
        }
    }, { passive: false });
}

function openModal(card, modalOverlay) {
    // Get card details
    const eventName = card.querySelector('.card-header h3').textContent;
    const eventTiming = card.querySelector('.event-timing').textContent;
    const eventTeam = card.querySelector('.event-team').textContent;
    const cardDetails = card.querySelector('.card-details');
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close modal');
    closeBtn.addEventListener('click', () => closeModal(modalOverlay));
    
    // Touch feedback for close button
    closeBtn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.9)';
    }, { passive: true });
    
    closeBtn.addEventListener('touchend', function() {
        this.style.transform = '';
    }, { passive: true });
    
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `
        <h3>${eventName}</h3>
        <p class="event-timing">${eventTiming}</p>
        <p class="event-team">${eventTeam}</p>
    `;
    
    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerHTML = cardDetails.innerHTML;
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    // Clear any existing content and add new modal
    modalOverlay.innerHTML = '';
    modalOverlay.appendChild(modalContent);
    
    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus trap for accessibility
    closeBtn.focus();
    
    // Scroll to top of modal content
    modalContent.scrollTop = 0;
}

function closeModal(modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Remove modal content after animation
    setTimeout(() => {
        modalOverlay.innerHTML = '';
    }, 300);
}

// ========================================
// ANIMATED BACKGROUND LAYERS
// ========================================

function initAnimatedBackground() {
    const animatedBg = document.createElement('div');
    animatedBg.className = 'animated-bg';
    document.body.insertBefore(animatedBg, document.body.firstChild);
    
    const cloudLayer1 = document.createElement('div');
    cloudLayer1.className = 'cloud-layer';
    animatedBg.appendChild(cloudLayer1);
    
    const cloudLayer2 = document.createElement('div');
    cloudLayer2.className = 'cloud-layer-2';
    animatedBg.appendChild(cloudLayer2);
    
    const cloudLayer3 = document.createElement('div');
    cloudLayer3.className = 'cloud-layer-3';
    animatedBg.appendChild(cloudLayer3);
    
    
    const vignette = document.createElement('div');
    vignette.className = 'vignette';
    animatedBg.appendChild(vignette);
    
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight';
    animatedBg.appendChild(spotlight);
    
    const spotlightGlow = document.createElement('div');
    spotlightGlow.className = 'spotlight-glow';
    animatedBg.appendChild(spotlightGlow);
    
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    lightning.id = 'lightning';
    animatedBg.appendChild(lightning);
}

// ========================================
// LIGHTNING EFFECTS
// ========================================

function initLightning() {
    const lightning = document.getElementById('lightning');
    if (!lightning) return;
    
    // Reduce lightning frequency on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const baseDelay = isMobile ? 7000 : 3000;
    
    function createLightning() {
        const nextStrike = Math.random() * 5000 + baseDelay;
        
        setTimeout(() => {
            lightning.style.background = 'rgba(247, 66, 111, 0.3)';
            lightning.style.opacity = '1';
            
            setTimeout(() => {
                lightning.style.opacity = '0';
            }, 100);
            
            setTimeout(() => {
                lightning.style.background = 'rgba(247, 66, 111, 0.4)';
                lightning.style.opacity = '1';
                
                setTimeout(() => {
                    lightning.style.opacity = '0';
                    lightning.style.background = 'transparent';
                }, 80);
            }, 200);
            
            createLightning();
        }, nextStrike);
    }
    
    setTimeout(createLightning, 3000);
}

// ========================================
// CANVAS PARTICLE SYSTEM
// ========================================

function initCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.insertBefore(canvas, document.body.firstChild.nextSibling);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 250);
    });
    
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.2;
            
            const colors = ['#f7426f', '#00d9c0', '#00ff87', '#ff0844'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            this.shape = Math.floor(Math.random() * 3);
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            
            if (this.y > canvas.height + 10) {
                this.reset();
            }
            
            this.opacity = 0.3 + Math.sin(Date.now() * 0.001 + this.x) * 0.2;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            
            switch(this.shape) {
                case 0:
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 1:
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y - this.size);
                    ctx.lineTo(this.x - this.size, this.y + this.size);
                    ctx.lineTo(this.x + this.size, this.y + this.size);
                    ctx.closePath();
                    ctx.fill();
                    break;
                    
                case 2:
                    ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
                    break;
            }
            
            ctx.restore();
        }
    }
    
    // Responsive particle count
    function getParticleCount() {
        if (window.innerWidth < 480) return 30;
        if (window.innerWidth < 768) return 40;
        if (window.innerWidth < 1024) return 60;
        return 100;
    }
    
    const particleCount = getParticleCount();
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Update particle count on resize
    window.addEventListener('resize', () => {
        const newCount = getParticleCount();
        if (newCount > particles.length) {
            for (let i = particles.length; i < newCount; i++) {
                particles.push(new Particle());
            }
        } else if (newCount < particles.length) {
            particles = particles.slice(0, newCount);
        }
    });
    
    function drawConnections() {
        ctx.save();
        const maxDistance = window.innerWidth < 768 ? 100 : 150;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.globalAlpha = (1 - distance / maxDistance) * 0.15;
                    ctx.strokeStyle = '#f7426f';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        ctx.restore();
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    let mouse = { x: null, y: null, radius: window.innerWidth < 768 ? 100 : 150 };
    
    // Mouse interaction (desktop only)
    if (!('ontouchstart' in window)) {
        canvas.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
            
            particles.forEach(particle => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.x -= Math.cos(angle) * force * 3;
                    particle.y -= Math.sin(angle) * force * 3;
                }
            });
        });
        
        canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });
    }
    
    // Pause animation when page is hidden (performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ========================================
// GEOMETRIC SHAPES
// ========================================

function initGeometricShapes() {
    // Don't add shapes on very small screens
    if (window.innerWidth < 480) {
        return;
    }
    
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'geometric-shapes';
    document.body.insertBefore(shapesContainer, document.body.firstChild);
    
    const shapes = [
        { class: 'circle', delay: 0 },
        { class: 'triangle', delay: 1 },
        { class: 'square', delay: 2 },
        { class: 'circle-2', delay: 3 },
        { class: 'triangle-2', delay: 4 },
        { class: 'square-2', delay: 5 }
    ];
    
    shapes.forEach(shape => {
        const div = document.createElement('div');
        div.className = `shape ${shape.class}`;
        div.style.animationDelay = `${shape.delay}s`;
        shapesContainer.appendChild(div);
    });
    
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'grid-overlay';
    document.body.insertBefore(gridOverlay, document.body.firstChild);
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Calculate offset for mobile (account for any fixed headers)
                const offset = window.innerWidth < 768 ? 20 : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS FOR TIMELINE
// ========================================

function initScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Adjust threshold based on screen size
    const threshold = window.innerWidth < 768 ? 0.1 : 0.2;
    
    const observerOptions = {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ========================================
// BUTTON EFFECTS
// ========================================

function initButtonEffects() {
    const registerBtn = document.getElementById('register-btn');
    
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            triggerBombExplosion();
            
            setTimeout(() => {
                window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfM2fvAd18VqrETj4iOcd8sHPangCXd18MYV76sHZGPAttJag/viewform?usp=sharing&ouid=104229856726734096506';
            }, 1500);
        });
        
        // Touch feedback
        registerBtn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        registerBtn.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    }
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// ========================================
// BOMB EXPLOSION ANIMATION
// ========================================

function triggerBombExplosion() {
    const explosionContainer = document.createElement('div');
    explosionContainer.className = 'explosion-container active';
    document.body.appendChild(explosionContainer);
    
    const whiteFlash = document.createElement('div');
    whiteFlash.className = 'white-flash active';
    document.body.appendChild(whiteFlash);
    
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500);
    
    const flash = document.createElement('div');
    flash.className = 'explosion-flash';
    explosionContainer.appendChild(flash);
    
    for (let i = 0; i < 4; i++) {
        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave';
        explosionContainer.appendChild(shockwave);
    }
    
    // Adjust particle count based on device
    const particleCount = window.innerWidth < 768 ? 25 : 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = (window.innerWidth < 768 ? 150 : 200) + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        const colors = ['#f7426f', '#ff0844', '#00d9c0', '#00ff87'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${4 + Math.random() * 8}px`;
        particle.style.height = particle.style.width;
        
        explosionContainer.appendChild(particle);
    }
    
    const lightning = document.getElementById('lightning');
    if (lightning) {
        lightning.style.background = 'rgba(255, 255, 255, 0.8)';
        lightning.style.opacity = '1';
        setTimeout(() => {
            lightning.style.background = 'rgba(247, 66, 111, 0.6)';
        }, 100);
        setTimeout(() => {
            lightning.style.opacity = '0';
            lightning.style.background = 'transparent';
        }, 400);
    }
    
    setTimeout(() => {
        explosionContainer.remove();
        whiteFlash.remove();
    }, 1500);
}

// ========================================
// TITLE GLITCH EFFECT
// ========================================

function glitchTitle() {
    const title = document.querySelector('.logo h1');
    if (!title) return;
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            const glitchAmount = window.innerWidth < 768 ? 5 : 10;
            title.style.textShadow = `
                ${Math.random() * glitchAmount - glitchAmount/2}px ${Math.random() * glitchAmount - glitchAmount/2}px 0 #f7426f,
                ${Math.random() * glitchAmount - glitchAmount/2}px ${Math.random() * glitchAmount - glitchAmount/2}px 0 #00d9c0
            `;
            
            setTimeout(() => {
                title.style.textShadow = '0 0 60px rgba(247, 66, 111, 0.5)';
            }, 50);
        }
    }, 100);
}

glitchTitle();

// ========================================
// PERFORMANCE MONITORING
// ========================================

// Monitor FPS and reduce effects if necessary
let lastFrameTime = performance.now();
let fps = 60;
let frameCount = 0;

function monitorPerformance() {
    frameCount++;
    const currentTime = performance.now();
    const delta = currentTime - lastFrameTime;
    
    if (delta >= 1000) {
        fps = Math.round((frameCount * 1000) / delta);
        frameCount = 0;
        lastFrameTime = currentTime;
        
        // If FPS drops below 30, reduce effects
        if (fps < 30 && !document.body.classList.contains('low-performance')) {
            document.body.classList.add('low-performance');
            console.log('Low performance detected, reducing effects');
        }
    }
    
    requestAnimationFrame(monitorPerformance);
}

if (window.innerWidth >= 768) {
    requestAnimationFrame(monitorPerformance);
}

// ========================================
// BATTERY OPTIMIZATION
// ========================================

if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        function updateBatteryStatus() {
            // Reduce animations when battery is low
            if (battery.level < 0.2 && !battery.charging) {
                document.body.classList.add('low-battery');
            } else {
                document.body.classList.remove('low-battery');
            }
        }
        
        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);
        updateBatteryStatus();
    });
}

// ========================================
// SERVICE WORKER REGISTRATION (Optional)
// ========================================

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, continue without it
        });
    });
}
