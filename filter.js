

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
let allTagsArray = ['test1', 'test2', 'test3', 'test4', 'test5'];

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

// fetchAllTags();
console.log(allTagsArray)
printAllTags();


function printAllTags(){
    const printSection = document.querySelector("#testbox");
    allTagsArray.forEach(tag => {
        const newDiv = document.createElement("div");
        const newPara = document.createElement("p");
        newPara.innerHTML = tag;
        let tagName = '';
        tagName = tag;
        console.log(tag);
        // newPara.appendChild(tag);
        // newDiv.appendChild(document.createTextNode(tag));
        newDiv.classList.add("tags");
        newDiv.appendChild(newPara);
        // document.body.insertBefore(newDiv, filterTagBox)
        filterTagBox.appendChild(newDiv);
    });
}








//Adds all uniqe tags to an array.
function fetchAllTags() {
    filterTags.forEach(element => {
        if (!allTagsArray.includes(element.innerHTML)) {
            allTagsArray.push(element.innerHTML)

        }
    });
    console.log("all tags: " + allTagsArray)
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