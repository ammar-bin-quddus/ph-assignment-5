const donateBtn = document.querySelectorAll("#donateBtn");


//  reusable functions 

// function 1---
const getInputId = (idInput) => {
    let inputDiv = document.getElementById(idInput);

    return inputDiv.value;
}

// function 2-------- 
const calculateDonation = (idDiv, idInput) => {
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


donateBtn.forEach((elem) => {
    elem.addEventListener("click", (det) => {
        //console.log(det.target.parentNode.firstElementChild.children[1].children[0].id)

        // get donate span id from target div
        let showDonateSpanId = det.target.parentNode.firstElementChild.children[1].children[0].id;
        // get input id from target input field
        let inputFieldId = det.target.previousElementSibling.id;
        //console.log(inputFieldId)

        calculateDonation(showDonateSpanId, inputFieldId);
    })
})
