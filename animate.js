gsap.registerPlugin(ScrollTrigger);
///////////////////////////////
// Header Scroll Behavior Script
///////////////////////////////




document.addEventListener("DOMContentLoaded", () => {
  // Hero section selectors based on your HTML
  const heroBg = document.querySelector(".heroBackground");
  const header = document.querySelector(".header");
  const typewriterMain = document.querySelector(".titleH1");
  const rightHeroImg = document.querySelector(".heroimg");
  const subtext = document.querySelector(".descriptionText");
  const statButton = document.querySelector(".satisfiedCustomer"); // Adjust if you want the full div

  // Initial states for animation
  gsap.set(heroBg, { opacity: 0 });
  gsap.set(header, { y: -60, opacity: 0 });
  gsap.set(typewriterMain, { opacity: 0 });
  gsap.set(rightHeroImg, { y: 80, opacity: 0 });
  gsap.set(subtext, { opacity: 0 });
  gsap.set(statButton, { opacity: 0 });

  // GSAP Timeline
  const tl = gsap.timeline();

  tl.to(heroBg, { opacity: 1, duration: 1 })
    .to(typewriterMain, { opacity: 1, duration: 0.5 }, "-=0.2") // fade in typewriter text
    .to(rightHeroImg, { y: 0, opacity: 1, duration: 0.8 }, "-=0.2") // reveal right image up
    .to(header, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4") // slide in header from top
    .add(() => {
        
      
    }, "+=0")
    .to(subtext, { opacity: 0.8, duration: 0.6 }, "-=0.4") // fade in subtext
    .to(statButton, { opacity: 1, duration: 0.6 }, "-=0.3") // fade in statistic button

  // The typewriter animation automatically starts via your logic
},100);

function revealSection(sectionSelector, firstElem, restSelector = null) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;
  const first = section.querySelector(firstElem);
  const rest = restSelector ? section.querySelectorAll(restSelector) : [];

  gsap.set([first, ...rest], { opacity: 0, y: 40 });

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 70%", // section top hits 70% of viewport
      toggleActions: "play none none none",
      once: true, // Only reveal once
    }
  })
  .to(first, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
  .to(rest, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.2,
    ease: "power2.out"
  }, "-=0.3")
  .fromTo('.advantagesCards',{
    x:600,
    opacity:0
  },
  {x:0,
    opacity:1
  });
}

// Example usage for key sections:

// Record Counters Section (Statistic cards)
revealSection(
  ".recordCounters", // Section parent
  ".sectionTitle", // Section title
  ".achievement" // All achievement/stat cards inside
);

// Advantages Cards Section
revealSection(
  ".advantages",
  ".sectionTitle",
  // ".advantagesCards" // All .card inside advantages
);

// Process Steps Section
revealSection(
  ".processSection",
  ".sectionTitle",
  ".stepCard" // All step cards inside process section
);

// Services Cards Section
revealSection(
  ".services",
  ".sectionTitle",
  ".serviceCard"
);

// Testimonials Section
revealSection(
  ".Testimonials",
  ".sectionTitle",
  ".Testimonial" // All testimonials
);

// FAQs Section
revealSection(
  ".faqs",
  ".sectionTitle",
  ".accordionitem"
);

// Contact CTA Section
revealSection(
  ".cta", // Section
  ".titleH2", // Main CTA Headline
  ".ctaBtn" // The main button
);

const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll <= 0) {
    // At the very top, show original header format
    header.classList.remove('sticky', 'hide');
  } else if (currentScroll > lastScrollY) {
    // Scrolling down — hide sticky header
    header.classList.remove('sticky');
    header.classList.add('hide');
  } else if (currentScroll < lastScrollY) {
    // Scrolling up — show sticky header
    header.classList.remove('hide');
    header.classList.add('sticky');
  }

  lastScrollY = currentScroll;
});


///////////////////////////////
// Counter Animation Script
///////////////////////////////
function animateSimpleCounter(el, duration = 6000) {
  const countSpan = el.querySelector('.count');
  const target = parseInt(countSpan.textContent, 10);
  let current = 0;
  let stepCount = Math.floor(duration / 5);
  let increment = target / stepCount;

  function step() {
    current += increment;
    if (current < target) {
      countSpan.textContent = Math.floor(current);
      requestAnimationFrame(step);
    } else {
      countSpan.textContent = target;
    }
  }
  countSpan.textContent = '0';
  step();
}

// Intersection Observer logic
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSimpleCounter(entry.target, 1500);
      obs.unobserve(entry.target); // animate only once per counter
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

///////////////////////////////
// advantages card slider
////////////////////////////////

