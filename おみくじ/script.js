let lastFortune = null;

document.getElementById("draw-btn").addEventListener("click", function() {
    const fortunes = [
        { text: "大吉", color: "#ff0000", bg: ["#ffcccc", "#ff9999"], bodyBg: "#ff7777" },
        { text: "中吉", color: "#ff4444", bg: ["#ffdddd", "#ffbbbb"], bodyBg: "#ff9999" },
        { text: "小吉", color: "#ff6666", bg: ["#ffeeee", "#ffcccc"], bodyBg: "#ffbbbb" },
        { text: "凶", color: "#ffffff", bg: ["#333333", "#ff7777"], bodyBg: "#222222" }
    ];
    
    let availableFortunes = fortunes.filter(f => f.text !== lastFortune);
    let randomFortune = availableFortunes[Math.floor(Math.random() * availableFortunes.length)];
    lastFortune = randomFortune.text;

    const resultContainer = document.getElementById("result-container");
    const resultElement = document.getElementById("result");
    const titleElement = document.getElementById("title");

    resultElement.textContent = randomFortune.text;
    resultElement.style.color = randomFortune.color;

    resultContainer.style.background = `linear-gradient(135deg, ${randomFortune.bg[0]}, ${randomFortune.bg[1]})`;
    document.body.style.background = randomFortune.bodyBg;

    if (randomFortune.text === "凶") {
        titleElement.style.color = "#ff0000";
        resultContainer.classList.add("shake");
    } else {
        titleElement.style.color = "#333";
        resultContainer.classList.remove("shake");
    }

    resultContainer.style.display = "block";
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let animationFrame;
let animationActive = false;

function createParticles(type) {
    cancelAnimationFrame(animationFrame);
    particles = [];

    let particleCount, colorPalette, speed, size, effect;

    switch (type) {
        case "大吉":
            particleCount = 300;
            colorPalette = ["#FFD700", "#FFEC8B", "#FFFACD", "#FF4500"];
            speed = 6;
            size = [4, 10];
            effect = "explosion";
            break;
        case "中吉":
            particleCount = 300;
            colorPalette = ["#FFD700", "#FFFFE0", "#FFFAF0", "#FFA500"];
            speed = 5;
            size = [3, 8];
            effect = "float";
            break;
        case "小吉":
            particleCount = 300;
            colorPalette = ["#FFA07A", "#FFB6C1", "#FFC0CB", "#FF69B4"];
            speed = 4;
            size = [3, 7];
            effect = "softSpread";
            break;
        case "凶":
            particleCount = 300;
            colorPalette = ["#000000", "#660000", "#FF0000", "#800000"];
            speed = 6;
            size = [4, 9];
            effect = "scatter";
            break;
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(colorPalette, speed, size, effect));
    }

    animationActive = true;
    animateParticles();
}

function createParticle(colorPalette, speed, size, effect) {
    let angle = Math.random() * Math.PI * 2;
    let velocity = (Math.random() * 2.5 + 0.5) * speed;
    let directionX = Math.cos(angle) * velocity;
    let directionY = Math.sin(angle) * velocity;

    return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: Math.random() * (size[1] - size[0]) + size[0],
        dx: directionX,
        dy: directionY,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        alpha: 1,
        shrinkRate: Math.random() * 0.05,
        effect: effect,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
    };
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.globalAlpha = p.alpha;

        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "rgba(255,255,255,0.8)";
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.shrinkRate;
        p.rotation += p.rotationSpeed;

        if (p.alpha <= 0 || p.radius <= 0) {
            particles.splice(i, 1);
        }
    }

    if (particles.length > 0) {
        animationFrame = requestAnimationFrame(animateParticles);
    } else {
        animationActive = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

document.getElementById("draw-btn").addEventListener("click", function() {
    createParticles(lastFortune);
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
