const donateBtn = document.querySelectorAll("#donateBtn");
const mainDiv = document.getElementById("mainDiv");
const historyDiv = document.getElementById("historyDiv");
const history = document.getElementById("history");
const donate = document.getElementById("donate");
const modalDiv = document.getElementById("modalDiv");

// navigate to blog page

const myBlog = function () {
    window.location.href = "blog.html";
}

// navigate to home page

const toHome = function () {
    window.location.href = "index.html";
}

// function for navigate between history and donate 

const handleDonateBtn = function () {
    let isDonateContainHidden = mainDiv.classList.contains("hidden");
    let isDonateContainBg = mainDiv.classList.contains("bg-[#00D7C0]");

    if (isDonateContainHidden && !isDonateContainBg) {
        donate.classList.add("bg-[#00D7C0]");
        history.classList.remove("bg-[#00D7C0]");
        mainDiv.classList.remove("hidden");
        historyDiv.classList.add("hidden");
    }
}

const handleHistoryBtn = function () {
    let isHistoryContainHidden = mainDiv.classList.contains("hidden");
    let isHistoryContainBg = mainDiv.classList.contains("bg-[#00D7C0]");

    //console.log("working")
    if (!isHistoryContainHidden && !isHistoryContainBg) {
        donate.classList.remove("bg-[#00D7C0]");
        history.classList.add("bg-[#00D7C0]");
        historyDiv.classList.remove("hidden");
        mainDiv.classList.add("hidden");
    }
}


//  reusable functions 

// function 1---
const getInputId = function (idInput) {
    let inputDiv = document.getElementById(idInput);

    return inputDiv.value;
}

// function 2-------- 
const calculateDonation = function (idDiv, idInput) {
    let donationBalance = parseFloat(document.getElementById("donationBalance").innerText);
    let targetDivValue = parseFloat(document.getElementById(idDiv).innerText);

    let inputValue = Number(getInputId(idInput));
    let sum = targetDivValue + inputValue;

    if (isNaN(inputValue) || inputValue <= 0) {
        alert("invalid donation amount");
    } else if (inputValue > donationBalance) {
        alert("insufficient amount");
    } else {
        document.getElementById(idDiv).innerText = sum;
        document.getElementById("donationBalance").innerText = donationBalance - inputValue;
        modalDiv.classList.remove("hidden");
    }
}


// function for hide the modal after click button
const hideModal = function () {
    modalDiv.classList.add("hidden");
}


// donation functionalities 

for (let elem of donateBtn) {
    elem.addEventListener("click", function (det) {
        //console.log(det.target.parentNode.firstElementChild.children[1].children[0].id)

        // get donate span id from target div
        let showDonateSpanId = det.target.parentNode.firstElementChild.children[1].children[0].id;

        // get input id from target input field
        let inputFieldId = det.target.previousElementSibling.id;
        //console.log(inputFieldId)

        
        // get current date and time

        const currentDate = new Date();

        const details = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };


        // convert to string format and also replace coma's with blank space
        const dateToString = currentDate.toLocaleString("en-US", details).split(",").join(" ");

        //console.log(dateToString);

        // get timezoneOffset 

        const timezoneOffset = currentDate.getTimezoneOffset();
        //console.log(timezoneOffset)

        // format the timezone offset

        /* our local timezone is ahead of UTC thats why timezoneOffset 
           will give the output -360. That means it is 6 hours ahead. 
           For get the value in hour and positive value we have to divided it by -60; */

        const formatTimezoneOffset = (timezoneOffset / -60).toString().padStart(2, "0") + "00";
        //console.log(formatTimezoneOffset)

        // final output

        const currentDateTimeString = dateToString + " GMT +" + formatTimezoneOffset + " (Bangladesh Standard Time)";
        //console.log(currentDateTimeString);

        let donateInfo = det.target.parentNode.children[1].innerText;
        let donateInfoArr = donateInfo.split("for");
        let donateLocation = donateInfoArr[1];
        // console.log(donateLocation)

        let valueOfInput = Number(getInputId(inputFieldId));
        const historyDiv = document.getElementById("historyDiv");
        let donationBalance = Number(document.getElementById("donationBalance").innerText);
        calculateDonation(showDonateSpanId, inputFieldId);

        if (!isNaN(valueOfInput) && valueOfInput > 0 && valueOfInput <= donationBalance) {
            historyDiv.innerHTML += `<div class="flex flex-col w-[90%] mx-auto gap-5 border-2 px-7 py-6 mb-5">
                                    <p>${valueOfInput} Taka is Donated for ${donateLocation}</p>
                                    <p>Date : ${currentDateTimeString}</p>
                                </div>`;
        }
    })
}