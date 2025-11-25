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
const contentArea = document.querySelector('.serviceContent');

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
document.addEventListener("DOMContentLoaded", () => {
  if (serviceTabs && serviceContent) {
    const height = serviceTabs.offsetHeight;
    if (height > 0) {
      serviceContent.style.marginTop = `${height * -1}px`;
      contentArea.style.height = `${height}px`;
    }
  }
});