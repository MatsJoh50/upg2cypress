import { default as callmodalSection3, } from './bookingCmodule.js';

/////Create modalSection2\\\\\

//get available slots
async function bookingSlots(param1, param2, param3, param4, param5) {

    //test value and integer for params
    //const value = Number.isInteger(param2);
    //console.log(value, param5.value);

    //check param5.value and param2 before add to url?
    //------code here------

    //create url with params
    const url = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${param5.value}&challenge=${param2}`;
    console.log(url);

    const response = await fetch(url);
    const obj = await response.json();
    //console.log(obj);

    //add secondModal to body
    modalSection2(param1, param2, param3, param4, param5, obj);
}

/*/close firstModal
export function hiddenFirstModal(firstModal){
    console.log(firstModal);
    //firstModal.style.display ="none";
}*/

//function for search button
export default function callmodalSection2(param1, param2, param3, param4, param5) {
    let dateToday = new Date().toJSON().slice(0, 10);

    if (param5.value <= dateToday) {
        window.alert("select a future date");
    } else {
        //console.log(param2, param3, param4);
        bookingSlots(param1, param2, param3, param4, param5);
    }
}

//add secondModal to body
function modalSection2(param1, param2, param3, param4, param5, obj) {
    const secondModal = createSecondModal(param1, param2, param3, param4, param5, obj);
    secondModal.style.display = "block";
    const body = document.querySelector("body").appendChild(secondModal);
}

//create secondModal
function createSecondModal(param1, param2, param3, param4, param5, obj) {

    console.log(obj);

    //const secondModal = document.createElement("section");
    //secondModal.setAttribute("class", "modal2");

    const secondModal = document.createElement("form");
    secondModal.setAttribute("class", "modal2");
    secondModal.setAttribute("method", "POST");

    const headline = document.createElement("h2");
    headline.setAttribute("class", "modal2__headline");
    headline.textContent = `Book room "${param1}" (step 2)`;

    const inputLabel1 = document.createElement("label");
    inputLabel1.setAttribute("class", "modal2__inputLabel1");
    inputLabel1.setAttribute("for", "userName");
    inputLabel1.textContent = "Name";

    const inputName = document.createElement("input");
    inputName.setAttribute("class", "modal2__inputName");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("name", "userName");
    inputName.setAttribute("required", "");

    const inputLabel2 = document.createElement("label");
    inputLabel2.setAttribute("class", "modal2__inputLabel2");
    inputLabel2.setAttribute("for", "email");
    inputLabel2.textContent = "E-mail";

    const inputEmail = document.createElement("input");
    inputEmail.setAttribute("class", "modal2__inputEmail");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("name", "email");
    //inputEmail.setAttribute("pattern", ".+@example\.com");
    inputEmail.setAttribute("required", "");

    const slotLabel = document.createElement("label");
    slotLabel.setAttribute("class", "modal2__slotLabel");
    slotLabel.setAttribute("for", "slots");
    slotLabel.textContent = "What time?";

    const selectSlot = document.createElement("select");
    selectSlot.setAttribute("class", "modal2__selectSlot");
    selectSlot.setAttribute("type", "time");
    selectSlot.setAttribute("name", "slots");
    selectSlot.setAttribute("required", "");

    for (let i = 0; i < obj.slots.length; i++) {
        const slot = document.createElement("option")
        slot.setAttribute("class", "modal2__selectSlot--slotTime");
        slot.setAttribute("value", [i]);
        slot.innerText = `"${obj.slots[i]}"`;
        //test slots
        //console.log(slot);
        selectSlot.appendChild(slot);
    }

    const playersLabel = document.createElement("label");
    playersLabel.setAttribute("class", "modal2__playersLabel");
    playersLabel.setAttribute("for", "participants");
    playersLabel.textContent = "How many participants?";

    const selectPlayers = document.createElement("select");
    selectPlayers.setAttribute("class", "modal2__selectPlayer");
    selectPlayers.setAttribute("type", "number");
    selectPlayers.setAttribute("name", "participants");
    selectPlayers.setAttribute("required", "");

    for (let i = 0; i < ((param4 - param3) + 1); i++) {
        const players = document.createElement("option")
        players.setAttribute("class", "modal2__selectPlayer--players");
        players.setAttribute("min", `"${param3}"`);
        players.setAttribute("max", `"${param4}"`);
        players.innerText = `"${param3 + i}"`;
        //test number of participants
        //console.log(param3, param4);
        selectPlayers.append(players);
    }

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "modal2__submitBtn--booking");
    submitBtn.textContent = "Submit booking";
    submitBtn.addEventListener("click", callmodalSection3.bind(this, param1, param2, param3, param4, param5));

    secondModal.append(headline, inputLabel1, inputName, inputLabel2, inputEmail, slotLabel, selectSlot, playersLabel, selectPlayers, submitBtn);
    //secondModal.appendChild(form);

    return secondModal;
}