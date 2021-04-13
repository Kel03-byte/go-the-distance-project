var submitButton = document.querySelector('button');
var userNameInput = document.querySelector('#username');
var userEmailInput = document.querySelector('#email');
var userPasswordInput = document.querySelector('#password');

submitButton.addEventListener("click", function (event) {
    event.preventDefault()

    var submission = {
        userName: userNameInput.value,
        email: userEmailInput.value,
        password: userPasswordInput.value
    }

    console.log(submission)
});