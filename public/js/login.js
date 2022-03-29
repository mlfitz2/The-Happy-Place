const login = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript  
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const username = document.querySelector('#userName-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const errorMessage = document.querySelector('.error');
  
    if (username && password) {
      // Send the provided e-mail and password to the server
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('Login Successful');
        document.location.replace('/');
      } else {
        errorMessage.style.display = "block";
      }
    }
  };

  document.querySelector('#loginForm').addEventListener('submit', login);


const signUp = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Gather the data from the form elements on the page
    const username = document.querySelector('#userName-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('Signup Successful');
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector('#signUpForm').addEventListener('submit', signUp);