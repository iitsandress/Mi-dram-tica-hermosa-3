// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// ===== INICIALIZACIÓN DE LA APLICACIÓN =====
function initializeApp() {
    // Mostrar pantalla de carga
    showLoadingScreen();
    
    // Inicializar todas las funcionalidades
    setTimeout(() => {
        hideLoadingScreen();
        initializeParticles();
        initializeCounter();
        initializeLightbox();
        initializeCarousel();
        initializeThemeToggle();
        initializeMusicControls();
        initializeScrollAnimations();
        initializeIntersectionObserver();
    }, 2000);
}

// ===== PANTALLA DE CARGA =====
function showLoadingScreen() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'flex';
    }
}

function hideLoadingScreen() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
}

// ===== SISTEMA DE PARTÍCULAS MEJORADO =====
function initializeParticles() {
    const container = document.getElementById('particulas-container');
    const heartEmojis = ['💖', '💝', '💞', '💕', '💗', '💘', '💙', '💜', '🤍', '❤️'];
    
    // Crear partículas iniciales
    for (let i = 0; i < 30; i++) {
        createParticle(container, heartEmojis);
    }
    
    // Crear nuevas partículas periódicamente
    setInterval(() => {
        if (container.children.length < 50) {
            createParticle(container, heartEmojis);
        }
    }, 3000);
}

function createParticle(container, emojis) {
    const particle = document.createElement('div');
    particle.className = 'corazon-flotante';
    
    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Emoji aleatorio
    particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Duración de animación aleatoria
    particle.style.animationDuration = (3 + Math.random() * 4) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Eliminar partícula después de un tiempo
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 8000);
}

// ===== CONTADOR DE TIEMPO MEJORADO =====
function initializeCounter() {
    const fechaInicio = new Date('2025-06-12T00:00:00');
    
    function updateCounter() {
        const ahora = new Date();
        const diferencia = ahora - fechaInicio;
        
        if (diferencia < 0) {
            // Si la fecha aún no ha llegado, mostrar cuenta regresiva
            const diferenciaNegativa = Math.abs(diferencia);
            const dias = Math.floor(diferenciaNegativa / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferenciaNegativa % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferenciaNegativa % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferenciaNegativa % (1000 * 60)) / 1000);
            
            updateCounterDisplay(dias, horas, minutos, segundos, true);
        } else {
            // Tiempo transcurrido desde la fecha
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
            
            updateCounterDisplay(dias, horas, minutos, segundos, false);
        }
    }
    
    function updateCounterDisplay(dias, horas, minutos, segundos, isCountdown) {
        const diasEl = document.getElementById('dias');
        const horasEl = document.getElementById('horas');
        const minutosEl = document.getElementById('minutos');
        const segundosEl = document.getElementById('segundos');
        
        if (diasEl) diasEl.textContent = dias;
        if (horasEl) horasEl.textContent = horas;
        if (minutosEl) minutosEl.textContent = minutos;
        if (segundosEl) segundosEl.textContent = segundos;
        
        // Agregar efecto de pulso en los números que cambian
        animateCounterChange(segundosEl);
        if (segundos === 0) animateCounterChange(minutosEl);
        if (minutos === 0 && segundos === 0) animateCounterChange(horasEl);
        if (horas === 0 && minutos === 0 && segundos === 0) animateCounterChange(diasEl);
    }
    
    function animateCounterChange(element) {
        if (element) {
            element.style.transform = 'scale(1.2)';
            element.style.color = '#ffd700';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 200);
        }
    }
    
    // Actualizar cada segundo
    setInterval(updateCounter, 1000);
    updateCounter(); // Llamada inicial
}

