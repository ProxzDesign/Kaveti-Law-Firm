gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
    // GSAP Timeline
  const tl = gsap.timeline();
  gsap.set(header, { y: -60, opacity: 0 });
  tl.to(header, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
});

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


//Service Tabs
const tabList = document.querySelectorAll('#tabList li');
const tabPanes = document.querySelectorAll('.tab-pane');
const serviceTabs = document.querySelector('.services-tabs');
const serviceContent = document.querySelector('.services-content');
const contentArea = document.querySelectorAll('.serviceContent');

tabList.forEach(tab => {
  tab.addEventListener('click', () => {
    // Deactivate all tabs
    tabList.forEach(t => t.classList.remove('active'));
    // Hide all panes
    tabPanes.forEach(pane => pane.classList.remove('active'));

    // Activate clicked tab
    tab.classList.add('active');
    // Show corresponding pane
    const targetId = tab.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
  });
});

//adding margin top and height according to Tabs height

document.addEventListener("DOMContentLoaded", () => {
  if (serviceTabs && serviceContent) {
    // Only apply on screens >= 900px
    if (window.innerWidth >= 900) {
      const height = serviceTabs.offsetHeight;
      if (height > 0) {
        serviceContent.style.marginTop = `${height * -1}px`;
        contentArea.forEach(area => {
          area.style.height = `${height}px`;
        });
      }
    } else {
      // Optional: Reset on mobile screens
      serviceContent.style.marginTop = '';
      contentArea.forEach(area => {
        area.style.height = '';
      });
    }
  }
});


//Menu DropDown 
document.querySelectorAll('.nav-item').forEach(item => {
  const toggle = item.querySelector('.dropdownLink');
  if (toggle) {
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      document.querySelectorAll('.nav-item').forEach(i => {
        if (i !== item) i.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  }
});

document.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(item => 
    item.classList.remove('open')
  );
});


// Mobile Menu 
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

// active navbar js

document.addEventListener('DOMContentLoaded', function() {
    console.log('Current path:', window.location.pathname); // Debug line
    
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.navigation .nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-nav__links .nav-item');
    
    // Desktop nav
    navItems.forEach(function(navItem, index) {
        const parentLink = navItem.querySelector('.dropdown-menu a');
        if (parentLink) {
            console.log(`Desktop nav ${index}:`, parentLink.getAttribute('href')); // Debug
            if (parentLink.getAttribute('href') === currentPath) {
                navItem.classList.add('active');
                console.log('Added active to desktop nav-item', index);
            }
        }
    });
    
    // Mobile nav
    mobileNavItems.forEach(function(navItem, index) {
        const parentLink = navItem.querySelector('.dropdown-menu a');
        if (parentLink) {
            console.log(`Mobile nav ${index}:`, parentLink.getAttribute('href')); // Debug
            if (parentLink.getAttribute('href') === currentPath) {
                navItem.classList.add('active');
                console.log('Added active to mobile nav-item', index);
            }
        }
    });
});