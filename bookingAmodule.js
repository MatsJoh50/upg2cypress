import { default as callmodalSection2 } from './bookingBmodule.js';

/////Create modalSection1\\\\\\

//add firstModal to body
export default function modalSection1(param1, param2, param3, param4) {
    const firstModal = createfirstModal(param1, param2, param3, param4);
    const body = document.querySelector("body").appendChild(firstModal);
}

//create firstModal
function createfirstModal(param1, param2, param3, param4) {
    const firstModal = document.createElement("section");
    firstModal.setAttribute("class", "modal1");

    const headline = document.createElement("h2");
    headline.setAttribute("class", "modal1__headline");
    headline.textContent = `Book room "${param1}" (step 1)`;

    const question = document.createElement("p");
    question.setAttribute("class", "modal1__question");
    question.textContent = "What date would you like to come?";

    const inputLabel = document.createElement("label");
    inputLabel.setAttribute("class", "modal1__inputLabel");
    inputLabel.setAttribute("for", "bookingDate");
    inputLabel.textContent = "Date";

    const inputDate = document.createElement("input");
    let dateToday = new Date().toJSON().slice(0, 10);
    inputDate.setAttribute("class", "modal1__inputDate");
    inputDate.setAttribute("type", "date");
    inputDate.setAttribute("min", dateToday);
    inputDate.setAttribute("placeholder", "YYYY-MM-DD");
    inputDate.setAttribute("name", "bookingDate");
    inputDate.setAttribute("required", "");

    const searchBtn = document.createElement("button");
    searchBtn.setAttribute("class", "modal1__searchBtn--booking");
    searchBtn.textContent = "Search available times";
    searchBtn.addEventListener("click", callmodalSection2.bind(this, param2, param3, param4, inputDate));

    firstModal.append(headline, question, inputLabel, inputDate, searchBtn);

    return firstModal;
}