// ===== LIGHTBOX PARA GALERÍA =====
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    const imageContainers = document.querySelectorAll('.image-container');
    
    let currentImageIndex = 0;
    const images = Array.from(imageContainers).map(container => {
        const img = container.querySelector('img');
        return {
            src: img.src,
            alt: img.alt
        };
    });
    
    // Actualizar total de imágenes
    if (lightboxTotal) {
        lightboxTotal.textContent = images.length;
    }
    
    // Abrir lightbox al hacer clic en una imagen
    imageContainers.forEach((container, index) => {
        container.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    // Cerrar lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Navegación
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPreviousImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
        if (e.key === 'ArrowLeft' && lightbox.style.display === 'block') {
            showPreviousImage();
        }
        if (e.key === 'ArrowRight' && lightbox.style.display === 'block') {
            showNextImage();
        }
    });
    
    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function openLightbox() {
        lightbox.style.display = 'block';
        showCurrentImage();
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    function showCurrentImage() {
        if (lightboxImg && images[currentImageIndex]) {
            lightboxImg.src = images[currentImageIndex].src;
            lightboxImg.alt = images[currentImageIndex].alt;
            
            if (lightboxCurrent) {
                lightboxCurrent.textContent = currentImageIndex + 1;
            }
        }
    }
    
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showCurrentImage();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showCurrentImage();
    }
}

// ===== CARRUSEL DE FRASES =====
function initializeCarousel() {
    const frases = document.querySelectorAll('.frase-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentFrase = 0;
    
    function showFrase(index) {
        frases.forEach((frase, i) => {
            frase.classList.toggle('active', i === index);
        });
    }
    
    function nextFrase() {
        currentFrase = (currentFrase + 1) % frases.length;
        showFrase(currentFrase);
    }
    
    function prevFrase() {
        currentFrase = (currentFrase - 1 + frases.length) % frases.length;
        showFrase(currentFrase);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextFrase);
    if (prevBtn) prevBtn.addEventListener('click', prevFrase);
    
    // Auto-avanzar cada 5 segundos
    setInterval(nextFrase, 5000);
}

// ===== TOGGLE DE TEMA (MODO OSCURO PREDETERMINADO) =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark'; // Modo oscuro por defecto
    
    // Aplicar tema guardado
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Efecto de transición suave
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
    
    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }
}

// ===== CONTROLES DE MÚSICA =====
function initializeMusicControls() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    let isPlaying = false;
    
    // Intentar reproducir automáticamente al cargar (con retraso para mejor experiencia)
    if (backgroundMusic) {
        const sources = backgroundMusic.querySelectorAll('source');
        if (backgroundMusic.src || sources.length > 0) {
            // Configurar volumen inicial
            backgroundMusic.volume = 0.7;
            
            // Esperar un poco después de la pantalla de carga
            setTimeout(() => {
                // Intentar reproducir automáticamente
                backgroundMusic.play().then(() => {
                    isPlaying = true;
                    musicToggle.textContent = '🔇';
                    musicToggle.title = 'Pausar música';
                    console.log('🎵 Música iniciada automáticamente');
                    
                    // Mostrar notificación de que la música está sonando
                    setTimeout(() => {
                        showNotification('🎵 Música romántica activada 💕', { duration: 2300 });
                    }, 1000);
                }).catch(e => {
                    console.log('Reproducción automática bloqueada por el navegador:', e);
                    // Mostrar mensaje amigable si la reproducción automática está bloqueada
                    setTimeout(() => {
                        showNotification('Haz clic en 🎵 para escuchar música romántica 💕');
                    }, 1500);
                    
                    // Agregar listener para iniciar música en la primera interacción
                    const startMusicOnInteraction = () => {
                        if (!isPlaying) {
                            backgroundMusic.play().then(() => {
                                isPlaying = true;
                                musicToggle.textContent = '🔇';
                                musicToggle.title = 'Pausar música';
                                showNotification('🎵 Música romántica activada 💕', { duration: 2300 });
                                // Remover listeners después del primer uso
                                document.removeEventListener('click', startMusicOnInteraction);
                                document.removeEventListener('keydown', startMusicOnInteraction);
                            }).catch(err => console.log('Error al iniciar música:', err));
                        }
                    };
                    
                    // Escuchar primera interacción del usuario
                    document.addEventListener('click', startMusicOnInteraction, { once: true });
                    document.addEventListener('keydown', startMusicOnInteraction, { once: true });
                });
            }, 500);
        }
    }
    
    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                backgroundMusic.pause();
                musicToggle.textContent = '🎵';
                musicToggle.title = 'Reproducir música romántica';
            } else {
                // Solo intentar reproducir si hay una fuente de audio
                const sources = backgroundMusic.querySelectorAll('source');
                if (backgroundMusic.src || sources.length > 0) {
                    backgroundMusic.play().catch(e => {
                        console.log('No se pudo reproducir la música:', e);
                        showNotification('Haz clic para permitir la reproducción de música 🎵');
                    });
                    musicToggle.textContent = '🔇';
                    musicToggle.title = 'Pausar música';
                } else {
                    showNotification('Agrega tu canción romántica favorita en el archivo HTML 🎵');
                }
            }
            isPlaying = !isPlaying;
        });
        
        // Actualizar estado cuando la música termine
        backgroundMusic.addEventListener('ended', () => {
            isPlaying = false;
            musicToggle.textContent = '🎵';
            musicToggle.title = 'Reproducir música romántica';
        });
    }
}

