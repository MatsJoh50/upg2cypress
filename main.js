//Selectors
const menuBg = document.querySelector(".nav__mobile--bg");
const mobileMenu = document.querySelector(".nav__mobile--menu");
const hamburgerButton = document.querySelector(".nav__mobile--openMenu");
const closeMobileMenu = document.querySelector(".nav__mobile--closeMenu");
const queryHtmlEle = document.querySelector("html");
const hamburgerMenuLinks = document.querySelectorAll(".hamburgerLink");

console.log(hamburgerMenuLinks.length)

//Open and close mobile menu
hamburgerButton.addEventListener("click", runOpenMenu);
closeMobileMenu.addEventListener("click", runCloseMenu);
hamburgerMenuLinks.forEach(link => {
  link.addEventListener("click", runCloseMenu);
});

///// FUNKTIONS \\\\\
function runOpenMenu() {
  queryHtmlEle.style.overflow = "hidden"
  runOpenAndClose("flex");

}

function runCloseMenu() {
  runOpenAndClose("none");
  queryHtmlEle.style.removeProperty("overflow");
}

function runOpenAndClose(property) {
  menuBg.style.display = property;
  mobileMenu.style.display = property;

}
