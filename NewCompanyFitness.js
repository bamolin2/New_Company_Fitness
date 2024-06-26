// Guessing game js
        document.addEventListener('DOMContentLoaded', function() {
            const mainPageButton = document.getElementById('backToMainPage');
            if (mainPageButton) {
                mainPageButton.addEventListener('click', function() {
                    window.location.href = 'index.html';
                });
            }

            const guessButton = document.getElementById('guessButton');
            const resultMessage = document.getElementById('resultMessage');

            if (guessButton && resultMessage) {
                guessButton.addEventListener('click', function() {
                    const userGuess = parseInt(document.getElementById('userGuess').value);

                    if (!checkUserInput(userGuess)) {
                        console.log("User guess is : ", userGuess);
                        resultMessage.textContent = 'Please enter a number between 1 and 10.';
                        resultMessage.style.display = 'block';
                    } else {
                        let randomNumber = generateRandomNumber();
                        console.log("User guess is : ", userGuess);
                        console.log("Randon number is : ", randomNumber);
                        if (userGuess === randomNumber) {
                            resultMessage.textContent = 'Congratulations! You guessed the correct number!';
                            resultMessage.classList.add('success-message');
                        } else {
                            resultMessage.textContent = `Sorry, that's not correct. The correct number was ${randomNumber}.`;
                            resultMessage.classList.remove('success-message');
                        }
                        resultMessage.style.display = 'block';
                        randomNumber = generateRandomNumber();
                    }
                });
            }

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

    // contact form

    document.addEventListener('DOMContentLoaded', function() {
        // empty to start
        const users = [

        ];
        console.log("USER ARRAY: ", users);

        const myGameButton = document.getElementById('myGameButton');
        if (myGameButton) {
            myGameButton.addEventListener('click', function() {
                window.location.href = 'myGame.html';
            });
        }

        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
                            
            if (validateForm()) {
                let user = buildUserObject();
                users.push(user);
                displaySuccessMessage(user);
                console.log("USER ARRAY: ", users);
            }
        });
    });

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

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let boolean = emailPattern.test(email);
        console.log("The email regex pattern match was: " + boolean);
        return boolean;
    }
    
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
