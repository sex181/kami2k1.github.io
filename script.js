const glow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if(glow) {
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
    }
    requestAnimationFrame(animateGlow);
}
animateGlow();

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span style="color:#64ffda;opacity:0.7">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

const nameEl = document.querySelector('.hero-info h1');
let fx = null;
if (nameEl) {
    fx = new TextScramble(nameEl);
    setTimeout(() => fx.setText('Kami2k1'), 500);
}

const heroChildren = document.querySelectorAll('.hero-info > *');
heroChildren.forEach((child, i) => {
    setTimeout(() => child.classList.add('anim-in'), 300 + i * 200);
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.text-content p, .code-comment').forEach(el => {
    revealObserver.observe(el);
});

const chipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chips = entry.target.querySelectorAll('.skill-chip');
            chips.forEach((chip, i) => {
                setTimeout(() => chip.classList.add('revealed'), i * 80);
            });
            chipObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-grid').forEach(grid => chipObserver.observe(grid));

document.querySelectorAll('.socials a').forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translate(0, 0)';
    });
});

const avatar = document.querySelector('.avatar-wrap');
if(avatar) {
    avatar.addEventListener('mousemove', (e) => {
        const rect = avatar.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        avatar.querySelector('img').style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.05)`;
    });
    avatar.addEventListener('mouseleave', () => {
        avatar.querySelector('img').style.transform = 'rotateY(0) rotateX(0) scale(1)';
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('text-lightSlate');
        link.classList.add('text-slate');
        link.querySelector('span').classList.remove('w-[60px]', 'bg-lightSlate');
        link.querySelector('span').classList.add('w-[30px]', 'bg-slate');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.remove('text-slate');
            link.classList.add('text-lightSlate');
            link.querySelector('span').classList.remove('w-[30px]', 'bg-slate');
            link.querySelector('span').classList.add('w-[60px]', 'bg-lightSlate');
        }
    });
});

const particlesContainer = document.getElementById('particles');
if(particlesContainer) {
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            konamiIndex = 0;
            document.body.style.transition = 'filter 0.5s';
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => document.body.style.filter = 'none', 3000);
            if(fx) {
                fx.setText('H4CK3R M0D3').then(() => {
                    setTimeout(() => fx.setText('Kami2k1'), 2000);
                });
            }
        }
    } else {
        konamiIndex = 0;
    }
});
