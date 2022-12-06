var testAccount = [
  {
    username: "admin",
    password: "admin"
  }
]
function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document.querySelector("#linkCreateAccount").addEventListener("click", e => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
  });

  document.querySelector("#linkLogin").addEventListener("click", e => {
      e.preventDefault();
      loginForm.classList.remove("form--hidden");
      createAccountForm.classList.add("form--hidden");
  });

  loginForm.addEventListener("submit", e => {
      e.preventDefault();

      // Perform your AJAX/Fetch login
      if(username == "admin" && password == "admin") 
      {setFormMessage(loginForm, "success", "Bạn đang được đăng nhập!");
      console.log("logged in")
    }else {setFormMessage(loginForm, "error", "Sai username/password, vui lòng nhập lại!"); }
});

  document.querySelectorAll(".form__input").forEach(inputElement => {
      inputElement.addEventListener("blur", e => {
          if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
              setInputError(inputElement, "Username must be at least 10 characters in length");
          }
      });

      inputElement.addEventListener("input", e => {
          clearInputError(inputElement);
      });
  });
});


var firebaseConfig = {
  apiKey: "AIzaSyDvKfYsDPCFB1ZNIXIoJM7-7sM6BsSG2EY",
  authDomain: "jacky-3802e.firebaseapp.com",
  projectId: "jacky-3802e",
  storageBucket: "jacky-3802e.appspot.com",
  messagingSenderId: "131268859572",
  appId: "1:131268859572:web:ceeb9038cdc8d173b269e1",
  measurementId: "G-KM53CM1M34"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  password_2 = document.getElementById('password_2').value
  jacky_code = document.getElementById('jacky_code').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false || validate_field(full_name) == false || validate_field(password_2) == false) {
    alert('Bạn chưa điền đủ thông tin.')
    return
    // Don't continue running the code
  }
  if (password != password_2) {
    alert('2 Mật khẩu không giống nhau')
    return
  }
  if (password.length < 6) {
    alert('Mật khẩu phải chứa từ 6 chữ số trở lên!')
    return
  }
  // if (jacky_code != "JGPS438") {
  //   alert('Mã của thiết bị sai! Vui lòng nhập lại')
  // }
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      jacky_code : jacky_code,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}