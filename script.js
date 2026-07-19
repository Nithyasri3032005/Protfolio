// ===============================
// MOBILE MENU
// ===============================

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    navbar.classList.toggle("active");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-xmark");
};

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("fa-xmark");
    });
});

// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ===============================
// HEADER SCROLL EFFECT
// ===============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ===============================
// TYPING ANIMATION
// ===============================

const roles = [
    "React Native Developer",
    "JavaScript Developer",
    "Mobile App Developer",
    "Frontend Developer"
];

const typingText = document.getElementById("typing-text");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingText.textContent = currentRole.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingText.textContent = currentRole.substring(0, charIndex);
        charIndex--;

        if (charIndex < 0) {
            deleting = false;
            roleIndex++;
            if (roleIndex === roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

// ===============================
// VISITOR TOAST NOTIFICATION
// ===============================

function showVisitorToast() {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-msg");

    const messages = [
        "Someone is viewing your portfolio!",
        "You have a visitor! Welcome!",
        "Someone stopped by to check your work!",
        "New visitor detected! Thanks for visiting!"
    ];

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    toastMsg.textContent = randomMsg;

    toast.classList.add("show");

    // Also log to console
    console.log("%c🔔 PORTFOLIO VIEWER ALERT", "color: #38bdf8; font-size: 20px; font-weight: bold;");
    console.log("%c" + randomMsg, "color: #818cf8; font-size: 14px;");
    console.log("%cTime: " + new Date().toLocaleString(), "color: #cbd5e1; font-size: 12px;");
    console.log("%cVisitor is browsing your portfolio!", "color: #22c55e; font-size: 12px;");

    // Send notification to your email via EmailJS
    sendVisitorNotification();

    setTimeout(() => {
        toast.classList.remove("show");
    }, 5000);
}

// Show toast after 1.5 seconds of page load
setTimeout(showVisitorToast, 1500);

// ===============================
// EMAILJS - VISITOR NOTIFICATION
// ===============================

// Initialize EmailJS with your public key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
emailjs.init("YOUR_PUBLIC_KEY");

function sendVisitorNotification() {
    const templateParams = {
        to_name: "Nithya Sri",
        from_name: "Portfolio Visitor",
        message: "Someone is viewing your portfolio!",
        time: new Date().toLocaleString(),
        page_url: window.location.href
    };

    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual values
    emailjs.send("YOUR_SERVICE_ID", "visitor_template", templateParams)
        .then(() => {
            console.log("Visitor notification sent to email!");
        })
        .catch((err) => {
            console.log("EmailJS not configured yet. Set up your keys in script.js");
        });
}

// ===============================
// PROJECT FILTERS
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projectCards.forEach(card => {
            if (filter === "all" || card.getAttribute("data-category") === filter) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

// ===============================
// PROJECT MODALS
// ===============================

const viewButtons = document.querySelectorAll(".view-project");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".modal-close");

// Open modal
viewButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const projectId = btn.getAttribute("data-project");
        const modal = document.getElementById("modal-" + projectId);
        if (modal) {
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });
});

// Close modal on close button
closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".modal").classList.remove("active");
        document.body.style.overflow = "";
    });
});

// Close modal on background click
modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modals.forEach(modal => {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        });
    }
});

// ===============================
// CONTACT FORM - EmailJS
// ===============================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Replace with your actual EmailJS credentials
    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
            formStatus.className = "form-status success";
            contactForm.reset();

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            setTimeout(() => {
                formStatus.className = "form-status";
            }, 5000);
        })
        .catch((err) => {
            formStatus.textContent = "Failed to send message. Please try again or email me directly.";
            formStatus.className = "form-status error";

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            setTimeout(() => {
                formStatus.className = "form-status";
            }, 5000);
        });
});

// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(
    ".about, .skills, .projects, .education, .contact, " +
    ".skill-card, .project-card, .stat-card, .contact-card, .timeline-card"
);

function reveal() {
    const trigger = window.innerHeight - 100;

    revealElements.forEach(item => {
        const top = item.getBoundingClientRect().top;
        if (top < trigger) {
            item.classList.add("reveal", "active");
        }
    });
}

revealElements.forEach(item => {
    item.classList.add("reveal");
});

window.addEventListener("scroll", reveal);
reveal();

// ===============================
// SKILL BAR ANIMATION
// ===============================

function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            bar.style.width = bar.style.getPropertyValue("--progress");
        }
    });
}

window.addEventListener("scroll", animateSkillBars);
animateSkillBars();

// ===============================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    });
});

// ===============================
// PARALLAX EFFECT ON HOME
// ===============================

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const homeImage = document.querySelector(".home-image");
    if (homeImage && scrolled < 800) {
        homeImage.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// ===============================
// CURSOR GLOW EFFECT ON CARDS
// ===============================

document.querySelectorAll(".project-card, .skill-card, .stat-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", x + "px");
        card.style.setProperty("--mouse-y", y + "px");
        card.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(56,189,248,.06), var(--bg) 70%)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.background = "";
    });
});

// ===============================
// CONSOLE MESSAGES
// ===============================

console.log("%c🚀 Portfolio Loaded Successfully!", "color: #38bdf8; font-size: 18px; font-weight: bold;");
console.log("%cBuilt with HTML, CSS & JavaScript", "color: #818cf8; font-size: 12px;");
console.log("%cContact: nithyareactnativedev@gmail.com", "color: #cbd5e1; font-size: 12px;");
