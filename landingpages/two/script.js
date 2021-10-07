const subMenu = document.getElementById('button');
const subNavbar = document.getElementById('navbar-sub');
const navRespMenu = document.getElementById('nav-resp-menu');
const navRespMenuBtn = document.getElementById('nav-resp-menu-btn');
const navRespSubMenu = document.getElementById('nav-resp-sub-menu');
const navRespSubMenuBtn = document.getElementById('nav-resp-sub-menu-btn');
const navRespSubMenuIcon = document.getElementById('nav-resp-menu-icon');
const navLongMenuIcon = document.getElementById('nav-long-menu-icon');

const heroContainer = document.getElementById('main-image-container');

let isMenuOpen = false;
let isSubMenuOpen = false;

// SWAP HERO BACKGROUND IMAGES

const IMAGES = [{'url': 'images/one.jpeg', 'alt': 'Greewich', 'author': 'LB'}, {'url': 'images/two.jpeg', 'alt': 'Forest', 'author': 'LB'}, {'url': 'images/three.jpeg', 'alt': 'Kuleje', 'author': 'LB'}];

let count = 0;



function loopPhotos() {
  let index = count % IMAGES.length;
  
  heroContainer.style.backgroundImage = `url(${IMAGES[index].url})`;
  
  count++;
}

setInterval(() => {
   
  loopPhotos();
  
}, 10000);



// LONG MENU OPEN
function handleMouseEnter() {
  subNavbar.classList.add('navbar-sub-active');
  navLongMenuIcon.classList.add('sub-menu-icon-active');
};

function handleMouseLeave() {
  subNavbar.classList.remove('navbar-sub-active');
  navLongMenuIcon.classList.remove('sub-menu-icon-active');
};

// SMALL MENU OPEN
function handleRespMenuOpen() {
  if (!isMenuOpen) {
    isMenuOpen = true;
    navRespMenu.classList.add('navbar-resp-menu-active');
  } else {
    isMenuOpen = false;
    navRespMenu.classList.remove('navbar-resp-menu-active')
  }
}

//  SMALL SUB-MENU OPEN
function handleRespSubMenuOpen() {
  if (!isSubMenuOpen) {
    isSubMenuOpen = true;
    navRespSubMenu.classList.add('navbar-resp-sub-menu-active');
    navRespSubMenuIcon.classList.add('sub-menu-icon-active');
  } else {
    isSubMenuOpen = false;
    navRespSubMenu.classList.remove('navbar-resp-sub-menu-active')
    navRespSubMenuIcon.classList.remove('sub-menu-icon-active');
  }
}
// CLOSE SMALL MENUS IF WINDOW IS RESIZED
function handleWindowResize() {
  if (isSubMenuOpen) {
    handleRespSubMenuOpen();
  }
  else if (isMenuOpen) {
    handleRespMenuOpen();
  }
}



// FOOTER MENUS HANDLER

function handleFooterMenu(element) {
  let activeClass = "footer-menu-dropdown-active"

  if (element.classList.contains(activeClass)) {
    element.classList.remove(activeClass)
  } else {
    element.classList.add(activeClass)
  }
}


subMenu.addEventListener('mouseover', handleMouseEnter);
subNavbar.addEventListener('mouseout', handleMouseLeave);
navRespMenuBtn.addEventListener('click', handleRespMenuOpen);
navRespSubMenuBtn.addEventListener('click', handleRespSubMenuOpen);
window.addEventListener('resize', handleWindowResize);

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.footer-menu').forEach(el => el.addEventListener('click', () => handleFooterMenu(el.querySelector('.footer-menu-dropdown'))))
})