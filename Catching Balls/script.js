const numBalls = 50;
const hitAreaSize = 200; 

let balls = [];
let draggingBall = null;
let offsetX = 0, offsetY = 0;
let isDragging = false;

function createBall() {
    let ball = document.createElement("div");
    ball.classList.add("ball");

    let topPosition = Math.random() * (window.innerHeight - 50);
    let leftPosition = Math.random() * (window.innerWidth - 50);

    let topSpeed = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 0.5);
    let leftSpeed = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 0.5);

    ball.style.top = topPosition + "px";
    ball.style.left = leftPosition + "px";

    document.body.appendChild(ball);

    return {
        element: ball,
        topPosition,
        leftPosition,
        topSpeed,
        leftSpeed,
        width: 50,
        height: 50
    };
}

function checkCollision(ball1, ball2) {
    let dx = ball1.leftPosition - ball2.leftPosition;
    let dy = ball1.topPosition - ball2.topPosition;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball1.width) {
        let angle = Math.atan2(dy, dx);
        let speed1 = Math.sqrt(ball1.topSpeed ** 2 + ball1.leftSpeed ** 2);
        let speed2 = Math.sqrt(ball2.topSpeed ** 2 + ball2.leftSpeed ** 2);

        ball1.topSpeed = speed2 * Math.sin(angle);
        ball1.leftSpeed = speed2 * Math.cos(angle);
        ball2.topSpeed = speed1 * Math.sin(angle + Math.PI);
        ball2.leftSpeed = speed1 * Math.cos(angle + Math.PI);
    }
}

function applyCollisions() {
    for (let i = 0; i < balls.length; i++) {
        if (draggingBall === balls[i]) continue;
        for (let j = i + 1; j < balls.length; j++) {
            if (draggingBall === balls[j]) continue;
            checkCollision(balls[i], balls[j]);
        }
    }
}

function animate() {
    for (let ball of balls) {
        if (!draggingBall || draggingBall !== ball) {
            ball.topPosition += ball.topSpeed;
            ball.leftPosition += ball.leftSpeed;

            if (ball.topPosition >= window.innerHeight - ball.height || ball.topPosition <= 0) {
                ball.topSpeed *= -1;
            }

            if (ball.leftPosition >= window.innerWidth - ball.width || ball.leftPosition <= 0) {
                ball.leftSpeed *= -1;
            }

            ball.element.style.top = ball.topPosition + "px";
            ball.element.style.left = ball.leftPosition + "px";
        }
    }

    applyCollisions();
    requestAnimationFrame(animate);
}

function setupClickListener() {
    document.body.addEventListener("click", function(event) {
        for (let ball of balls) {
            let ballRect = ball.element.getBoundingClientRect();
            let mouseX = event.clientX;
            let mouseY = event.clientY;

            let isWithinClickArea = (
                mouseX >= ballRect.left - hitAreaSize && mouseX <= ballRect.right + hitAreaSize &&
                mouseY >= ballRect.top - hitAreaSize && mouseY <= ballRect.bottom + hitAreaSize
            );

            if (isWithinClickArea && !isDragging) {
                ball.topSpeed = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 0.5);
                ball.leftSpeed = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 0.5);
            }
        }
    });
}

function setupDragListener() {
    document.body.addEventListener("mousedown", function(event) {
        if (isDragging) return;

        for (let ball of balls) {
            let ballRect = ball.element.getBoundingClientRect();
            let mouseX = event.clientX;
            let mouseY = event.clientY;

            if (
                mouseX >= ballRect.left && mouseX <= ballRect.right &&
                mouseY >= ballRect.top && mouseY <= ballRect.bottom
            ) {
                draggingBall = ball;
                offsetX = mouseX - ball.leftPosition;
                offsetY = mouseY - ball.topPosition;
                ball.topSpeed = 0;
                ball.leftSpeed = 0;
                isDragging = true;

                event.preventDefault();
                break;
            }
        }
    });

    document.addEventListener("mousemove", function(event) {
        if (draggingBall) {
            draggingBall.leftPosition = event.clientX - offsetX;
            draggingBall.topPosition = event.clientY - offsetY;

            draggingBall.element.style.top = draggingBall.topPosition + "px";
            draggingBall.element.style.left = draggingBall.leftPosition + "px";
        }
    });

    document.addEventListener("mouseup", function() {
        if (draggingBall) {
            isDragging = false;
            draggingBall = null;
        }
    });
}

function initialize() {
    try {
        for (let i = 0; i < numBalls; i++) {
            balls.push(createBall());
        }
        setupClickListener();
        setupDragListener();
        animate();
    } catch (error) {
        console.error("Error initializing the balls: ", error);
    }
}

initialize();