// dynamic card image from the data-url attribute
document.querySelectorAll('.cardImage').forEach(el => {
  const url = el.getAttribute('data-url');
  if (url) {
    el.style.backgroundImage = `url('${url}')`;
  }
});

const cardTrack = document.querySelector('.card-track');
const cards = Array.from(cardTrack.children);
const cardCount = cards.length;
const cardWidth = 420 + 20; // width + margin-right
let position = 0;

// Clone cards for seamless infinite effect
cards.forEach(card => {
  cardTrack.appendChild(card.cloneNode(true)); // Append clones
});

function updateSlider() {
  cardTrack.style.transform = `translateX(${-position * cardWidth}px)`;
}

// Right arrow click
document.querySelector('.card-arrow.right').addEventListener('click', () => {
  position++;
  updateSlider();
  // Loop seamless!
  if (position === cardCount) {
    setTimeout(() => {
      // no transition for instant jump
      cardTrack.style.transition = 'none';
      position = 0;
      updateSlider();
      setTimeout(() => {
        cardTrack.style.transition = ''; // re-enable transition
      }, 20);
    }, 500);
  }
});

// Left arrow click
document.querySelector('.card-arrow.left').addEventListener('click', () => {
  if (position === 0) {
    // jump to cloned set, then animate left
    cardTrack.style.transition = 'none';
    position = cardCount;
    updateSlider();
    setTimeout(() => {
      cardTrack.style.transition = '';
      position--;
      updateSlider();
    }, 20);
  } else {
    position--;
    updateSlider();
  }
});

updateSlider();



///////////////////////////////
// Testimonial card slider
////////////////////////////////

document.querySelectorAll('.TestimonialImage').forEach(el => {
  const url = el.getAttribute('data-url');
  if (url) {
    el.style.backgroundImage = `url('${url}')`;
  }
});

const TestimonialTrack = document.querySelector('.Testimonialtrack');
const Testimonial = Array.from(TestimonialTrack.children);
const TestimonialCount = Testimonial.length;
const Testimonialidth = 520 + 20; // width + margin-right
let positionTestimonial = 0;

// Clone cards for seamless infinite effect
Testimonial.forEach(Testimonial => {
  TestimonialTrack.appendChild(Testimonial.cloneNode(true)); // Append clones
});

function updateTestimonialSlider() {
  TestimonialTrack.style.transform = `translateX(${-positionTestimonial * Testimonialidth}px)`;
}

// Right arrow click
document.querySelector('.Testimonial-arrow.right').addEventListener('click', () => {
  positionTestimonial++;
  updateTestimonialSlider();
  // Loop seamless!
  if (positionTestimonial === TestimonialCount) {
    setTimeout(() => {
      // no transition for instant jump
      TestimonialTrack.style.transition = 'none';
      positionTestimonial = 0;
      updateTestimonialSlider();
      setTimeout(() => {
        TestimonialTrack.style.transition = ''; // re-enable transition
      }, 20);
    }, 500);
  }
});

// Left arrow click
document.querySelector('.Testimonial-arrow.left').addEventListener('click', () => {
  if (positionTestimonial === 0) {
    // jump to cloned set, then animate left
    TestimonialTrack.style.transition = 'none';
    positionTestimonial = TestimonialCount;
    updateTestimonialSlider();
    setTimeout(() => {
      TestimonialTrack.style.transition = '';
      positionTestimonial--;
      updateTestimonialSlider();
    }, 20);
  } else {
    positionTestimonial--;
    updateTestimonialSlider();
  }
});

updateTestimonialSlider();







document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.processSection');
  const stepsRow = document.querySelector('.stepCards');
  const stepImage = document.querySelector('.sixthStep');
  const cards = gsap.utils.toArray('.stepCard');
  const baseScroll = stepsRow.scrollWidth - window.innerWidth;
  const extraScroll = window.innerHeight; // 1 extra screen's worth
  
  function getScrollDistance() {
    const containerWidth = document.querySelector('.steps').offsetWidth;
    const lastCard = cards[cards.length-1];
    const centerOfContainer = containerWidth / 2;
    const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
    return lastCardCenter - centerOfContainer;
  }

  // Pin & animate cards scroll horizontally
  gsap.to(stepsRow, {
    x: () => -getScrollDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: wrapper,
      pin: true,
      scrub: 1,
      start: "top top",
      end: "+=" + (stepsRow.scrollWidth - window.innerWidth + extraScroll),
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: false,
      id: 'hScroll',
    }
  });

  const stepsLine = document.querySelector('.stepsLine');
    
  gsap.fromTo(
    stepsLine,
    { width: 0 },
    {
      width: 'calc(100% - 810px)',
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        scrub: 1,
        start: 'top top',
        end: "+=" + (stepsRow.scrollWidth - window.innerWidth + extraScroll),
        invalidateOnRefresh: true,
        markers: false,
      }
    }
  )


    

  // Optionally: Animate card highlight when centered
  cards.forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      containerAnimation: ScrollTrigger.getById('hScroll'),
      start: "center center",
      onEnter: () => card.classList.add('active'),
      onLeaveBack: () => card.classList.remove('active'),
    });
  });
});

