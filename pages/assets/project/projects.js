
// Dynamically load and render projects from projects.json using DOM methods (reliable like index.js)
document.addEventListener('DOMContentLoaded', function () {
    console.log('[projects.js] DOMContentLoaded fired');
        fetch('assets/project/projects.json')
            .then(response => response.json())
            .then(projects => {
                console.log('[projects.js] Projects loaded:', projects);

                // Separate showcase and regular projects
                const showcaseProjects = projects.filter(p => p['showcase-title']);
                const regularProjects = projects.filter(p => p['title']);

                // Render showcase projects
                const showcaseContainer = document.getElementById('showcase-projects-container');
                if (showcaseContainer) {
                    showcaseContainer.innerHTML = '';
                    showcaseProjects.forEach(project => {
                        // Desktop
                        const box = document.createElement('div');
                        box.className = 'box hide-on-med-and-down';
                        box.innerHTML = `
                            <div class="row">
                                <div class="col s7">
                                    <p class="title">${project['showcase-title']}</p>
                                    <p class="main-text">${project['showcase-mainDescription']}</p>
                                    <p class="main-text">Status: ${project['showcase-status']}</p>
                                    <p class="tech-stack">Tech Stack: ${project['showcase-techStack'] ? project['showcase-techStack'].join(', ') : ''}</p>
                                    <button class="project-button"><a href="${project['showcase-link']}" target="_blank">View Project</a></button>
                                </div>
                                <div class="col s5">
                                    <img src="${project['showcase-image']}" alt="Screenshot of ${project['showcase-title']}" class="project-screenshot">
                                </div>
                            </div>
                        `;
                        showcaseContainer.appendChild(box);
                        box.style.opacity = "1";
                        box.style.transform = "none";
                        box.style.transition = "none";

                        // Mobile
                        const boxMobile = document.createElement('div');
                        boxMobile.className = 'box hide-on-large-only';
                        boxMobile.innerHTML = `
                            <div class="row">
                                <div class="col s12">
                                    <p class="title">${project['showcase-title']}</p>
                                    <p class="main-text">${project['showcase-mainDescription']}</p>
                                    <p class="main-text">Status: ${project['showcase-status']}</p>
                                    <p class="tech-stack">Tech Stack: ${project['showcase-techStack'] ? project['showcase-techStack'].join(', ') : ''}</p>
                                    <button class="project-button"><a href="${project['showcase-link']}" target="_blank">View Project</a></button>
                                </div>
                            </div>
                        `;
                        showcaseContainer.appendChild(boxMobile);
                        boxMobile.style.opacity = "1";
                        boxMobile.style.transform = "none";
                        boxMobile.style.transition = "none";
                    });
                }

                // Group regular projects by year
                const years = ['2026', '2025'];
                years.forEach(year => {
                    const container = document.getElementById(`all-projects-container-${year}`);
                    if (container) {
                        container.innerHTML = '';
                        regularProjects.filter(p => p.year === year).forEach(project => {
                            const box = document.createElement('div');
                            box.className = 'box';
                            box.innerHTML = `
                                <div class="row">
                                    <div class="col s12">
                                        <p class="title">${project.title}</p>
                                        <p class="main-text">${project.mainDescription}</p>
                                        <p class="main-text">Status: ${project.status}</p>
                                        <p class="tech-stack">Tech Stack: ${project.techStack ? project.techStack.join(', ') : ''}</p>
                                        <button class="project-button"><a href="${project.link}" target="_blank">View Project</a></button>
                                    </div>
                                </div>
                            `;
                            container.appendChild(box);
                            box.style.opacity = "1";
                            box.style.transform = "none";
                            box.style.transition = "none";
                        });
                    }
                });
            })
            .catch(error => console.error('Error fetching projects data:', error));
});

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





// GSAP animation for Contact section (primary white text / subtitles)

if (typeof ScrollTrigger !== 'undefined' && !isMobileViewport()) {
    gsap.from("#contact-me-section", {
        scrollTrigger: {
            trigger: "#contact-me-section",
            start: "top 60%",
        },
        y: 18,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out"
    });
} else {
    // Ensure contact-me texts are visible on mobile or when ScrollTrigger isn't available
    document.querySelectorAll('#contact-me-section .section-title, #contact-me-section .subtitle, #contact-me-section .primary-text').forEach(el => {
        el.style.opacity = '';
        el.style.transform = '';
    });
}
