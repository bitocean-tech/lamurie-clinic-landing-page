// Menu Mobile Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Alternar menu mobile
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Scroll Suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Ignorar links vazios
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efeito de scroll no header (mudança de cor/transparência)
let lastScroll = 0;
const nav = document.querySelector('.nav');

// Parallax suave para elementos do hero
const heroText = document.querySelector('.hero-text');
const heroImage = document.querySelector('.hero-image');
const floatingShapes = document.querySelectorAll('.shape');

// Throttle function para melhor performance
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

window.addEventListener('scroll', throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Parallax suave no hero (apenas em desktop)
    if (currentScroll < window.innerHeight && window.innerWidth > 768) {
        const scrollPercent = currentScroll / window.innerHeight;
        
        // Parallax no texto
        if (heroText) {
            heroText.style.transform = `translateY(${scrollPercent * 40}px)`;
            heroText.style.opacity = 1 - scrollPercent * 0.8;
        }
        
        // Parallax mais sutil na imagem
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPercent * 20}px)`;
            heroImage.style.opacity = 1 - scrollPercent * 0.6;
        }
    }
    
    lastScroll = currentScroll;
}, 10));

// Movimento do mouse para interatividade no hero (apenas desktop)
const hero = document.querySelector('.hero');
const isDesktop = window.innerWidth > 768;

if (hero && isDesktop) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;
        
        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            shape.style.transition = 'transform 0.3s ease-out';
            shape.style.transform = `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
        });
    });
    
    // Reset ao sair do hero
    hero.addEventListener('mouseleave', () => {
        floatingShapes.forEach((shape) => {
            shape.style.transform = 'translate(0, 0)';
        });
    });
}

// Animação de entrada para elementos ao fazer scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que devem animar
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.metodo-content, .tratamentos-grid, .sobre-content');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Animação suave para os cards dos diferenciais (fade + blur + translateY)
    const diferencialCards = document.querySelectorAll('.diferencial-item');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 200px 0px'
    });
    
    diferencialCards.forEach((card, index) => {
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out';
        card.style.transitionDelay = `${index * 0.08}s`;
        cardObserver.observe(card);
    });
    
    // Animação para os cards de tratamento
    const tratamentoCards = document.querySelectorAll('.tratamento-card');
    
    tratamentoCards.forEach((card, index) => {
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out';
        card.style.transitionDelay = `${index * 0.08}s`;
        cardObserver.observe(card);
    });
    
    // Animação para os elementos do método
    const metodoHero = document.querySelector('.metodo-hero');
    const metodoDescriptionBox = document.querySelector('.metodo-description-box');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (metodoHero) {
        metodoHero.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out';
        cardObserver.observe(metodoHero);
    }
    
    if (metodoDescriptionBox) {
        metodoDescriptionBox.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out';
        metodoDescriptionBox.style.transitionDelay = '0.2s';
        cardObserver.observe(metodoDescriptionBox);
    }
    
    timelineItems.forEach((item, index) => {
        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out';
        item.style.transitionDelay = `${index * 0.1}s`;
        cardObserver.observe(item);
    });
    
    // Animação para a seção da profissional
    const sobreProfFoto = document.querySelector('.sobre-prof-foto');
    const sobreProfTexto = document.querySelector('.sobre-prof-texto');
    const profLines = document.querySelectorAll('.prof-line');
    
    if (sobreProfFoto) {
        cardObserver.observe(sobreProfFoto);
    }
    
    if (sobreProfTexto) {
        cardObserver.observe(sobreProfTexto);
    }
    
    profLines.forEach((line, index) => {
        line.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out';
        line.style.transitionDelay = `${index * 0.1}s`;
        cardObserver.observe(line);
    });
});

// Fechar menu ao clicar fora dele (mobile)
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || mobileMenuToggle.contains(e.target);
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Adicionar classe ativa ao link de navegação baseado na seção visível
const sections = document.querySelectorAll('section[id], header[id]');
const navLinksArray = Array.from(navLinks);

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Prevenir comportamento padrão para links WhatsApp (garantir abertura em nova aba)
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Link já está configurado com target="_blank", mas garantimos que funcione
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// Galeria Lightbox
document.addEventListener('DOMContentLoaded', () => {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = [];
    
    // Coletar dados de todas as imagens
    galeriaItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const title = item.querySelector('.galeria-info h4')?.textContent || '';
        const description = item.querySelector('.galeria-info p')?.textContent || '';
        
        images.push({
            src: img.src,
            alt: img.alt,
            title: title,
            description: description
        });
        
        // Adicionar evento de clique
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxContent();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateLightboxContent() {
        const currentImage = images[currentImageIndex];
        lightboxImg.src = currentImage.src;
        lightboxImg.alt = currentImage.alt;
        lightboxTitle.textContent = currentImage.title;
        lightboxDescription.textContent = currentImage.description;
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxContent();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxContent();
    }
    
    // Event Listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Fechar ao clicar no fundo
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    // Atualizar ano dinamicamente no footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
