// --- 1. Sticky Navbar Effect ---
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("sticky", window.scrollY > 0);
});

// --- 2. Mobile Menu Toggle ---
const menuToggle = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active"); // Optional: Add CSS to animate hamburger into X
});

// Close menu when clicking a link
document.querySelectorAll(".nav-menu li a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// --- 3. Typing Text Animation ---
const typingText = document.querySelector(".typing-text");
const words = [
  "Generator Repair",
  // "Concrete Mixture Repair",
  // "Motor Rewinding",
  // "Welding Works",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChars = currentWord.substring(0, charIndex);

  typingText.textContent = currentChars;

  let typeSpeed = isDeleting ? 100 : 150;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else {
    isDeleting = !isDeleting;
    typeSpeed = isDeleting ? 50 : 2000; // Pause at end of word
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, typeSpeed);
};

// Start typing effect on load
document.addEventListener("DOMContentLoaded", typeEffect);

// --- 4. Scroll Reveal Animations (Intersection Observer) ---
const revealElements = document.querySelectorAll(
  ".reveal-bottom, .reveal-left, .reveal-right",
);

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealOnScroll = new IntersectionObserver(function (
  entries,
  revealOnScroll,
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("active");
      revealOnScroll.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach((el) => {
  revealOnScroll.observe(el);
});

// --- 5. Particle Animation (Canvas) ---
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Handle resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1; // Size of dots
    this.speedX = Math.random() * 1.5 - 0.75; // Speed
    this.speedY = Math.random() * 1.5 - 0.75;
    this.color = "rgba(255, 102, 0, 0.6)"; // Orange color
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 9000; // Density
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    // Connect particles with lines if close
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
  // --- 6. Live Feedback Modal Logic ---

const feedbackBtn = document.getElementById('feedback-trigger');
const modal = document.getElementById('feedback-modal');
const closeModal = document.querySelector('.close-modal');
const feedbackForm = document.getElementById('feedback-form');

// Open Modal
feedbackBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Close Modal (X button)
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close Modal (Click outside content)
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle Form Submission (Simulation)
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate sending data...
    const submitBtn = feedbackForm.querySelector('button');
    const originalText = submitBtn.innerText;
    
    submitBtn.innerText = "Sending...";
    submitBtn.style.opacity = "0.7";
    
    setTimeout(() => {
        alert("Thank you! We have received your feedback.");
        feedbackForm.reset();
        modal.style.display = 'none';
        submitBtn.innerText = originalText;
        submitBtn.style.opacity = "1";
    }, 1500);
});  

      // --- 7. Welcome Preloader Logic ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Minimal time to show animation (2 seconds)
    setTimeout(() => {
        preloader.classList.add('hide-loader');
        
        // Allow scrolling again (optional if you hid overflow)
        document.body.style.overflow = 'visible';
    }, 2000); 
});

initParticles();
animateParticles();