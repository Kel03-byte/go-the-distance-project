var signUpButton = document.getElementById('sign-up-button')
var signInOneButton = document.getElementById('sign-in-button');
var signInTwoButton = document.getElementById('sign-in-button-two');
var holidaySubmitButton = document.getElementById("holiday-submit-button")
var signOutOneButton = document.getElementById('sign-out-button');
var signOutTwoButton = document.getElementById('sign-out-button-two');
var confirmButtonEl = document.createElement("button")

var signUpContainer = document.getElementById('sign-up-container')
var holidayInputContainer = document.getElementById('holiday-input-container')
var signInContainer = document.getElementById('sign-in-container');
var expenseInputContainer = document.getElementById('expense-input-container')

var userNameInput = document.querySelector('#username');
var userEmailInput = document.querySelector('#email');
var userPasswordInput = document.querySelector('#password');

var storedEmail = localStorage.getItem("Email", email);
var storedPassword = localStorage.getItem("Password", password);

var quoteText = document.getElementById("quote")
var expenseTitle = document.getElementById("expenseTitle")

displayQuote()

//Function to display Sign In Container which the user sings back into the site
//and can add/edit holiday expenses
function displaySignInContainer() {
    signUpContainer.style.display = "none"
    signInContainer.style.display = "block"
    holidayInputContainer.style.display = "none"
    expenseInputContainer.style.display = "none"
}

//Function to display the Holiday Input Container where the user enters details about their travel
function displayHolidayInputContainer() {
    signUpContainer.style.display = "none"
    signInContainer.style.display = "none"
    holidayInputContainer.style.display = "block"
    expenseInputContainer.style.display = "none"

}

//Function to display the Expense Container where the user inputs their expenses
//and updates the progress bar
function displayExpenseInputContainer() {
    storeUserHolidayInput()
    var expenseTitle = document.getElementById('expenseTitle')
    var storedUserName = localStorage.getItem("Name")
    var storedDestination = localStorage.getItem("Destination")
    signUpContainer.style.display = "none"
    signInContainer.style.display = "none"
    holidayInputContainer.style.display = "none"
    expenseInputContainer.style.display = "block"
    expenseTitle.innerHTML = storedUserName + "'S " + storedDestination + " HOLIDAY!"
}

//Function to fetch and display a random quote
function displayQuote() {
    fetch("https://favqs.com/api/qotd")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var quote = data.quote.body
            var author = data.quote.author
            quoteText.innerHTML = "<q>" + quote + "</q>" + "<p>" + author + "<p>"
        })
};

//Signs the user up to the website
function signUpUser(event) {
    event.preventDefault();
    var userName = userNameInput.value.trim().toUpperCase();
    var email = userEmailInput.value;
    var password = userPasswordInput.value;

    //If statements to alert the user to input info or that they have already signed up
    if (!userName) {
        displayModal()
        return
    }
    if (!email) {
        displayModal()
        return
    }
    if (!password || password.length <= 7) {
        displayModal()
        return
    }
    else {
        localStorage.setItem("Name", userName);
        localStorage.setItem("Email", email);
        localStorage.setItem("Password", password);
        displayHolidayInputContainer()
    }
    return
};

//Function to check user's info and dipslay the "Holiday Budget Input" container.
function getUserInformation() {
    displaySignInContainer()
    var userInputEmail = document.getElementById("user-input-email").value
    var userInputPassword = document.getElementById("user-input-password").value

    //IF statements that will occur when checking the locally stored info against user's input
    if (userInputEmail !== storedEmail && userInputPassword !== storedPassword) {
        displayModal()
        return
    } else if (userInputEmail == storedEmail && userInputPassword !== storedPassword) {
        displayModal()
        return
    } else if (userInputEmail !== storedEmail && userInputPassword == storedPassword) {
        displayModal()
        return
    } else if (!userInputEmail && !userInputPassword) {
        displayModal()
        return
    } else (userInputEmail === storedEmail && userInputPassword === storedPassword)
    displayExpenseInputContainer()
};

