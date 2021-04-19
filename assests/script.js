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
    expenseTitle.innerHTML = storedUserName+"'s "+storedDestination+" Holiday!"
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

function signUpUser(event) {
    event.preventDefault();
    var userName = userNameInput.value;
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
    var userDestinationList = document.getElementById("destination-list");
    var holidayResults = document.getElementById("holiday-budget-result")
    var userDestination = userDestinationList.options[userDestinationList.selectedIndex].text;
    var budgetTotal = document.getElementById("holiday-budget-total").value;
    var dateOne = document.getElementById('start-date').value
    var dateTwo = document.getElementById('end-date').value
    var startDate = moment(dateOne).format("DD/MM/YYYY")
    var endDate = moment(dateTwo).format("DD/MM/YYYY")

    //IF statements for when the user does/doesn't enter their input
    if (userDestination == "---Destinations---") {
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
        confirmButtonEl.classList = "button is-info confirm-button"
        holidayResults.appendChild(confirmButtonEl)
    }
});

function storeUserHolidayInput (){
    var userDestinationList = document.getElementById("destination-list");
    var userDestination = userDestinationList.options[userDestinationList.selectedIndex].text;
    var budgetTotal = document.getElementById("holiday-budget-total").value;
    localStorage.setItem("Destination", userDestination)
    localStorage.setItem("Budget Total", budgetTotal)
}


//Event listeners to sign out, confirm holiday details, to go to the sign in again page
// and when signing in again from the sign in page instead of the sign up page
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

submitButton.onclick = function (event) {
    event.preventDefault()

    var expenseName = document.getElementById("expenseName").value;
    localStorage.setItem("expenseName", JSON.stringify(expenseName))

    var expenseAmount = document.getElementById("expenseAmount").value;
    localStorage.setItem("expenseAmount", JSON.stringify(expenseAmount))

    var expenseCatagory = document.getElementById("expenseCatagory").value;
    localStorage.setItem("expenseCatagory", JSON.stringify(expenseCatagory))

    if (expenseName == "") {
        displayModal()
        console.log("please make a submission")
    }

    if (expenseAmount == "") {
        displayModal()
        console.log("please make a submission")
    }

    if (expenseAmount != Number) {
        displayModal()
        console.log("please submit a number")
    }

    if (expenseCatagory == "") {
        displayModal()
        console.log("please make a submission")
    }

