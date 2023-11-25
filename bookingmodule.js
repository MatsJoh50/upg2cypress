export default async function bookingTimes() {
    const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2023-12-12&challenge=3');
    const obj = await response.json();
    console.log(obj);
}

// bookingTimes();

export function modalSection() {
    const body = document.querySelector("body");
    let firstModal = document.createElement("section");
    firstModal.setAttribute("class", "modal1");
    body.appendChild(firstModal);
}