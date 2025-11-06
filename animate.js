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
// process card reveal Animation
///////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const processSection = document.querySelector('.process');
  const processWrapper = document.querySelector('.processWrapper');
  const processCards = document.querySelectorAll('.processCard');
  const cardIcons = document.querySelectorAll('.cardIcon');
  const movingIcon = document.querySelector('.cardProcess');
  const cards = document.querySelectorAll('.card');

  // Center positions of each cardIcon
  function getIconCenters() {
    return Array.from(cardIcons).map(icon =>
      icon.offsetLeft + icon.offsetWidth / 2 - movingIcon.offsetWidth / 2
    );
  }

  let iconPositions = [];
  function updateIconPositions() {
    iconPositions = getIconCenters();
  }
  updateIconPositions();
  window.addEventListener('resize', updateIconPositions);

  function animateOnScroll() {
    const sectionRect = processSection.getBoundingClientRect();
    const sectionHeight = processSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    const cardsCount = processCards.length;

    // Calculate scroll progress (0 top, 1 bottom)
    let progress = Math.min(1, Math.max(0, -sectionRect.top / (sectionHeight - viewportHeight)));

    // Divide into segments per card
    const segment = 1 / cardsCount;
    const currentCard = Math.floor(progress / segment);
    // Animate blue icon horizontally
    const iconStep = Math.min(cardsCount - 1, currentCard);
    
    movingIcon.style.left = `${iconPositions[iconStep] - 316}px`;

    console.log("iconStep is" +iconStep);
    console.log("iconPositions are" + Math.floor(iconPositions[iconStep] - 316));

    // Fade in each card when its segment is reached
    cards.forEach((card, idx) => {
      if (idx <= iconStep) {
        card.classList.add('fade-in');
      } else {
        card.classList.remove('fade-in');
      }
    });
  }

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});

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
