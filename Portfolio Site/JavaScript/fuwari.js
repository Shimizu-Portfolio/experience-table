const AnimationModule = (function() {
    document.addEventListener('DOMContentLoaded', () => {
        const items = document.querySelectorAll('.fade-in');
        let hasAnimated = false;

        const checkVisibility = () => {
            const triggerBottom = window.innerHeight / 5 * 4;

            if (hasAnimated) return;

            items.forEach((item, index) => {
                const itemTop = item.getBoundingClientRect().top;

                if (itemTop < triggerBottom) {
                    setTimeout(() => {
                        item.classList.add('visible');
                        if (index === items.length - 1) {
                            hasAnimated = true;
                        }
                    }, index * 100);
                }
            });
        };

        checkVisibility();
        window.addEventListener('scroll', checkVisibility);
    });
})();