//Faq accordian

document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach((item, idx) => {
    const header = item.querySelector('.accordion__header');
    header.addEventListener('click', () => {
      // Only one open at a time
      if (!item.classList.contains('accordion__item--open')) {
        accordionItems.forEach((other, i) => {
          if (i !== idx && other.classList.contains('accordion__item--open')) {
            other.classList.remove('accordion__item--open');
          }
        });
        item.classList.add('accordion__item--open');
      } else {
        // Closing transition
        item.classList.remove('accordion__item--open');
        // Ensure at least one stays open (optional)
        const anyOpen = Array.from(accordionItems).some(el => el.classList.contains('accordion__item--open'));
        if (!anyOpen) item.classList.add('accordion__item--open');
      }
    });
  });

  const faqImg = document.querySelector('.faqContainer .cardImage');
  const wrapper = document.querySelector('.faqWrapper');
  
  gsap.to(faqImg, {
    backgroundPosition: '100% 50%',
    ease: "none",
    scrollTrigger: {
      trigger: wrapper,
      pin: false,
      scrub: 1,
      start: "top bottom",
      end: "bottom top",
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: false,
      id: 'Scroll',
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});


// Mobile menu 

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.hamburger');
  const nav = document.getElementById('mobileNav');
  const backdrop = nav.querySelector('.mobile-nav__backdrop');

  function closeMenu() {
    burger.classList.remove('is-active');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', e => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('is-active', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when clicking backdrop or any nav link
  backdrop.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', closeMenu)
  );
});





document.addEventListener("DOMContentLoaded", () => {
          const mainText = "Get a Legal Advice from a Trusted Lawyer with education and skill in ";
          const mainSelector = ".typewriter-main";
          const countries = [
            "America", "Australia", "United Kingdom", "India"
          ];
          const countrySelector = "#typeCountries";
          const typeSpeed = 0.06;
          const eraseSpeed = 0.045;
          const delayAfterType = 1;
          const mainDelay = 0.6;
          const cursorClass = "typewriter-cursor";

          function typeText(el, txt, cb, opts = {}) {
            el.classList.add(cursorClass);
            el.textContent = "";
            txt.split("").forEach((char, idx) => {
              gsap.delayedCall((opts.delay || 0) + idx * (opts.speed || typeSpeed), () => {
                el.textContent += char;
                if (idx === txt.length - 1) {
                  // Remove cursor after main text animation completes
                  el.classList.remove(cursorClass);
                  if (cb) gsap.delayedCall(opts.endDelay || delayAfterType, cb);
                }
              });
            });
          }

          function typeCountry(el, txt, cb, opts = {}) {
            el.classList.add(cursorClass);
            el.textContent = "";
            txt.split("").forEach((char, idx) => {
              gsap.delayedCall((opts.delay || 0) + idx * (opts.speed || typeSpeed), () => {
                el.textContent += char;
                if (idx === txt.length - 1 && cb) gsap.delayedCall(opts.endDelay || delayAfterType, cb);
              });
            });
          }
          function eraseText(el, cb, speed = eraseSpeed) {
            const txt = el.textContent;
            txt.split("").forEach((char, idx) => {
              gsap.delayedCall(idx * speed, () => {
                el.textContent = txt.slice(0, txt.length - idx - 1);
                if (idx === txt.length - 1 && cb) cb();
              });
            });
          }

          function animateCountriesLoop(list, idx = 0) {
            const countryEl = document.querySelector(countrySelector);
            typeCountry(countryEl, list[idx], () => {
              eraseText(countryEl, () => {
                animateCountriesLoop(list, (idx + 1) % list.length);
              });
            }, { speed: 0.2 });
          }

          document.querySelector(mainSelector).textContent = "";
          document.querySelector(countrySelector).textContent = "";

          // Main typewriter, then start country loop (which uses its own cursor)
          typeText(
            document.querySelector(mainSelector),
            mainText,
            () => animateCountriesLoop(countries),
            { delay: mainDelay, speed: typeSpeed, endDelay: 0.6 }
          );
        });








