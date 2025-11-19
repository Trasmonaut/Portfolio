
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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animate each right-side box as it scrolls into view
gsap.utils.toArray(".right-content .box").forEach((box) => {
    gsap.fromTo(
    box,
    { y: 60, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: box,
            start: "top 85%",
            end: "top 40%",
            scrub: true,
        }
    }
    );
});

// Ensure the full split section responds properly to scroll
ScrollTrigger.create({
    trigger: ".split-scroll",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
});


// Initialize AOS (Animate On Scroll) library
AOS.init(); 