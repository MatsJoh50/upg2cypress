
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




//Variables
let cbMinValue = filterMin.ariaValueNow;
let cbMaxValue = filterMax.ariaValueNow;
let online = false;
let onsite = false;
let allTagsArray = [];
let filterString = '';
let activeFilterTags = [];


//Eventlistener



filterIncOnline.addEventListener('change', () => {
    changeStatusFilterOnline()

});
filterIncOnsite.addEventListener('change', () => {
    changeStatusFilterOnsite()

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
    filterString = ''
    console.log('string builder:', challenge)
    if (online && onsite) {
        filterString += ((challenge.type.includes('online')) || (challenge.type.includes('onsite')))+"&&";
        console.log('string builder online+onsite')
    } else if (onsite) {
        filterString += challenge.type.includes("onsite")+"&&";
        console.log('string builder "onsite"')
    } else if(online){
        filterString += challenge.type.includes("online")+"&&";
        console.log('string builder "online"')
    }
    if (activeFilterTags.length > 0) {
        activeFilterTags.forEach(label => {
            filterString += challenge.labels.includes(`"${label}"`)+"&&";
            console.log('string builder, label:', label)
        })
    }
    console.log('string builder done')

    console.log(`filterString.slice(0, filterString.length-2)`);
    filterString = (filterString.slice(0, filterString.length-2))
    return filterString
}


function printAllChallenges() {
    const printSection = document.querySelector("#testbox");
    printSection.innerHTML = " ";
try{
    if (!online && !onsite && (activeFilterTags.length == 0)) {
        console.log('filter = 0')
        fullApiJson.forEach(challenge => {
            if ((challenge.rating >= cbMinValue) && (challenge.rating <= cbMaxValue)) {
                // console.log(challenge.title, challenge.labels, challenge.type, "rating: ", challenge.rating)
                const newDiv = document.createElement("div");
                let newPara = document.createElement("p")
                let textNode = document.createTextNode(`${challenge.title}, Labels: ${challenge.labels}`)
                newDiv.appendChild(textNode)

                newDiv.classList.add("challenge");
                printSection.appendChild(newDiv);

            }
        });

    } else
        fullApiJson.forEach(challenge => {
            
            if (filterStringBuilder(challenge) == true) {
                console.log(challenge.title, challenge.type)
                if ((challenge.rating >= cbMinValue) && (challenge.rating <= cbMaxValue)) {

                    // console.log(challenge.title, challenge.labels, challenge.type, "rating: ", challenge.rating)
                    const newDiv = document.createElement("div");
                    let newPara = document.createElement("p")
                    let textNode = document.createTextNode(`${challenge.title}, Type: ${challenge.type}`)
                    newDiv.appendChild(textNode)

                    newDiv.classList.add("challenge");
                    printSection.appendChild(newDiv);
                }
            }
        });
    } catch {
        console.log("cant print challenges")
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


