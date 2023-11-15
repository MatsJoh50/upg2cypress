

//Query selectors
const cbMinAll = document.querySelectorAll(".cbMin");
const cbMin = document.querySelector(".filter__options--rating--min");
const cbMaxAll = document.querySelectorAll(".cbMax");
const cbMax = document.querySelector(".filter__options--rating--max");
const cbOnline = document.querySelector("#online");
const cbOnsite = document.querySelector("#on-site");

//Variables
let cbMinValue  = cbMin.ariaValueNow;
let cbMaxValue = cbMax.ariaValueNow;
let online = false;
let onsite = false;

cbOnline.addEventListener('change', (event) => {
    if(online == true){
        online = false;
    } else online = true;
})

cbOnsite.addEventListener('change', (event) => {
    if(onsite == true){
        onsite = false;
    } else onsite = true;
})


cbMinAll.forEach(cbMinSpan => {
    cbMinSpan.addEventListener('click', (event) => {
        // Bind star ID to variable
        let id = event.target.id
        let idValue = id.split('-');
        cbMinValue = idValue[1];
        //Change aria-valuenow to ID-variable
        cbMin.ariaValueNow = cbMinValue;

        //Check and change if min value is higher then max value
        if(cbMaxValue < cbMinValue){
            cbMax.ariaValueNow = cbMinValue;
        }
    });
});

cbMaxAll.forEach(cbMinSpan => {
    cbMinSpan.addEventListener('click', (event) => {
        // Bind star ID to variable
        let id = event.target.id
        let idValue = id.split('-');
        cbMaxValue = idValue[1]

        //Change aria-valuenow to ID-variable
        cbMax.ariaValueNow = cbMaxValue;

        //Check and change if max value is lower then min value.
        if(cbMaxValue < cbMinValue){
            cbMin.ariaValueNow = cbMaxValue;
        }
    });
});