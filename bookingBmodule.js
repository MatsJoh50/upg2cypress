/////Create modalSection2\\\\\

//test function for get available slots
async function bookingSlots(param2, param5) {

    //test value and integer for params
    const value = Number.isInteger(param2);
    console.log(value, param5.value);

    //test create url with params
    const url = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${param5.value}&challenge=${param2}`;
    console.log(url);

    const response = await fetch(url);
    const obj = await response.json();
    console.log(obj);
}

//test function for search button
export default function callmodalSection2(param2, param3, param4, param5) {
    let dateToday = new Date().toJSON().slice(0, 10);

    if (param5.value <= dateToday) {
        window.alert("select a future date");
        // return;
    } else {
        console.log(param2, param3, param4);
        bookingSlots(param2, param5);
    }
}