const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const signUpButton = document.getElementById('signUpButton')
const companyInput = document.getElementById('companyInput');

const inputFields = {
  email: {
    input: document.getElementById('emailInput'),
    errorContainer: document.getElementById('emailError'),
    validator: validateEmail,
    errorMessage: 'Email format is not correct',
  },
  password: {
    input: document.getElementById('passwordInput'),
    errorContainer: document.getElementById('passwordError'),
    validator: validatePassword,
    errorMessage: 'Password must be at least 8 characters',
  },
  firstName: {
    input: document.getElementById('firstNameInput'),
    errorContainer: document.getElementById('firstNameError'),
    validator: validateInputNotEmpty,
    errorMessage: 'This field cannot be empty',
  },
  lastName: {
    input: document.getElementById('lastNameInput'),
    errorContainer: document.getElementById('lastNameError'),
    validator: validateInputNotEmpty,
    errorMessage: 'This field cannot be empty',
  },
};

for (const field of Object.values(inputFields)) {
  const errorContainer = field.errorContainer;

  field.input.addEventListener('blur', () => {
    const value = field.input.value;

    if (field.validator(value)) {
      clearError(errorContainer);
    } else {
      displayError(errorContainer, field.errorMessage);
    }
  });

  field.input.addEventListener('input', () => {
    const value = field.input.value;

    if (field.validator(value)) {
      clearError(errorContainer);
    }
  });
}

function clearError(errorContainer) {
  errorContainer.innerText = '';
}

function displayError(errorContainer, message) {
  errorContainer.innerText = message;
}

function validateEmail(valueToCheck) {
  return EMAIL_REGEXP.test(valueToCheck);
}

function validatePassword(valueToCheck) {
  return valueToCheck.length >= 8;
}

function validateInputNotEmpty(valueToCheck) {
  return !(valueToCheck.trim() === '');
}

signUpButton.addEventListener('click', (event) => {
  if (validateAllInputs()) {
    const userData = {
      email: inputFields.email.input.value,
      password: inputFields.password.input.value,
      firstName: inputFields.firstName.input.value,
      lastName: inputFields.lastName.input.value,
      company: companyInput.value,
    };
    alert("userData: "+JSON.stringify(userData));
  } else {
    event.preventDefault();
  }
});

function validateAllInputs() {
  let check = true;
  for (const field of Object.values(inputFields)) {
    const value = field.input.value;
    const errorContainer = field.errorContainer;

    if (!field.validator(value)) {
      check = false;
      displayError(errorContainer, field.errorMessage);
    }
  }
  return check;
}
