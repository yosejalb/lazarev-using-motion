function locomotiveAnimation() {
  // Register the ScrollTrigger plugin for GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Initialize LocomotiveScroll for smooth scrolling
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    tablet: { smooth: true }, // Enable smooth scrolling on tablets
    smartphone: { smooth: true }, // Enable smooth scrolling on smartphones
  });
  locoScroll.on("scroll", ScrollTrigger.update); // Update ScrollTrigger on scroll

  // Set up ScrollTrigger to work with LocomotiveScroll
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0) // Scroll to a specific value
        : locoScroll.scroll.instance.scroll.y; // Get current scroll position
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  // Refresh ScrollTrigger on refresh event
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh(); // Initial refresh
}

function loadingAnimation() {
  // Create a timeline for loading animations
  var tl = gsap.timeline();
  tl.from("#page1", {
    opacity: 0,
    duration: 0.2,
    delay: 0.2, // Delay before starting the animation
  });
  tl.from("#page1", {
    transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
    borderRadius: "150px",
    duration: 2,
    ease: "expo.out", // Easing function for smooth animation
  });
  tl.from("nav", {
    opacity: 0,
    delay: -0.2, // Animate nav opacity with a slight delay
  });
  tl.from("#page1 h1, #page1 p, #page1 div", {
    opacity: 0,
    duration: 0.5,
    stagger: 0.2, // Stagger the appearance of elements
  });
}

function navAnimation() {
  // Select the navigation element
  var nav = document.querySelector("nav");

  // Add mouseenter event to expand nav
  nav.addEventListener("mouseenter", function () {
    let tl = gsap.timeline();
    tl.to("#nav-bottom", {
      height: "21vh",
      duration: 0.5, // Duration for expanding nav
    });
    tl.to(".nav-part2 h5", {
      display: "block",
      duration: 0.1, // Show nav part 2
    });
    tl.to(".nav-part2 h5 span", {
      y: 0,
      stagger: {
        amount: 0.5, // Stagger the appearance of spans
      },
    });
  });

  // Add mouseleave event to collapse nav
  nav.addEventListener("mouseleave", function () {
    let tl = gsap.timeline();
    tl.to(".nav-part2 h5 span", {
      y: 25,
      stagger: {
        amount: 0.2, // Stagger the disappearance of spans
      },
    });
    tl.to(".nav-part2 h5", {
      display: "none",
      duration: 0.1, // Hide nav part 2
    });
    tl.to("#nav-bottom", {
      height: 0,
      duration: 0.2, // Duration for collapsing nav
    });
  });
}

function page2Animation() {
  // Select all elements with the class 'right-elem'
  var rightElems = document.querySelectorAll(".right-elem");

  rightElems.forEach(function (elem) {
    // Add mouseenter event to show child element
    elem.addEventListener("mouseenter", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 1,
        scale: 1, // Scale up the child element
      });
    });
    // Add mouseleave event to hide child element
    elem.addEventListener("mouseleave", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 0,
        scale: 0, // Scale down the child element
      });
    });
    // Add mousemove event to move child element
    elem.addEventListener("mousemove", function (dets) {
      gsap.to(elem.childNodes[3], {
        x: dets.x - elem.getBoundingClientRect().x - 90,
        y: dets.y - elem.getBoundingClientRect().y - 215, // Position child element based on mouse movement
      });
    });
  });
}

function page3VideoAnimation() {
  // Select elements for video animation
  var page3Center = document.querySelector(".page3-center");
  var video = document.querySelector("#page3 video");

  // Add click event to play video
  page3Center.addEventListener("click", function () {
    video.play();
    gsap.to(video, {
      transform: "scaleX(1) scaleY(1)",
      opacity: 1,
      borderRadius: 0, // Reset border radius
    });
  });
  // Add click event on video to pause it
  video.addEventListener("click", function () {
    video.pause();
    gsap.to(video, {
      transform: "scaleX(0.7) scaleY(0)",
      opacity: 0,
      borderRadius: "30px", // Change border radius on pause
    });
  });

  // Select all sections with the class 'sec-right'
  var sections = document.querySelectorAll(".sec-right");

  sections.forEach(function (elem) {
    // Add mouseenter event to play video on hover
    elem.addEventListener("mouseenter", function () {
      elem.childNodes[3].style.opacity = 1;
      elem.childNodes[3].play(); // Play video on hover
    });
    // Add mouseleave event to hide video
    elem.addEventListener("mouseleave", function () {
      elem.childNodes[3].style.opacity = 0;
      elem.childNodes[3].load(); // Load video on mouse leave
    });
  });
}

function page6Animations() {
  // Animate elements in page 6 based on scroll position
  gsap.from("#btm6-part2 h4", {
    x: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#btm6-part2",
      scroller: "#main",
      start: "top 80%", // Start animation when top of element is 80% from the top
      end: "top 10%", // End animation when top of element is 10% from the top
      scrub: true, // Smoothly animate based on scroll
    },
  });
}

// Initialize animations
locomotiveAnimation();
navAnimation();
page2Animation();
page3VideoAnimation();
page6Animations();
loadingAnimation();