//Event listener to collect user's input
holidaySubmitButton.addEventListener("click", function (event) {
    var holidayResults = document.getElementById("holiday-budget-result")
    var userDestination = document.getElementById("destination-list").value.trim().toUpperCase();
    var budgetTotal = document.getElementById("holiday-budget-total").value;
    var dateOne = document.getElementById('start-date').value
    var dateTwo = document.getElementById('end-date').value
    var startDate = moment(dateOne).format("DD/MM/YYYY")
    var endDate = moment(dateTwo).format("DD/MM/YYYY")

    //IF statements for when the user does/doesn't enter their input
    if (!userDestination) {
        displayModal();
        return
    } else if (!budgetTotal) {
        displayModal();
        return
    } else if (!dateOne) {
        displayModal()
        return
    } else if (!dateTwo) {
        displayModal();
        return
    } else {
        //If user enters all info then a message is displayed to confirm their input or to resubmit
        event.preventDefault();
        holidaySubmitButton.style.display = "none"
        holidayResults.textContent = 'You have selected to holiday at ' + userDestination +
            ', from: ' + startDate +
            ', till: ' + endDate +
            ' with $' + budgetTotal + ' to spend while on holiday, is that correct?'
        holidayResults.append();
        confirmButtonEl.textContent = "Confirm"
        confirmButtonEl.classList = "button is-success confirm-button"
        holidayResults.appendChild(confirmButtonEl)
    }
});

//Stores Holiday Information into local storage
function storeUserHolidayInput() {
    var userDestination = document.getElementById("destination-list").value.trim().toUpperCase();
    var budgetTotal = document.getElementById("holiday-budget-total").value;
    localStorage.setItem("Destination", userDestination)
    localStorage.setItem("Budget Total", budgetTotal)
}

//Event listeners to "sign up", to sign out, to confirm holiday details, to go to the "sign in" page
// and when signing in again from the "sign in" page instead of the sign up page
signUpButton.addEventListener('click', signUpUser)
signOutOneButton.addEventListener('click', function () { location.reload() });
signOutTwoButton.addEventListener('click', function () { location.reload() });
confirmButtonEl.addEventListener('click',
    displayExpenseInputContainer,
    storeUserHolidayInput)
signInOneButton.addEventListener("click", displaySignInContainer);
signInTwoButton.addEventListener('click', function (event) {
    event.preventDefault()
    getUserInformation()
});

//Function to display Modals when a User doesn't enter their information
var modal = document.getElementById("pageModal");
var span = document.getElementsByClassName("close")[0];

function displayModal() {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Variables and Function to display a modal for the user to input expense information in
//which is saved to local storage
var expenseModal = document.getElementById("expenseModal");
var addExpenseButton = document.getElementById("addExpenseButton");
var closeButton = document.getElementsByClassName("closeButton")[0];

addExpenseButton.onclick = function () {
    expenseModal.style.display = "block";
}

closeButton.onclick = function () {
    expenseModal.style.display = "none";
}

var submitButton = document.getElementById("submitButton")

//On submitting the expense values the inputted information is then saved to local storage and displayed in the table
submitButton.onclick = function (event) {
    event.preventDefault();
    var expenseName = document.getElementById("expenseName").value;
    localStorage.setItem("expenseName", expenseName)

    var expenseAmount = document.getElementById("expenseAmount").value;
    localStorage.setItem("expenseAmount", expenseAmount)

    var expenseCatagory = document.getElementById("expenseCatagory").value;
    localStorage.setItem("expenseCatagory", expenseCatagory)

    if (!expenseName) {
        displayModal();
        return
    } else if (!expenseAmount) {
        displayModal();
    } else if (!expenseCatagory) {
        displayModal();
        return
    } else {

        var nameListEl = $('#name-list')

        var expenseNameItem = $("<ul><li>" + expenseName + "</li></ul>");

        expenseNameItem.appendTo(nameListEl);

        $(expenseName);



        var amountListEl = $('#amount-list')

        var expenseAmountItem = $("<ul><li>" + expenseAmount + "</li></ul>");

        expenseAmountItem.appendTo(amountListEl);

        $(expenseAmount);



        var catagoryListEl = $('#catagory-list')

        var expenseCatagoryItem = $("<ul><li>" + expenseCatagory + "</li></ul>");

        expenseCatagoryItem.appendTo(catagoryListEl);

        $(expenseCatagory);


        expenseModal.style.display = "none";


        if (expenseCatagory === "Transportation") {
            console.log("it worked")

        }

        else if (expenseCatagory === "Food") {
            console.log("it worked2")


        }

        else if (expenseCatagory === "Accomodation") {
            console.log("it worked3")


        }

        else if (expenseCatagory === "Entertainment") {
            console.log("it worked4")


        }

    }

};

//Auotcomplete for User Destination
let map, latValue, lngValue;

function autoComplete() {
    var locationInput = document.querySelector('#destination-list');
    var autocomplete = new google.maps.places.Autocomplete(locationInput);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var city = autocomplete.getPlace();
        latValue = city.geometry.location.lat();
        lngValue = city.geometry.location.lng();
    });
}

google.maps.event.addDomListener(window, 'load', autoComplete);