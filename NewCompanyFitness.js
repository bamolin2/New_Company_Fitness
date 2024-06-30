"use strict";
    // contact form

    document.addEventListener('DOMContentLoaded', function() {
        // empty to start
        const users = [

        ];
        console.log("USER ARRAY: ", users);
        //redirect to my game html
        const myGameButton = document.getElementById('myGameButton');
        if (myGameButton) {
            myGameButton.addEventListener('click', function() {
                window.location.href = 'myGame.html';
            });
        }
        //grab form
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function(event) {
            //prevent default form submission
            event.preventDefault();
                           
            //if validations pass, build user object
            if (validateForm()) {
                let user = buildUserObject();
                // add user to user array
                users.push(user);
                displaySuccessMessage(user);
                console.log("USER ARRAY: ", users);
            }
        });
    });
// grab all of the elements
    function validateForm() {
        const name = document.getElementById('name').value;
        const comments = document.getElementById('comments').value;
        const email = document.getElementById('EmailField').value;
        const phone = document.getElementById('PhoneField').value;
        const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;

        let validFields = true;

        if (!name) {
            showError('nameError');
            validFields = false;
        } else {
            hideError('nameError');
        }
        if (!comments) {
            showError('commentsError');
            validFields = false;
        } else {
            hideError('commentsError');
        }
        if (!validatePhone(phone)) {
            showError('validPhoneError');
            validFields = false;
        } else {
            hideError('validPhoneError');
        }
        if (!validateEmail(email)) {
            showError('validEmailError');
            validFields = false;
        } else {
            hideError('validEmailError');
        }
        
        return validFields;
    }
// use email regex to validate email
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let boolean = emailPattern.test(email);
        console.log("The email regex pattern match was: " + boolean);
        return boolean;
    }
    // use email regex to validate phone, must be ten digits
    function validatePhone(phone) {
        const phonePattern = /^\d{10}$/;
        let boolean = phonePattern.test(phone);
        console.log("The phone regex pattern match was: " + boolean);
        return boolean;
    }

    function showError(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            //give the error message its own line
            element.style.display = 'block';
            //give error message red color
            element.style.color = "red";
        }
    }

    function hideError(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = 'none';
        }
    }
// build the user object
    function buildUserObject() {
        const name = document.getElementById('name').value;
        const comments = document.getElementById('comments').value;
        const email = document.getElementById('EmailField').value;
        const phone = document.getElementById('PhoneField').value;
        const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;

        return {
            name,
            comments,
            email,
            phone,
            contactMethod
        };
    }
// display success message
    function displaySuccessMessage(user) {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            if (user.contactMethod === 'email') {
                successMessage.innerHTML = `Thank you, ${user.name}, for your submission! We will contact you at ${user.email} regarding your comments: ${user.comments}`;
            } else if (user.contactMethod === 'phone') {
                successMessage.innerHTML = `Thank you, ${user.name}, for your submission! We will contact you at ${user.phone} regarding your comments: ${user.comments}`;
            }
            successMessage.style.display = 'block';
        }
    }

    // Guessing game js
    document.addEventListener('DOMContentLoaded', function() {
        const mainPageButton = document.getElementById('backToMainPage');
        if (mainPageButton) {
            mainPageButton.addEventListener('click', function() {
                window.location.href = 'index.html';
            });
        }
//grab button by element id
        const guessButton = document.getElementById('guessButton');
        const resultMessage = document.getElementById('resultMessage');
        // if button and message are not null grab users guess
        if (guessButton && resultMessage) {
            guessButton.addEventListener('click', function() {
                const userGuess = parseInt(document.getElementById('userGuess').value);
                //Validate input
                if (!checkUserInput(userGuess)) {
                    console.log("User guess is : ", userGuess);
                    resultMessage.textContent = 'Please enter a number between 1 and 10.';
                    resultMessage.style.display = 'block';
                } else {
                    //user validation passed, generate random number, compare to user guess
                    let randomNumber = generateRandomNumber();
                    console.log("User guess is : ", userGuess);
                    console.log("Randon number is : ", randomNumber);
                    if (userGuess === randomNumber) {
                        resultMessage.textContent = 'Congratulations Winner! You guessed the correct number!';
                        resultMessage.classList.add('success-message');
                    } else {
                        resultMessage.textContent = `Sorry, that's not correct. The correct number was ${randomNumber}. Please try agin.`;
                        resultMessage.classList.remove('success-message');
                    }
                    resultMessage.style.display = 'block';
                    randomNumber = generateRandomNumber();
                }
            });
        }
//random number generator between 1-10 
        function generateRandomNumber() {
            return Math.floor(Math.random() * 10) + 1;
        }

        function checkUserInput(userGuess) {
            if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
                return false;
            }
            return true;
        }
    });