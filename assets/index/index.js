
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
    tl.to(titles, {duration: 0.6, autoAlpha: 1, y: 0, stagger: 0.08});

    // scramble-reveal each title, overlapping slightly with the entrance
    titles.forEach((el, i) => {
        tl.to(el, {
            duration: 1.2,
            scrambleText: {
                text: originalTexts[i],
                speed: 0.6,
                chars: 'upperCase'
            }
        }, '-=0.6');
    });
});

// GSAP animation for about section highlighted text
gsap.registerPlugin(ScrollTrigger);

gsap.from(".primary-highlighted-text", {
scrollTrigger: {
    trigger: ".about-section",
    start: "40%", // when 40% of the section is in view
},
y: 20,
opacity: 0,
duration: 0.8,
stagger: 0.2, // delay between each highlight
ease: "power2.out"
});
