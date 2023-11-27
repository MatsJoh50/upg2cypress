/////Create modalSection2\\\\\

export default async function requestPOST(param2, param5, inputName, inputEmail, selectSlot, selectPlayers) {

    let i = selectSlot.value;
    let slot = selectSlot[i].innerText;

    let players = selectPlayers.value;
    let numbPlayers = players.match(/(\d)/);

    //test params
    console.log(param2);
    console.log(param5.value);
    console.log(inputName.value);
    console.log(inputEmail.value);
    console.log(slot);
    console.log(selectPlayers.value);
    if (numbPlayers) {
        console.log(numbPlayers[0]);
    }

    const url = 'https://lernia-sjj-assignments.vercel.app/api/booking/reservations';
    const bodyObj = {
        challenge: param2,
        name: `${inputName.value}`,
        email: `${inputEmail.value}`,
        date: `${param5.value}`,
        time: `${slot}`,
        participants: +numbPlayers[0],
    }

    //test bodyyObj
    console.log(bodyObj);

    //POST request
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(bodyObj) });
    const data = await res.json();

    //test data
    console.log(data);

    if (data[0] === "ok") {
        modalSection3();
    }
}

function modalSection3() {
    const thirdModal = createThirdModal();
    thirdModal.style.display = "block";
    const body = document.querySelector("body").appendChild(thirdModal);
}

function createThirdModal() {

}