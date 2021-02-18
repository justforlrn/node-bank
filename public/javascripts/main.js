var password = document.getElementById('user-password');
var retypePassword = document.getElementById('user-retype-password');

function validatePassword() {
  if (password.value != retypePassword.value) {
    retypePassword.setCustomValidity('Passwords do not match');
  } else retypePassword.setCustomValidity('');
}

password.onchange = validatePassword;
retypePassword.onchange = validatePassword;
