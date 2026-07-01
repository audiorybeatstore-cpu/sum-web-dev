/*==================================================
SUM WEB DEV
SERVICES PAGE
services.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================
    ELEMENTS
    =========================*/

    const body = document.body;

    const header = document.querySelector(".main-header");

    const themeToggle = document.getElementById("themeToggle");

    const mobileMenu = document.getElementById("mobileMenu");

    const navLinks = document.getElementById("navLinks");

    const backToTop = document.getElementById("backToTop");

    const scrollProgress = document.getElementById("scrollProgress");

    const loader = document.getElementById("loader");

    const faqItems = document.querySelectorAll(".faq-item");

    const counters = document.querySelectorAll(".counter");

    const navItems = document.querySelectorAll(".nav-links a");

    /*=========================
    PAGE LOADER
    =========================*/

    window.addEventListener("load", () => {

        if(loader){

            setTimeout(() => {

                loader.classList.add("hide");

            },600);

        }

    });

    /*=========================
    THEME TOGGLE
    =========================*/

    if(themeToggle){

        const icon = themeToggle.querySelector("i");

        const savedTheme = localStorage.getItem("theme");

        if(savedTheme === "light"){

            body.classList.add("light-theme");

            icon.classList.remove("fa-moon");

            icon.classList.add("fa-sun");

        }

        themeToggle.addEventListener("click",()=>{

            body.classList.toggle("light-theme");

            if(body.classList.contains("light-theme")){

                localStorage.setItem("theme","light");

                icon.classList.remove("fa-moon");

                icon.classList.add("fa-sun");

            }else{

                localStorage.setItem("theme","dark");

                icon.classList.remove("fa-sun");

                icon.classList.add("fa-moon");

            }

        });

    }

    /*=========================
    MOBILE MENU
    =========================*/

    if(mobileMenu){

        mobileMenu.addEventListener("click",()=>{

            navLinks.classList.toggle("active");

            mobileMenu.classList.toggle("open");

            const icon = mobileMenu.querySelector("i");

            if(navLinks.classList.contains("active")){

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            }else{

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    }

    navItems.forEach(link=>{

        link.addEventListener("click",()=>{

            if(window.innerWidth <= 768){

                navLinks.classList.remove("active");

                const icon = mobileMenu.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    });

    /*=========================
    SCROLL EVENTS
    =========================*/

    window.addEventListener("scroll",()=>{

        const scrollTop = document.documentElement.scrollTop;

        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const progress = (scrollTop / scrollHeight) * 100;

        if(scrollProgress){

            scrollProgress.style.width = progress + "%";

        }

        if(scrollTop > 100){

            header.style.background = "rgba(11,15,25,.97)";

            header.style.boxShadow = "0 10px 25px rgba(0,0,0,.25)";

        }else{

            header.style.background = "rgba(11,15,25,.90)";

            header.style.boxShadow = "none";

        }

        if(backToTop){

            if(scrollTop > 600){

                backToTop.classList.add("show");

            }else{

                backToTop.classList.remove("show");

            }

        }

    });

    /*=========================
    BACK TO TOP
    =========================*/

    if(backToTop){

        backToTop.addEventListener("click",()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    }

});

/*=========================
COUNTER ANIMATION
=========================*/

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        const speed = 200;

        const updateCounter = () => {

            const current = +counter.innerText;

            const increment = Math.ceil(target / speed);

            if (current < target) {

                counter.innerText = current + increment;

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/*=========================
FAQ ACCORDION
=========================*/

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

                faq.querySelector(".faq-answer").style.maxHeight = null;

            }

        });

        item.classList.toggle("active");

        if (item.classList.contains("active")) {

            answer.style.maxHeight = answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});

/*=========================
SCROLL REVEAL
=========================*/

const revealElements = document.querySelectorAll(

".service-card,.why-card,.process-card,.price-card,.tech-box,.testimonial-card,.faq-item,.stat-card"

);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

revealElements.forEach(el => {

    el.classList.add("hidden");

    revealObserver.observe(el);

});

/*=========================
SMOOTH SCROLL
=========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});

/*=========================
ACTIVE NAVIGATION
=========================*/

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*=========================
CARD HOVER EFFECT
=========================*/

document.querySelectorAll(".service-card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.setProperty("--x", x + "px");

        card.style.setProperty("--y", y + "px");

    });

});

/*=========================
CURRENT YEAR
=========================*/

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

console.log("✅ Services page loaded successfully.");

});
