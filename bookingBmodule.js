/////Create modalSection2\\\\\

//test function for get available slots
async function bookingSlots(param1, param2, param3, param4, param5) {

    //test value and integer for params
    //const value = Number.isInteger(param2);
    //console.log(value, param5.value);

    //check param5.value and param2 before add to url?
    //------code here------

    //test create url with params
    const url = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${param5.value}&challenge=${param2}`;
    console.log(url);

    const response = await fetch(url);
    const obj = await response.json();
    console.log(obj);

    //add secondModal to body
    modalSection2(param1, param2, param3, param4, param5, obj);
}

//test function for search button
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
    const body = document.querySelector("body").appendChild(secondModal);
}

//create secondModal
function createSecondModal(param1, param2, param3, param4, param5, obj) {

    console.log(obj);

    const secondModal = document.createElement("section");
    secondModal.setAttribute("class", "modal2");

    const form = document.createElement("form");
    form.setAttribute("class", "bookingForm");

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
    inputEmail.setAttribute("pattern", ".+@example\.com");
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

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "modal2__submitBtn--booking");
    submitBtn.textContent = "Submit booking";
    //submitBtn.addEventListener("click", ...);

    form.append(headline, inputLabel1, inputName, inputLabel2, inputEmail, slotLabel, selectSlot, submitBtn);
    secondModal.appendChild(form);

    return secondModal;
}