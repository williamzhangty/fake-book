'use strict';

import { User , Subscriber } from './user.js';
  // Create a new Subscriber
const subscriber = new Subscriber(1, 'William Zhang', 'William', 'william@example.com', ['Page1', 'Page2'], ['Group1', 'Group2'], true);

document.getElementById('button').addEventListener('click', submitPost);

// Function to handle post submission
function submitPost() {
  const textInput = document.querySelector('#new-post textarea');
  const fileInput = document.querySelector('#new-post input[type="file"]');
  const postsContainer = document.getElementById('posts');
  const fileNameDisplay = document.getElementById('file-name-display');
  
  // Get the current date
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString(undefined, {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  // Create post element
  const post = document.createElement('div');
  post.className = 'post';
  if (textInput.value === '' && fileInput.value === '' ) {
      return;
  } else {
  post.innerHTML = `
    <div class="post-header">
      <div class="user-info flexbox">
        <img src="./assets/img/starwar.jpeg" alt="Profile Picture">
        <div class="user-name">${subscriber.name}</div>
      </div>
      <div class="post-date">${dateString}</div>
    </div>
    <div class="post-content">
      <p>${textInput.value}</p>
      ${fileInput.files.length ? `<img src="${URL.createObjectURL(fileInput.files[0])}" alt="Post Image">` : ''}
    </div>
  `;
  }

  // Insert the new post at the top of the posts container
  postsContainer.insertBefore(post, postsContainer.firstChild);

  // Clear inputs
  textInput.value = '';
  fileInput.value = '';
  fileNameDisplay.textContent = '';
}

document.getElementById('file-upload').addEventListener('change', displayFileName);

function displayFileName() {
  //alert(1);
  const input = document.getElementById('file-upload');
  const fileNameDisplay = document.getElementById('file-name-display');
  
  // Check if any file is selected
  if(input.files && input.files.length > 0) {
    fileNameDisplay.textContent = input.files[0].name;
  } else {
    fileNameDisplay.textContent = 'No file chosen';
  }
}

const modal = document.getElementById("myModal");
const icon = document.getElementById("icon");
const span = document.getElementsByClassName("close")[0];

document.addEventListener('DOMContentLoaded', function() {
  const icon = document.getElementById('icon');
  const modal = document.getElementById("myModal");
  const userInfo = subscriber.getInfo(); // Assuming `subscriber` is defined in your JS classes
  const modalInfo = document.getElementById("modal-info");
  
  icon.addEventListener('click', function() {
      modalInfo.innerHTML = 'Name: ' + userInfo.name + '<br>' +
      'Username: ' + userInfo.userName + '<br>' +
      'Email: ' + userInfo.email + '<br>' +
      'Pages: ' + userInfo.pages.join(', ') + '<br>' +
      'Groups: ' + userInfo.groups.join(', ') + '<br>' +
      'Can Monetize: ' + (userInfo.canMonetize ? 'Yes' : 'No');

      modal.style.display = "block";
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const close = document.getElementById('close');
  const modal = document.getElementById("myModal");
    
    close.addEventListener('click', function() {
        //alert(2);
        modal.style.display = "none";
    });
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}