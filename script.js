// DOM Elements
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const passwordField = document.getElementById('password');
const lengthInput = document.getElementById('length');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');

// Character sets
const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]\\:;?><,./-';

// Generate password
function generatePassword() {
  let length = parseInt(lengthInput.value);
  let charSet = '';
  let password = '';
  
  // Validate length
  if (isNaN(length) || length < 8 || length > 32) {
    alert('Please enter a valid length between 8 and 32');
    return;
  }
  
  // Build character set based on selected options
  if (uppercaseCheck.checked) charSet += upperChars;
  if (lowercaseCheck.checked) charSet += lowerChars;
  if (numbersCheck.checked) charSet += numberChars;
  if (symbolsCheck.checked) charSet += symbolChars;
  
  // Check at least one option is selected
  if (charSet.length === 0) {
    alert('Please select at least one character type');
    return;
  }
  
  // Generate password using cryptographically secure random values
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += charSet[array[i] % charSet.length];
  }
  
  passwordField.value = password;
}

// Copy password to clipboard
function copyToClipboard() {
  passwordField.select();
  document.execCommand('copy');
  
  // Visual feedback
  const originalText = copyBtn.textContent;
  copyBtn.textContent = 'Copied!';
  setTimeout(() => {
    copyBtn.textContent = originalText;
  }, 2000);
}

// Event listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);