document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================================
    // 1. ANIMAÇÃO DE DIGITAÇÃO (TYPING EFFECT) NO H1
    // =================================================================
    const h1Element = document.querySelector('#hero h1');
    const nameSpan = h1Element.querySelector('.text-accent-blue'); // Onde está o nome
    
    // Remove o conteúdo original para animar a digitação
    const originalText = nameSpan.textContent;
    nameSpan.textContent = ''; 

    
    const typingDelay = 600; 

    // Função de digitação
    const typeWriter = (text, element, delay) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, delay);
    };

    // Inicia a digitação após um pequeno atraso
    setTimeout(() => {
        typeWriter(originalText, nameSpan, 100); // 100ms por caractere
    }, typingDelay);


    // =================================================================
    // 2. TOGGLE PARA O MENU MOBILE
    // =================================================================
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // =================================================================
    // 3. SMOOTH SCROLL PARA NAVEGAÇÃO
    // =================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajuste para a barra de navegação fixa
                const navbar = document.querySelector('nav');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;

                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight - 20, // 20px extra para padding
                    behavior: 'smooth'
                });

                // Fecha o menu mobile se estiver aberto após o clique
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // =================================================================
    // 4. INTERSECTION OBSERVER PARA ANIMAÇÕES DE SEÇÃO
    // =================================================================
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2
    };

    const sections = document.querySelectorAll('section:not(#hero)'); // Não observa a seção hero, pois ela já tem animação
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // Estilo inicial para animação
        section.classList.add('opacity-0', 'transform', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
        sectionObserver.observe(section);
    });

    // Injeta o estilo da classe 'fade-in' (necessário para o Intersection Observer)
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});