/////Create modalSection3\\\\\

//POST request
export default async function requestPOST(challengeDataId, inputDate, inputName, inputEmail, selectSlot, selectPlayers) {

    let i = selectSlot.value;
    let slot = selectSlot[i].innerText;

    let players = selectPlayers.value;
    let numbPlayers = players.match(/(\d)/);

    const url = 'https://lernia-sjj-assignments.vercel.app/api/booking/reservations';
    const bodyObj = {
        challenge: challengeDataId,
        name: `${inputName.value}`,
        email: `${inputEmail.value}`,
        date: `${inputDate.value}`,
        time: `${slot}`,
        participants: +numbPlayers[0],
    }

    //to prevent "ok" response when incorrect email format
    if (inputEmail.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        //actual POST request
        const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(bodyObj) });
        const data = await res.json();

        //to show third modal if POST request ok
        if (Object.values(data)[0] === "ok") {
            modalSection3();
            return;
        }
        return;
    }
}

//add thirdModal to body
function modalSection3() {
    const thirdModal = createThirdModal();
    thirdModal.style.display = "block";
    const body = document.querySelector("body").appendChild(thirdModal);
}

//create thirdModal
function createThirdModal() {
    const thirdModal = document.createElement("section");
    thirdModal.setAttribute("class", "modal3");

    const headline = document.createElement("h2");
    headline.setAttribute("class", "modal3__headline");
    headline.textContent = "Thank you!";

    const aLink = document.createElement("a");
    aLink.setAttribute("class", "modal3__aLink");
    aLink.setAttribute("href", "./filter.htm");
    //to show challenges site
    aLink.textContent = "Back to challenges";

    thirdModal.append(headline, aLink);

    return thirdModal;
}