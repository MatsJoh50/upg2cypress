export default async function bookingTimes() {
    const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2023-12-12&challenge=3');
    const obj = await response.json();
    console.log(obj);
}

// bookingTimes();

//add firstModal to body
export function modalSection(/*firstModal*/) {
   // const body = document.querySelector("body").appendChild(firstModal);
//}

//create firstModal
//function createfirstModal(challenge){
let firstModal = document.createElement("section");
firstModal.setAttribute("class", "modal1");

let headline = document.createElement("h2");
headline.setAttribute("class","modal1__headline");
headline.textContent = "Book room (step 1)";  //`Book room "${challenge.title}" (step 1)}`;

let question = document.createElement("p");
question.setAttribute("class", "modal1__question");
question.textContent = "What date would you like to come?";

let inputLabel = document.createElement("label");
inputLabel.setAttribute("class", "modal1__inputLabel");
inputLabel.setAttribute("for", "bookingDate");
inputLabel.textContent = "Date";

let inputDate = document.createElement("input");
inputDate.setAttribute("class", "modal1__inputDate");
inputDate.setAttribute("type", "date");
inputDate.setAttribute("placeholder", "YYYY-MM-DD");
inputDate.setAttribute("name", "bookingDate");
inputDate.setAttribute("required", "");

let searchBtn = document.createElement("button");
searchBtn.setAttribute("class", "modal1__searchBtn--booking");
searchBtn.textContent = "Search available times";

firstModal.append(headline, question, inputLabel, inputDate, searchBtn);
const body = document.querySelector("body").appendChild(firstModal);

//return firstModal;
}