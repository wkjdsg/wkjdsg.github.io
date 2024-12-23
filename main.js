// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 平滑滚动实现
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    };

    // 导航栏滚动效果
    const handleNavbar = () => {
        const nav = document.querySelector('.main-nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    };

    // 优化懒加载图片实现
    const lazyLoadImages = () => {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // 降级处理
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
            });
        }
    };

    // 优化工具卡片效果
    const initToolCards = () => {
        const toolCards = document.querySelectorAll('.tool-card');
        const handleHover = (e, transform, shadow) => {
            const card = e.currentTarget;
            requestAnimationFrame(() => {
                card.style.transform = transform;
                card.style.boxShadow = shadow;
            });
        };

        toolCards.forEach(card => {
            card.addEventListener('mouseenter', e => 
                handleHover(e, 'translateY(-5px)', '0 10px 20px rgba(0,0,0,0.1)'));
            card.addEventListener('mouseleave', e => 
                handleHover(e, 'translateY(0)', '0 5px 10px rgba(0,0,0,0.05)'));
        });
    };

    // 订阅表单处理
    const handleNewsletterForm = () => {
        const form = document.querySelector('.signup-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            // 这里添加你的订阅逻辑
            console.log('订阅邮箱:', email);
            alert('感谢订阅！');
            form.reset();
        });
    };

    // 返回顶部按钮
    const addBackToTop = () => {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // 初始化所有功能
    const init = () => {
        smoothScroll();
        handleNavbar();
        initToolCards();
        lazyLoadImages();
        handleNewsletterForm();
        addBackToTop();
    };

    init();
});
