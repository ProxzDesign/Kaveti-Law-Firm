gsap.registerPlugin(ScrollTrigger);
///////////////////////////////
// Header Scroll Behavior Script
///////////////////////////////

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
      width: 'calc(100% - 360px)',
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
  );
    

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
      markers: true,
      id: 'Scroll',
    }
  });
});

