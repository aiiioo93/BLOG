// Blog animations et interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // === Scroll to top button ===
    createScrollToTopButton();
    
    // === Navbar scroll effect ===
    handleNavbarScroll();
    
    // === Smooth scroll ===
    enableSmoothScroll();
    
    // === Animate elements on scroll ===
    observeElements();
    
    // === Form validation animations ===
    enhanceFormValidation();
    
    // === Card hover effects ===
    addCardParallax();
    
    // === Add reading progress bar ===
    if (document.querySelector('article')) {
        addReadingProgressBar();
    }
    
    // === Typing effect for titles ===
    if (window.location.pathname === '/') {
        addTypingEffect();
    }
});

// Créer le bouton scroll to top
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(button);
    
    // Afficher/masquer selon le scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    // Click event
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Effet sur la navbar au scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scroll pour tous les liens
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Observer les éléments pour les animer au scroll
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observer les cards qui ne sont pas encore animées
    document.querySelectorAll('.card, article, section').forEach(el => {
        observer.observe(el);
    });
}

// Améliorer la validation des formulaires
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Animation sur focus
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                
                // Validation visuelle
                if (this.value.trim() !== '') {
                    this.classList.add('filled');
                } else {
                    this.classList.remove('filled');
                }
            });
            
            // Validation en temps réel
            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else if (this.value !== '') {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
        });
        
        // Animation lors de la soumission
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn && this.checkValidity()) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Créer un spinner
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading"></span> Envoi...';
            }
        });
    });
}

// Effet parallax sur les cards
function addCardParallax() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Barre de progression de lecture
function addReadingProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'readingProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const article = document.querySelector('article');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const scrolled = window.pageYOffset - articleTop;
        const progress = (scrolled / articleHeight) * 100;
        
        progressBar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
    });
}

// Effet de typing pour le titre principal
function addTypingEffect() {
    const title = document.querySelector('h1');
    if (!title) return;
    
    const originalText = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid';
    title.style.animation = 'blink 0.7s infinite';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            title.style.borderRight = 'none';
        }
    };
    
    setTimeout(typeWriter, 500);
    
    // Animation du curseur
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: #667eea; }
        }
    `;
    document.head.appendChild(style);
}

// Animation de particules en arrière-plan (légère)
function addParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);
    
    // Créer quelques particules
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
        `;
        particlesContainer.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-10px); }
            75% { transform: translateY(-20px) translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

// Effet de parallax sur le scroll
function addScrollParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.card, article');
        
        parallaxElements.forEach((el, index) => {
            const speed = (index % 3 + 1) * 0.1;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Confettis lors de la soumission réussie d'un commentaire
function showConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#48bb78'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            animation: fall ${Math.random() * 2 + 2}s linear forwards;
            z-index: 10000;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('#confetti-style')) {
        style.id = 'confetti-style';
        document.head.appendChild(style);
    }
}

// Afficher les confettis si message de succès
if (document.querySelector('.alert-success')) {
    setTimeout(showConfetti, 200);
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});

console.log('🎨 Blog chargé avec succès! Animations activées.');
console.log('💡 Tip: Essayez le Konami Code pour un effet surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA');



