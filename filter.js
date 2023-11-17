//Load API
const fullApiJson = []
getApi().then(data => data.challenges.forEach(challenge => fullApiJson.push(challenge)))
.then(fetchAllTags)
.then(printAllTags)
.catch(err => console.log('errors: ' + err.message))



//Fetch Challange API
async function getApi() {
    const url = 'https://lernia-sjj-assignments.vercel.app/api/challenges';
    const res = await fetch(url);
    const data = await res.json();
    return data
}



//Query selectors
const filterMinAll = document.querySelectorAll(".cbMin");
const filterMin = document.querySelector(".filter__options--rating--min");
const filterMaxAll = document.querySelectorAll(".cbMax");
const filterMax = document.querySelector(".filter__options--rating--max");
const filterIncOnline = document.querySelector("#online");
const filterIncOnsite = document.querySelector("#on-site");
const filterTags = document.querySelectorAll(".tags");
const filterSearchBar = document.querySelector(".filter__Ssearch--input");
const filterTagBox = document.querySelector(".filter__options--tags--collectionBox")




//Variables
let cbMinValue = filterMin.ariaValueNow;
let cbMaxValue = filterMax.ariaValueNow;
let online = false;
let onsite = false;
let allTagsArray = [];

//Eventlistener

filterIncOnline.addEventListener('change', () => changeStatusFilterOnline());
filterIncOnsite.addEventListener('change', () => changeStatusFilterOnsite())

//Change the min star rating filter and match the max value.
filterMinAll.forEach(cbMinSpan => {
    cbMinSpan.addEventListener('click', (event) => {
        // Bind star ID to variable
        let id = event.target.id
        let idValue = id.split('-');
        cbMinValue = idValue[1];
        //Change aria-valuenow to ID-variable
        filterMin.ariaValueNow = cbMinValue;

        //Check and change if min value is higher then max value
        if (cbMaxValue < cbMinValue) {
            filterMax.ariaValueNow = cbMinValue;
        }
    });
});

//Change the max star rating filter and match the min value.
filterMaxAll.forEach(cbMinSpan => {
    cbMinSpan.addEventListener('click', (event) => {
        // Bind star ID to variable
        let id = event.target.id
        let idValue = id.split('-');
        cbMaxValue = idValue[1]

        //Change aria-valuenow to ID-variable
        filterMax.ariaValueNow = cbMaxValue;

        //Check and change if max value is lower then min value.
        if (cbMaxValue < cbMinValue) {
            filterMin.ariaValueNow = cbMaxValue;
        }
    });
});




function printAllTags() {
    const printSection = document.querySelector("#testbox");
allTagsArray.forEach(tag => {
        const newDiv = document.createElement("div");
        const newPara = document.createElement("p");
        newPara.innerHTML = tag;
        newDiv.classList.add("tags");
        newDiv.appendChild(newPara);
        filterTagBox.appendChild(newDiv);
    });
}




//Adds all uniqe tags to an array.
async function fetchAllTags() {
    for(let i = 0; i < fullApiJson.length; i++){
        const lable = fullApiJson[i].labels
        lable.forEach(lable =>{
            if(!allTagsArray.includes(lable)){
                allTagsArray.push(lable)
            }
        })
    }
}

//Toggle the bool of onsite filter.
function changeStatusFilterOnsite() {
    if (onsite == true) {
        onsite = false;
    } else onsite = true;
}

//Toggle the bool for online filter.
function changeStatusFilterOnline() {
    if (online == true) {
        online = false;
    } else online = true;
}


