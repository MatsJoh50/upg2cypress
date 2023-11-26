//import from bookingmodule.js to test modal booking
//import bookingTimes from './bookingmodule.js';
//import modalSection from './bookingmodule.js';
import { default as bookingTimes, modalSection } from './bookingmodule.js';

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

async function exampel() {
  const url = 'https://lernia-sjj-assignments.vercel.app/api/challenges';
  const response = await fetch(url);
  const data = await response.json();

  for (let i = 0; i < data.challenges.length; i++) {
    const challengeBox = createChallengeBox(data.challenges[i])
    document.querySelector('.main__slider').appendChild(challengeBox);
  };
}

document.querySelector(".main__marketing--challenges").addEventListener("click", exampel);
//exampel()


function createChallengeBox(challengeData) {
  const challengeBox = document.createElement('div');
  challengeBox.classList.add('main__sliderBox');

  const cardHero = document.createElement('img');
  cardHero.src = challengeData.image;
  cardHero.classList.add('main__sliderBox--img')
  challengeBox.appendChild(cardHero)

  const challengeType = document.createElement('img')
  challengeType.classList.add('main__sliderBox--type')
  if (challengeData.type === 'online') {
    challengeType.src = 'images/computer.png';
  } else if (challengeData.type === 'onsite') {
    challengeType.src = 'images/house.png';
  }
  challengeBox.appendChild(challengeType)

  const title = document.createElement('p');
  title.classList.add('title')
  title.textContent = challengeData.title;
  challengeBox.appendChild(title)

  const info = document.createElement('div');
  info.classList.add('main__sliderBox--info')
  challengeBox.appendChild(info)

  for (let i = 0; i < 5; i++) {
    const stars = document.createElement('img');
    stars.src = i < challengeData.rating ? 'images/full_star.png' : 'images/emtpy_star.png';
    stars.classList.add('main__sliderBox--stars')
    info.appendChild(stars);
  }

  const participants = document.createElement('small');
  participants.classList.add('main__sliderBox--participants')
  participants.textContent = `${challengeData.minParticipants}-${challengeData.maxParticipants} participants ${challengeData.type === 'online' ? "(networked)" : ""}`
  info.appendChild(participants);

  const contentDescription = document.createElement('p');
  contentDescription.textContent = challengeData.description;
  challengeBox.appendChild(contentDescription)

  const btn = document.createElement('button')
  if (challengeData.type === 'online') {
    btn.classList.add('main__sliderBox--button')
    btn.textContent = 'Take challenge online';
  } else if (challengeData.type === 'onsite') {
    btn.classList.add('main__sliderBox--button')
    btn.textContent = 'Book this room';
  }

  btn.classList.add('red');
  challengeBox.appendChild(btn)

  return challengeBox;
}


//start of test modal booking
//bookingTimes()
document.querySelector(".main__marketing--testBook").addEventListener("click", bookingTimes);
document.querySelector(".main__marketing--testBook").addEventListener("click", modalSection);
//end of test modal booking
