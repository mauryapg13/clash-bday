document.addEventListener('DOMContentLoaded', () => {
    const chestContainer = document.getElementById('chest-container');
    const titleContainer = document.querySelector('.title-container');
    const overlay = document.getElementById('card-overlay');
    const nextBtn = document.getElementById('next-btn');
    const cards = [
        document.getElementById('card-1'),
        document.getElementById('card-2'),
        document.getElementById('card-3'),
        document.getElementById('card-4')
    ];
    
    let currentCardIndex = 0;

    chestContainer.addEventListener('click', () => {
        // Start shake animation
        chestContainer.classList.add('shake');
        
        // After 1.5s, "explode" and show cards
        setTimeout(() => {
            chestContainer.classList.remove('shake');
            chestContainer.classList.add('explode');
            titleContainer.style.opacity = '0';
            
            setTimeout(() => {
                overlay.classList.remove('hidden');
                showNextCard();
                createConfetti();
            }, 500);
        }, 1500);
    });

    nextBtn.addEventListener('click', () => {
        if (currentCardIndex < cards.length) {
            // Dismiss current
            cards[currentCardIndex - 1].classList.remove('active');
            cards[currentCardIndex - 1].classList.add('dismissed');
            
            // Show Next
            showNextCard();
        } else {
            // Reached end, trigger scroll edit
            overlay.classList.add('hidden'); // Hide cards overlay
            nextBtn.style.display = 'none';
            triggerScrollEdit();
        }
    });

    function showNextCard() {
        if (currentCardIndex < cards.length) {
            cards[currentCardIndex].classList.add('active');
            currentCardIndex++;
            nextBtn.classList.remove('hidden');
            
            if (currentCardIndex === cards.length) {
                nextBtn.textContent = 'FINISH';
            }
        }
    }

    function createConfetti() {
        const colors = ['#473472', '#53629E', '#87BAC3', '#D6F4ED', '#f1c40f', '#e74c3c'];
        for (let i = 0; i < 50; i++) {
            spawnParticle(colors);
        }
    }

    function massiveConfetti() {
        const colors = ['#473472', '#53629E', '#87BAC3', '#D6F4ED', '#f1c40f', '#e74c3c'];
        let count = 0;
        const interval = setInterval(() => {
            for (let i = 0; i < 15; i++) {
                spawnParticle(colors);
            }
            count++;
            if (count > 30) clearInterval(interval);
        }, 100);
    }

    function spawnParticle(colors) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        const xBase = Math.random() * window.innerWidth;
        const yBase = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.2;
        
        particle.style.left = xBase + 'px';
        particle.style.top = yBase + 'px';

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 300 + 100;
        const duration = Math.random() * 1 + 1;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance + 200}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    function triggerScrollEdit() {
        const scrollOverlay = document.getElementById('scroll-edit-overlay');
        const kingTower = document.getElementById('king-tower');
        const rocket = document.getElementById('rocket');
        const explosion = document.getElementById('explosion');
        const scrollContainer = document.getElementById('scroll-container');

        scrollOverlay.classList.remove('hidden');

        // 1. Tower rises
        setTimeout(() => {
            kingTower.style.bottom = '100px';
        }, 100);

        // 2. Rocket flies in
        setTimeout(() => {
            // Target the tower
            rocket.style.top = (window.innerHeight - 300) + 'px'; 
            rocket.style.right = (window.innerWidth / 2 - 50) + 'px';
        }, 1500);

        // 3. Explosion
        setTimeout(() => {
            rocket.style.display = 'none';
            
            explosion.style.opacity = '1';
            explosion.style.transform = 'translateX(-50%) scale(1)';
            
            // Shake screen
            document.body.classList.add('shake');
            
            // Hide tower behind explosion
            setTimeout(() => {
                kingTower.style.display = 'none';
            }, 100);
        }, 2500);

        // 4. Show Scroll & Confetti
        setTimeout(() => {
            explosion.style.opacity = '0';
            document.body.classList.remove('shake');
            
            scrollContainer.classList.remove('hidden');
            // Give it a tiny delay to allow display flex to apply before transforming
            setTimeout(() => {
                scrollContainer.style.transform = 'translate(-50%, -50%) scale(1)';
                massiveConfetti();
            }, 50);
        }, 2900);
    }
});
