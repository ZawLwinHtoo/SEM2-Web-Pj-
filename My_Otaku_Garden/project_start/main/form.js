const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

let email = document.getElementById('reqemail').value;
let password = document.getElementById('reqpassword').value;
let mockUserName = localStorage.getItem("username");
let mockPassword = localStorage.getItem("password");
let mockUser_Email = localStorage.getItem("email");

let isLoggedIn = false;

 function loginsub(){
console.log(email, password, mockUserName, mockPassword, mockUser_Email);
// if (mockUser_Email === email &&
         // mockPassword === password) {
         // isLoggedIn = true; 
          alert("Login success!");
          document.location.href = "c:/xampp/htdocs/project_start/main/home.html";}
          //else {
           // alert("Login failure!");
          //}
//Alert
        
        //}

        document.getElementById('submit').addEventListener('click', function (e) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email format

          const email = document.getElementById('email').value.trim();

          let isValid = true;
          if   (email === '') {
            alert('Please fill in all required fields.');
            isValid = false;
          }

          if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            isValid = false;
          }
          if (isValid) {
            alert('Account Created Successfully');
          } else {
            e.preventDefault(); // Prevent form submission
          }
        });