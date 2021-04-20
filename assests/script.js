//Variables for "Sign Up" on website.
var signUpButton = document.getElementById('sign-up-button')
var userNameInput = document.querySelector('#username');
var userEmailInput = document.querySelector('#email');
var userPasswordInput = document.querySelector('#password');
var signInButton = document.querySelector('#sign-in-button');
var signUpContainer = document.getElementById('sign-up-container')

//"Sign Up" event listener which if successful stores the users email, password and name in local storage
// and then the user is taken to the input page to input their holiday budget info.
signUpButton.addEventListener('click', function (event) {
    event.preventDefault();
    var storedEmail = localStorage.getItem("Email", email)
    var name = userNameInput.value;
    var email = userEmailInput.value;
    var password = userPasswordInput.value;

    //If statements to alert the user to input info or that they have already signed up
    if (!name) {
        return
    }
    if (!email) {
        return
    }
    if (storedEmail == email) {
        return alert("you already have singed up before!")
    }
    if (!password) {
        return
    }
    else {
        localStorage.setItem("Name", name);
        localStorage.setItem("Email", email);
        localStorage.setItem("Password", password);
        displayHolidayInputContainer()
    }
    return
});

//Variables for "Sign In" page if the user has already signed up before.
var signInContainer = document.getElementById('sign-in-container');
var signInTwoButton = document.getElementById('sign-in-button-two');

//"Sign In" event listener which displays the "Sign In" container and allows the user
//to sign in without signing up again.
signInButton.addEventListener("click", displaySignInContainer);

//Funtion to display the "Sign In" container and remove the "Sign Up" container.
function displaySignInContainer() {
    signUpContainer.remove()
    signInContainer.style.display = "block";
}

//Event listener to submit the user's "Sign In" information and display the "Holiday Budget Input" container.
signInTwoButton.addEventListener("click", getUserInformation)

//Function to check user's info and dipslay the "Holiday Budget Input" container.
function getUserInformation() {
    displaySignInContainer()

    //local variables to pull locally stored info and user's input
    var userInputEmail = document.getElementById("user-input-email").value
    var email = localStorage.getItem("Email", email);
    var userInputPassword = document.getElementById("user-input-password").value
    var password = localStorage.getItem("Password", password)

    //IF statements that will occur when checking the locally stored info against user's input
    if (userInputEmail !== email && userInputPassword !== password) {
        return alert("email and password do not match, please try again")
    } else if (userInputEmail == email && userInputPassword !== password) {
        return alert("email is the same, but password doesn't match")
    } else if (userInputEmail !== email && userInputPassword == password) {
        return alert("password is the same, but email doesn't match")
    } else (userInputEmail == email && userInputPassword == password)
    displayHolidayInputContainer()
}

//Removes "Sign Up" and "Sign In" container and displays the "Holiday Budget Input" container
var holidayInputContainer = document.getElementById("holiday-input-container")
function displayHolidayInputContainer() {
    signUpContainer.remove()
    signInContainer.remove()
    holidayInputContainer.style.display = "block"
}

//Gloabl variables for user's holiday budget input
var holidaySubmitButton = document.getElementById("holiday-submit-button")
var holidayResults = document.getElementById("holiday-budget-result")
var confirmButtonEl = document.createElement("button")
var resubmitButtonEl = document.createElement("button")

//Event listener to collect user's input
holidaySubmitButton.addEventListener("click", function (event) {

    //local variables for destination, dates and budgeted amount
    var userDestinationList = document.getElementById("destination-list");
    var budgetTotal = document.getElementById("holiday-budget-total").value;
    var userDestination = userDestinationList.options[userDestinationList.selectedIndex].text;
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
        holidayResults.textContent = 'You have selected to holiday at ' + userDestination +
            ', from: ' + startDate +
            ', till: ' + endDate +
            ' with $' + budgetTotal + ' to spend while on holiday, is that correct?'
        holidayResults.append();
        confirmButtonEl.textContent = "Confirm"
        resubmitButtonEl.textContent = "Resubmit"
        holidayResults.appendChild(confirmButtonEl)
        holidayResults.appendChild(resubmitButtonEl)
    };
    return;
});

resubmitButtonEl.addEventListener("click", function () { location.reload() });


//Function to display Modals when an event happens
var modal = document.getElementById("page-modal");
var span = document.getElementsByClassName("close")[0];
function displayModal() {
    modal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

span.onclick = function () {
    modal.style.display = "none";
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

    var expenseName = document.getElementById("expenseName").value;
    localStorage.setItem ("expenseName", JSON.stringify(expenseName))

    var expenseAmount = document.getElementById("expenseAmount").value;
    localStorage.setItem ("expenseAmount", JSON.stringify(expenseAmount))

    var expenseCatagory = document.getElementById("expenseCatagory").value;
    localStorage.setItem ("expenseCatagory", JSON.stringify(expenseCatagory))

    // console.log(expenseName)
    // console.log(expenseAmount)
    // console.log(expenseCatagory)


    if (expenseName == "") {
        // displayModal();
        console.log("please make a submission")
    }

    if (expenseAmount == "") {
        // displayModal();
        console.log("please make a submission")
    }

    if (expenseAmount != Number) {
        // displayModal();
        console.log("please submit a number")
    }

    if (expenseCatagory == "") {
        // displayModal();
        console.log("please make a submission")
    }

    addExpense.preventDefault();

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


var expenseName = localStorage.getItem("expenseName")
console.log(expenseName)

var expenseAmount = localStorage.getItem("expenseAmount")
console.log(expenseAmount)

var expenseCatagory = localStorage.getItem("expenseCatagory")
console.log(expenseCatagory)
