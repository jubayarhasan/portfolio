// Typing Effect configuration
const typingElement = document.getElementById("typing-text");
const phrases = [
    "Full Stack Developer",
    "Backend Engineer",
    "Frontend Enthusiast",
    "Scalable REST APIs Builder",
    "Problem Solver"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 1600; // pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // pause before next word
    }

    setTimeout(type, typeSpeed);
}

// About section Tab switcher
function switchTab(tabName) {
    const tabs = ['skills', 'experience', 'education'];
    tabs.forEach(tab => {
        const btn = document.getElementById(`tab-btn-${tab}`);
        const panel = document.getElementById(`tab-${tab}`);
        
        if (tab === tabName) {
            btn.classList.add('active');
            panel.classList.remove('hidden');
        } else {
            btn.classList.remove('active');
            panel.classList.add('hidden');
        }
    });
}

// Project filter function
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');

    cards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Mobile drawer menu interactions
const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuBackdrop = document.getElementById('menu-backdrop');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openDrawer() {
    mobileMenu.classList.add('open');
    menuBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    mobileMenu.classList.remove('open');
    menuBackdrop.classList.remove('open');
    document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openDrawer);
closeMenuBtn.addEventListener('click', closeDrawer);
menuBackdrop.addEventListener('click', closeDrawer);
mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

// Toast feedback trigger
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    toastMsg.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// Back to top button scroll listener & Navbar background
const backToTop = document.getElementById('back-to-top');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize typing loop on load
window.onload = function() {
    type();
};

// Contact Form Submission & Google Sheet Sync
const scriptURL = 'https://script.google.com/macros/s/AKfycbx4w00TS4hw86jB3MOQY5LM1luDnCc3gmOEsbXH1jhLMFkedCUyRWssW9RG5J01HO1WSg/exec';
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm.querySelector('.btn-submit');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    submitBtn.disabled = true;

    const senderName = document.getElementById('sender-name').value;
    const formData = new FormData(contactForm);

    fetch(scriptURL, { 
        method: 'POST', 
        body: formData,
        mode: 'no-cors'
    })
    .then(() => {
        showToast(`Thank you, ${senderName}! Your message has been received.`);
        contactForm.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        showToast('Submission failed. Please try again!');
    })
    .finally(() => {
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
    });
});