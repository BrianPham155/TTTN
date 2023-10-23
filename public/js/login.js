const form = document.querySelector('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

function isEmail(emailVal) {
    const atSymbol = emailVal.indexOf('@');
    if (atSymbol < 1) return false;
    const dot = emailVal.lastIndexOf('.');
    if (dot <= atSymbol + 2) return false;
    if (dot === emailVal.length - 1) return false;
    return true;
}   

function validateForm() {
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();

    // Validate username
    if (usernameVal === "") {
        displayErrorMessage(username, 'Username cannot be blank');
    } else if (usernameVal.length < 3) {
        displayErrorMessage(username, 'Minimum 3 characters');
    } else {
        clearErrorMessage(username);
    }

    // Validate email
    if (emailVal === "") {
        displayErrorMessage(email, 'Email cannot be blank');
    } else if (!isEmail(emailVal)) {
        displayErrorMessage(email, 'Email is not valid');
    } else {
        clearErrorMessage(email);
    }

    // Validate password
    if (passwordVal === "") {
        displayErrorMessage(password, 'Password cannot be blank');
    } else if (passwordVal.length < 6) {
        displayErrorMessage(password, 'Minimum 6 characters');
    } else {
        clearErrorMessage(password);
    }

    if (usernameVal && emailVal && passwordVal) {
        const data = {
            username: usernameVal,
            email: emailVal,
            password: passwordVal
        };

        // Send POST request using Axios
        axios.post('/register', data)
            .then(response => {
                console.log(response.data);
                // Clear form input values
                form.reset();
                // Redirect to login page
                window.location.href = '/login';
            })
            .catch(error => {
                console.error(error);
                // Display a user-friendly error message
                alert('Something went wrong. Please try again later.');
            });
    }
}


function displayErrorMessage(input, errorMsg) {
    const control = input.parentElement;
    const small = control.querySelector('.error-message');
    control.className = "input-box error";
    small.innerText = errorMsg;
}

function clearErrorMessage(input) {
    const control = input.parentElement;
    const small = control.querySelector('.error-message');
    control.className = "input-box success";
    small.innerText = ""; // Clear the error message
}
