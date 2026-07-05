 /* ==========================================
   PREMIUM LANDING PAGE
   script.js - Part 1
   ========================================== */

/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuBtn.classList.toggle("active");

    });

    // Close menu when a nav link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuBtn.classList.remove("active");

        });

    });

}

/* ==========================================
   THEME TOGGLE
========================================== */

const themeBtn = document.getElementById("theme-toggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {

    document.body.classList.add(savedTheme);

} else {

    document.body.classList.add("dark");

}

if (themeBtn) {

    updateThemeIcon();

    themeBtn.addEventListener("click", () => {

        if (document.body.classList.contains("dark")) {

            document.body.classList.remove("dark");
            document.body.classList.add("light");

            localStorage.setItem("theme", "light");

        } else {

            document.body.classList.remove("light");
            document.body.classList.add("dark");

            localStorage.setItem("theme", "dark");

        }

        updateThemeIcon();

    });

}

function updateThemeIcon() {

    if (!themeBtn) return;

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

    } else {

        themeBtn.textContent = "🌙";

    }

}

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (pageYOffset >= top) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < trigger) {

            el.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/* ==========================================
   NAVBAR BACKGROUND
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.background = "rgba(10,10,20,.9)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.25)";

    } else {

        header.style.background = "rgba(10,10,20,.55)";
        header.style.boxShadow = "none";

    }

});
/* ==========================================
   PREMIUM LANDING PAGE
   script.js - Part 2
========================================== */

/* ==========================================
        ANIMATED COUNTERS
========================================== */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats");

    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = +counter.dataset.target;

            let count = 0;

            const increment = target / 100;

            const updateCounter = () => {

                count += increment;

                if (count < target) {

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target;

                }

            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

/* ==========================================
        TESTIMONIAL SLIDER
========================================== */

const testimonials = document.querySelectorAll(".testimonial");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

let currentSlide = 0;

function showSlide(index){

    testimonials.forEach(slide=>{

        slide.classList.remove("active");

    });

    testimonials[index].classList.add("active");

}

if(nextBtn && prevBtn && testimonials.length){

    nextBtn.addEventListener("click",()=>{

        currentSlide++;

        if(currentSlide>=testimonials.length){

            currentSlide=0;

        }

        showSlide(currentSlide);

    });

    prevBtn.addEventListener("click",()=>{

        currentSlide--;

        if(currentSlide<0){

            currentSlide=testimonials.length-1;

        }

        showSlide(currentSlide);

    });

    // Auto Slide

    setInterval(()=>{

        currentSlide++;

        if(currentSlide>=testimonials.length){

            currentSlide=0;

        }

        showSlide(currentSlide);

    },5000);

}

/* ==========================================
        FAQ ACCORDION
========================================== */

const faqItems=document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const question=item.querySelector(".faq-question");

    question.addEventListener("click",()=>{

        faqItems.forEach(faq=>{

            if(faq!==item){

                faq.classList.remove("active");

                faq.querySelector(".faq-answer").style.maxHeight=null;

            }

        });

        item.classList.toggle("active");

        const answer=item.querySelector(".faq-answer");

        if(item.classList.contains("active")){

            answer.style.maxHeight=answer.scrollHeight+"px";

        }else{

            answer.style.maxHeight=null;

        }

    });

});
/* ==========================================
   PREMIUM LANDING PAGE
   script.js - Part 3
========================================== */

/* ==========================================
        CONTACT FORM VALIDATION
========================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("🎉 Message sent successfully!");

        contactForm.reset();

    });

}

/* ==========================================
        BACK TO TOP BUTTON
========================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================
        HERO BUTTON EFFECT
========================================== */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-5px) scale(1.03)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});

/* ==========================================
        IMAGE PARALLAX
========================================== */

const heroImage = document.querySelector(".hero-image");

window.addEventListener("mousemove", (e) => {

    if (!heroImage) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImage.style.transform =
        `translate(${x}px, ${y}px)`;

});

/* ==========================================
        ACTIVE YEAR (Optional)
========================================== */

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

/* ==========================================
        PRELOADER (Optional)
========================================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.remove();

        }, 500);

    }

});

/* ==========================================
        PERFORMANCE
========================================== */

// Smooth scrolling for browsers that support it
document.documentElement.style.scrollBehavior = "smooth";

/* ==========================================
        INITIALIZE
========================================== */

console.log("🚀 Premium Business Landing Page Loaded Successfully!");