
//Preloader functionality
window.addEventListener("load", function () {
    var preloader = document.querySelector(".preloader-wrapper");
    if (preloader) {
        preloader.style.display = "none";
        triggerPreloaderTransition();
    }


}   );

//Trigger preloader to fade in nad up when pressed
function triggerPreloaderTransition() {
    var preloader = document.querySelector(".preloader-wrapper");
    if (preloader) {
        preloader.style.display = "flex";
        setTimeout(function () {
            preloader.style.display = "none";
        }, 1000); // Adjust the duration as needed


    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {   // Initialize sidenav
    var options = {
    edge: 'left',
    };
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });



// Select the custom cursor dot element
const cursorDot = document.querySelector(".cursor-dot");
const cursorDotWhite= document.querySelector(".cursor-dot-white");

// Add a mousemove event listener to the document
document.addEventListener("mousemove", (e) => {
    // Update the dot's position to follow the cursor
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";


});

// Hide cursor on link hover
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a, button'); // Select all anchor elements

    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('hide-cursor'); // Add the class on mouse enter
        });

        link.addEventListener('mouseleave', function() {
            this.classList.remove('hide-cursor'); // Remove the class on mouse leave
        });
    });
});

document.body.style.cursor = 'none';
document.body.classList.add('hide-cursor');

// Register GSAP plugins used in this file (ScrambleTextPlugin is included in the HTML before this script)
if (window.gsap) {
    if (window.ScrambleTextPlugin || window.ScrollTrigger) {
        gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);
    }
}


// GSAP animation for the main title (slide-in + scramble reveal)
document.addEventListener('DOMContentLoaded', function() {
    const titleFirst = document.getElementById('main-title-first');
    const titleLast = document.getElementById('main-title-last');
    const titles = [titleFirst, titleLast].filter(Boolean);

    if (!titles.length) return; // nothing to animate

    // capture original text then clear to allow ScrambleText reveal
    const originalTexts = titles.map(el => el.textContent.trim());
    titles.forEach(el => el.textContent = '');

    gsap.set(titles, {autoAlpha: 0, y: 40});
    const tl = gsap.timeline({defaults: {ease: 'power3.out'}});

    // slide-up & fade in with a small stagger
    tl.to(titles,  {duration: 0.6, 
                    delay: 1, // wait a bit before starting
                    speed: 0.6, 
                    autoAlpha: 1, 
                    y: 0, 
                    stagger: 0.08});

    // scramble-reveal each title, overlapping slightly with the entrance
    titles.forEach((el, i) => {
        tl.to(el, {
            duration: 1.2,
            scrambleText: {
                text: originalTexts[i],
                chars: 'lowerCase',
            }
        }, '-=0.6');
    });
});

// GSAP animation for about section highlighted text
if (typeof ScrollTrigger !== 'undefined') {
    gsap.from(".primary-highlighted-text", {
        scrollTrigger: {
            trigger: "#about-me-section",
            start: "top 40%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // delay between each highlight
        ease: "power2.out"
    });
} else {
    console.warn('ScrollTrigger not available — skipping primary-highlighted-text scroll animation');
}

// Initialize AOS (Animate On Scroll) library
AOS.init();

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/CalebGabrielRamdathResume.pdf';
    link.download = 'CalebGabrielRamdathResume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// Guard the work/education animation in case ScrollTrigger isn't loaded
if (typeof ScrollTrigger !== 'undefined') {
    gsap.from(".work-education-text", {
        scrollTrigger: {
            trigger: "#work-education",
            start: "top 40%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
} else {
    console.warn('ScrollTrigger not available — skipping work-education-text scroll animation');
}


// Read social proof from JSON and populate the testimonial section
document.addEventListener('DOMContentLoaded', function() {
    const testimonialContainer = document.querySelector('.social-proof-cards-container');
    const radios = document.querySelectorAll('.testimonal-select-field input[type="radio"]');

    let testimonials = [];

    // Load JSON data
    fetch('assets/index/socialproof.json')
        .then(response => response.json())
        .then(data => {
            testimonials = Object.keys(data)
                .sort((a, b) => Number(a) - Number(b))
                .map(k => data[k]);
            displayTestimonial(0);
        })
        .catch(error => console.error('Error fetching social proof:', error));


    // Function to display a specific testimonial (0-based index)
    function displayTestimonial(index) {
        if (!testimonials[index]) return;
        const t = testimonials[index];
        if (!testimonialContainer) return;

        testimonialContainer.innerHTML = `
            <div class="social-proof-card">
                <p class="social-proof-quote p1">${t.p1 || ''}</p>
                <div class="gap-2rem"></div>
                <p class="social-proof-quote p2">${t.p2 || ''}</p>
                <div class="gap-2rem"></div>
                <p class="social-proof-author">${t.author || ''}</p>
                <p class="social-proof-autor-credits">${t.position || ''}</p>
            </div>
        `;
    }

    // Listen for radio changes (radio values are 1-based in the markup)
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const index = parseInt(radio.value, 10) - 1; // convert to 0-based
            displayTestimonial(index);
        });
    });
});
