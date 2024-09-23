const donateBtn = document.querySelectorAll("#donateBtn");
const mainDiv = document.getElementById("mainDiv");
const historyDiv = document.getElementById("historyDiv");
const history = document.getElementById("history");
const donate = document.getElementById("donate");

// function for navigate between history and donate 

const handleDonateBtn = function() {
    let isDonateContainHidden = mainDiv.classList.contains("hidden");
    let isDonateContainBg = mainDiv.classList.contains("bg-[#00D7C0]");

    if (isDonateContainHidden && !isDonateContainBg) {
        donate.classList.add("bg-[#00D7C0]");
        history.classList.remove("bg-[#00D7C0]");
        mainDiv.classList.remove("hidden");
        historyDiv.classList.add("hidden");
    }
}

const handleHistoryBtn = function() {
    let isHistoryContainHidden = mainDiv.classList.contains("hidden");
    let isHistoryContainBg = mainDiv.classList.contains("bg-[#00D7C0]");
    console.log("working")
    if(!isHistoryContainHidden && !isHistoryContainBg) {
        donate.classList.remove("bg-[#00D7C0]");
        history.classList.add("bg-[#00D7C0]");
        historyDiv.classList.remove("hidden");
        mainDiv.classList.add("hidden");
    }
}


//  reusable functions 

// function 1---
const getInputId = function(idInput) {
    let inputDiv = document.getElementById(idInput);

    return inputDiv.value;
}

// function 2-------- 
const calculateDonation = function(idDiv, idInput) {
    let donationBalance = parseFloat(document.getElementById("donationBalance").innerText);
    let targetDivValue = parseFloat(document.getElementById(idDiv).innerText);

    let inputValue = parseFloat(getInputId(idInput));
    let sum = targetDivValue + inputValue;

    if (isNaN(inputValue)) {
        alert("invalid donation amount")
    } else {
        document.getElementById(idDiv).innerText = sum;
        document.getElementById("donationBalance").innerText = donationBalance - inputValue;
    }
}

// using forEach method 


// donateBtn.forEach((elem) => {
//     elem.addEventListener("click", (det) => {
//         //console.log(det.target.parentNode.firstElementChild.children[1].children[0].id)

//         // get donate span id from target div
//         let showDonateSpanId = det.target.parentNode.firstElementChild.children[1].children[0].id;
//         // get input id from target input field
//         let inputFieldId = det.target.previousElementSibling.id;
//         //console.log(inputFieldId)

//         calculateDonation(showDonateSpanId, inputFieldId);
//     })
// })


// using for of method

for(let elem of donateBtn) {
    elem.addEventListener("click", function(det) {
        //console.log(det.target.parentNode.firstElementChild.children[1].children[0].id)

        // get donate span id from target div
        let showDonateSpanId = det.target.parentNode.firstElementChild.children[1].children[0].id;
        // get input id from target input field
        let inputFieldId = det.target.previousElementSibling.id;
        //console.log(inputFieldId)

        calculateDonation(showDonateSpanId, inputFieldId);
    })
}