document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('errorMessage');

  const validUsers = [
    'standard_user',
    'locked_out_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
  ];
  const validPassword = 'secret_sauce';

  errorMessage.textContent = '';

  if (username === '') {
    errorMessage.textContent = 'Epic sadface: Username is required';
    return;
  }

  if (password === '') {
    errorMessage.textContent = 'Epic sadface: Password is required';
    return;
  }

  if (!validUsers.includes(username)) {
    errorMessage.textContent = 'Epic sadface: Username and password do not match any user in this service';
    return;
  }

  if (password !== validPassword) {
    errorMessage.textContent = 'Epic sadface: Username and password do not match any user in this service';
    return;
  }

  if (username === 'locked_out_user') {
    errorMessage.textContent = 'Epic sadface: Sorry, this user has been locked out.';
    return;
  }

  // Login exitoso
  sessionStorage.setItem('loggedUser', username);
  window.location.href = 'inventory.html';
});