// ===== ANIMACIONES DE SCROLL =====
function initializeScrollAnimations() {
    // Animación suave para elementos que entran en vista
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
    
    // Observar elementos con clase fade-in-up
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
}

// ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Agregar partículas especiales cuando se ve el contador
                if (entry.target.classList.contains('contador-amor')) {
                    createSpecialParticles();
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.momento').forEach(el => {
        observer.observe(el);
    });
}

// ===== PARTÍCULAS ESPECIALES =====
function createSpecialParticles() {
    const container = document.getElementById('particulas-container');
    const specialEmojis = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'corazon-flotante';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.fontSize = '2rem';
            particle.innerHTML = specialEmojis[Math.floor(Math.random() * specialEmojis.length)];
            particle.style.animation = 'flotar 3s ease-out forwards';
            
            container.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 3000);
        }, i * 200);
    }
}

// ===== MENSAJES ROMÁNTICOS MEJORADOS =====
const mensajesRomanticos = [
    "Eres mi persona favorita en el mundo entero 🌍",
    "de ti me dejo hacer de todo, hasta maquillarme 😙",
    "Quiero despertar contigo todos mis días ☀️",
    "Eres la mejor persona que he podido conocer 💖",
    "Tu pecho es mi lugar en el que quiero estar 😊",
    "Contigo el tiempo se detiene y a la vez vuela 🕰️",
    "Tu voz es la melodía más hermosa que conozco 🎵",
    "Cada día contigo es un dia que mas me enamoro de ti 😍",
    "Eres la mujer que siempre eh querido tener a mi lado 💕",
    "tus besos es lo que mas ahnelo en este mundo 🤗",
    "Mi corazón se acelera cuando estoy contigo 💓",
    "Eres mi estrella en la noche más oscura ⭐",
    "Contigo aprendí que el amor verdadero existe 💕"
];

let mensajeActual = 0;

function mostrarMensajeSecreto() {
    const mensaje = mensajesRomanticos[mensajeActual];
    showNotification(mensaje, { persist: true, animateChange: true });
    
    // Crear efecto de corazones
    createHeartBurst();
    
    // Avanzar al siguiente mensaje
    mensajeActual = (mensajeActual + 1) % mensajesRomanticos.length;
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, options = {}) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    if (!notification || !notificationText) return;

    // Animación suave del texto
    notificationText.classList.add('notification-text-anim');

    // Botón de cierre (×) en la esquina superior derecha
    const content = notification.querySelector('.notification-content') || notification;
    let closeBtn = content.querySelector('.notification-close');
    if (!closeBtn) {
        closeBtn = document.createElement('button');
        closeBtn.className = 'notification-close';
        closeBtn.setAttribute('aria-label', 'Cerrar notificación');
        closeBtn.textContent = '×';
        content.appendChild(closeBtn);
    }
    if (!closeBtn._bound) {
        closeBtn.addEventListener('click', hideNotification);
        closeBtn._bound = true;
    }

    const { duration = null, persist = (duration == null), animateChange = false } = options;

    // Cancelar temporizador previo si existe
    if (notification._hideTimer) {
        clearTimeout(notification._hideTimer);
        notification._hideTimer = null;
    }

    const applyText = () => {
        notificationText.textContent = message;
    };

    // Transición al cambiar de frase
    if (animateChange && notification.classList.contains('show') && notificationText.textContent) {
        notificationText.classList.remove('fade-in');
        notificationText.classList.add('fade-out');
        const onEnd = () => {
            notificationText.removeEventListener('transitionend', onEnd);
            applyText();
            void notificationText.offsetWidth; // Reiniciar transición
            notificationText.classList.remove('fade-out');
            notificationText.classList.add('fade-in');
            setTimeout(() => notificationText.classList.remove('fade-in'), 450);
        };
        notificationText.addEventListener('transitionend', onEnd);
    } else {
        applyText();
    }

    notification.classList.add('show');

    if (!persist && duration) {
        notification._hideTimer = setTimeout(() => {
            hideNotification();
            notification._hideTimer = null;
        }, duration);
    }
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (!notification) return;
    if (notification._hideTimer) {
        clearTimeout(notification._hideTimer);
        notification._hideTimer = null;
    }
    notification.classList.remove('show');
}

