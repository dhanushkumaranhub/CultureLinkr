const form = document.querySelector("form"),
    nextBtn = form.querySelector(".nextBtn"),
    backBtn = form.querySelector(".backBtn"),
    submitBtn = form.querySelector(".submit"),
    allInputFirstSection = form.querySelectorAll(".first input"),
    allInputSecondSection = form.querySelectorAll(".second input"),
    successMessage = document.getElementById("successMessage"); // Get success message div

nextBtn.addEventListener("click", () => {
    let allFilled = true;

    allInputFirstSection.forEach(input => {
        if (input.value === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        form.classList.add('secActive');
    } else {
        alert("Please fill out all fields.");
    }
});

submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); 

    let allFilled = true;

    allInputSecondSection.forEach(input => {
        if (input.value === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        successMessage.style.display = "block"; 
        triggerCrackers();
    } else {
        alert("Please fill out all fields.");
        successMessage.style.display = "none"; // Hide the success message if any input is empty
    }
});

backBtn.addEventListener("click", () => {
    form.classList.remove('secActive');
});

function triggerCrackers() {
    const canvas = document.getElementById('crackersCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor(x, y, size, speedX, speedY, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.color = color;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size *= 0.95; 
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles(x, y) {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            const speedX = (Math.random() - 0.5) * 8;
            const speedY = (Math.random() - 0.5) * 8;
            const size = Math.random() * 5 + 1;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`; 
            particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
        }
    }

    function handleParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();

            if (particlesArray[i].size < 0.2) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        if (particlesArray.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    createParticles(window.innerWidth / 2, window.innerHeight / 2);
    animate();
}
