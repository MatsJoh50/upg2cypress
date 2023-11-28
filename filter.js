
import {createChallengeBox, runOpenMenu, runCloseMenu, runOpenAndClose} from "./modules.js";
//Load API
const fullApiJson = []
getApi().then(data => data.challenges.forEach(challenge => fullApiJson.push(challenge)))
    .then(fetchAllTags)
    .then(printAllTags)
    .then(printAllChallenges)
    .then(grabAllTags)
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
let filterTags = document.querySelectorAll(".tags");
const filterSearchBar = document.querySelector("#filter__input--bar");
const filterTagBox = document.querySelector(".filter__options--tags--collectionBox")
const filterButton = document.querySelector(".toFilter__bigButton");
const exitBtn = document.querySelector(".exitBtn");



//Variables
let cbMinValue = filterMin.ariaValueNow;
let cbMaxValue = filterMax.ariaValueNow;
let online = true;
let onsite = true;
let allTagsArray = [];
let activeFilterTags = [];


//Eventlistener



filterIncOnline.addEventListener('change', () => {
    changeStatusFilterOnline()

});
filterIncOnsite.addEventListener('change', () => {
    changeStatusFilterOnsite()

})

filterButton.addEventListener('click', () => {
    document.querySelector(".filter").classList.toggle("hidden");
    document.querySelector(".toFilter__bigButton").classList.toggle("hidden");

})
exitBtn.addEventListener('click', () => {
    document.querySelector(".filter").classList.toggle("hidden");
    document.querySelector(".toFilter__bigButton").classList.toggle("hidden");

})




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
            cbMaxValue = cbMinValue
            filterMax.ariaValueNow = cbMinValue;
        }
        // console.log('min:',cbMinValue, 'max: ', cbMaxValue)

        printAllChallenges()
    });
});

//Change the max star rating filter and match the min value.
filterMaxAll.forEach(cbMaxSpan => {
    cbMaxSpan.addEventListener('click', (event) => {
        // Bind star ID to variable
        let id = event.target.id
        let idValue = id.split('-');
        cbMaxValue = idValue[1]

        //Change aria-valuenow to ID-variable
        filterMax.ariaValueNow = cbMaxValue;

        //Check and change if max value is lower then min value.
        if (cbMaxValue < cbMinValue) {
            cbMinValue = cbMaxValue
            filterMin.ariaValueNow = cbMaxValue;
        }
        // console.log('min:',cbMinValue, 'max: ', cbMaxValue)
        printAllChallenges()
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

function grabAllTags() {
    filterTags = document.querySelectorAll(".tags");
    // console.log('loaded:',filterTags)

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle("active");
            if (activeFilterTags.includes(tag.innerText)) {
                activeFilterTags.splice(activeFilterTags.indexOf(tag.innerText), 1);
                // console.log(activeFilterTags)

                printAllChallenges()
            }else
            activeFilterTags.push(tag.innerText)
            // console.log('pushed:', tag.innerText)

            printAllChallenges()
        })
    });
}

function filterStringBuilder(challenge) {
    let filterString = [];
    // console.log('string builder:', challenge)
    if (online && onsite) {
        filterString.push(((challenge.type.includes('online')) || (challenge.type.includes('onsite'))));
        console.log('string builder online+onsite')
        // console.log("filter test:",filterString)
    } else if (onsite) {
        filterString.push((challenge.type.includes("onsite")));
        console.log("filter test: onsite")
    } else if(online){
        filterString.push(challenge.type.includes("online"));
        // console.log("filter test:",filterString)
        console.log('string builder "online"')
    }
    if (activeFilterTags.length > 0) {
        activeFilterTags.forEach(label => {
            filterString.push(challenge.labels.includes(`${label}`))
            // console.log("filter test:",filterString)
        })
    }
    // console.log('string builder done')
    // filterString = filterString.slice(0, filterString.length-2)
    // console.log(filterString);

   return filterString
}


function printAllChallenges() {
    const printSection = document.querySelector("#testbox");
    printSection.innerHTML = " ";
    let didNotPrint = true
try{
    if ((online && onsite) && (activeFilterTags.length == 0)) {
        console.log('Only Rating Filter')
        fullApiJson.forEach(challenge => {
            if ((challenge.rating >= cbMinValue) && (challenge.rating <= cbMaxValue)) {
                // console.log(challenge.title, challenge.labels, challenge.type, "rating: ", challenge.rating)
                printSection.appendChild(createChallengeBox(challenge))
                didNotPrint = false;

            }
        });

    } else
    fullApiJson.forEach(challenge => {
        if (filterStringBuilder(challenge).every(condition => condition == true) && (filterStringBuilder(challenge).length != 0)) {
                console.log("test in if statement: ",filterStringBuilder(challenge).every(condition => condition === true))
            // filterStringBuilder(challenge).every(true){
                if ((challenge.rating >= cbMinValue) && (challenge.rating <= cbMaxValue)) {
                    printSection.appendChild(createChallengeBox(challenge))

                    didNotPrint = false
                }
            }
        });
    } catch {
        console.log("cant print challenges")
    }
    if(didNotPrint){
        console.log("nada")
        const noHit = document.createElement("p");
        const textNode = document.createTextNode("No matching challanges");
        noHit.classList.add("nochallange")
        noHit.appendChild(textNode);
        printSection.appendChild(noHit)
    }
}


//Adds all uniqe tags to an array.
async function fetchAllTags() {
    for (let i = 0; i < fullApiJson.length; i++) {
        const lable = fullApiJson[i].labels
        lable.forEach(lable => {
            if (!allTagsArray.includes(lable)) {
                allTagsArray.push(lable)
            }
        })
    }
}

//Toggle the bool of onsite filter.
function changeStatusFilterOnsite() {
    if (onsite == true) {
        onsite = false;
        printAllChallenges()

    } else onsite = true;
    printAllChallenges()

}

//Toggle the bool for online filter.
function changeStatusFilterOnline() {
    if (online == true) {
        online = false;
        printAllChallenges()

    } else online = true;
    printAllChallenges()

}


//Open and close mobile menu
hamburgerButton.addEventListener("click", runOpenMenu);
closeMobileMenu.addEventListener("click", runCloseMenu);
hamburgerMenuLinks.forEach(link => {
  link.addEventListener("click", runCloseMenu);
});