// ===== EFECTO DE EXPLOSIÓN DE CORAZONES =====
function createHeartBurst() {
    const container = document.getElementById('particulas-container');
    const heartEmojis = ['💖', '💕', '💗', '💘', '💝'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'corazon-flotante';
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '2rem';
            heart.style.position = 'fixed';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            // Animación de explosión
            const angle = (i / 15) * 2 * Math.PI;
            const distance = 100 + Math.random() * 100;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            heart.style.animation = `heartBurst 2s ease-out forwards`;
            heart.style.setProperty('--end-x', endX + 'px');
            heart.style.setProperty('--end-y', endY + 'px');
            
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 50);
    }
}

// ===== AGREGAR ESTILOS DINÁMICOS PARA ANIMACIONES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1.5);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    /* Notificación: animación suave del texto y botón de cierre */
    .notification-content { position: relative; }
    #notification-text.notification-text-anim { opacity: 1; transition: opacity 0.4s ease, transform 0.4s ease; }
    #notification-text.notification-text-anim.fade-out { opacity: 0; transform: translateY(6px); }
    #notification-text.notification-text-anim.fade-in { opacity: 1; transform: translateY(0); }
    .notification-close {
        position: absolute;
        top: 6px;
        right: 8px;
        background: transparent;
        border: none;
        color: inherit;
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        padding: 2px;
        opacity: 0.75;
    }
    .notification-close:hover { opacity: 1; }
`;
document.head.appendChild(style);

// ===== FUNCIONES DE UTILIDAD =====

// Función para generar números aleatorios en un rango
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Función para detectar si es dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para optimizar rendimiento en móviles
function optimizeForMobile() {
    if (isMobile()) {
        // Reducir número de partículas en móviles
        const container = document.getElementById('particulas-container');
        const particles = container.querySelectorAll('.corazon-flotante');
        
        if (particles.length > 20) {
            for (let i = 20; i < particles.length; i++) {
                particles[i].remove();
            }
        }
    }
}

// ===== EVENTOS DE REDIMENSIONAMIENTO =====
window.addEventListener('resize', () => {
    optimizeForMobile();
});

// ===== PREVENCIÓN DE CLIC DERECHO (OPCIONAL) =====
// Descomenta si quieres proteger las imágenes
/*
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        showNotification('Las fotos están protegidas 💕');
    }
});
*/

// ===== EASTER EGGS =====
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    
    // Easter egg después de muchos clics
    if (clickCount === 50) {
        showNotification('¡Wow! Realmente amas esta página 😍');
        createSpecialParticles();
    } else if (clickCount === 100) {
        showNotification('¡Eres increíble! 100 clics de amor 💯');
        createHeartBurst();
    }
});

// ===== MENSAJE DE BIENVENIDA =====
setTimeout(() => {
    if (!localStorage.getItem('visitedBefore')) {
        showNotification('¡Bienvenida a nuestra página especial! 💕');
        localStorage.setItem('visitedBefore', 'true');
    }
}, 3000);

// ===== FUNCIONES PARA LAZY LOADING =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Forzar carga
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    // Optimizar después de que todo esté cargado
    setTimeout(optimizeForMobile, 1000);
    
    // Log de rendimiento (solo en desarrollo)
    if (window.location.hostname === 'localhost') {
        console.log('🚀 Página cargada completamente');
        console.log('💕 ¡Tu página romántica está lista!');
    }
});

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.mostrarMensajeSecreto = mostrarMensajeSecreto;
window.showNotification = showNotification;