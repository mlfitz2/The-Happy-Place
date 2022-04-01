// new post modal functionality
const newPostModalControl = function(){
    const modal = document.getElementById('new-post-modal');
    const btn = document.getElementById('modal-btn');
    const span = document.querySelector('.modal-close');

    // When the user clicks the button, open the modal 
    btn.addEventListener('click', function() {
        modal.style.display = "block";
        document.getElementById('modal-blur').className = 'is-blurred';
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', function() {
        modal.style.display = "none";
        document.getElementById('modal-blur').className = '';
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('modal-blur').className = '';
        };
    });
};


// add a new post
const addPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-post-title').value.trim();
    const content = document.querySelector('#new-post').value.trim();
    const public = document.getElementById('new-post-public').checked;
    const errorMessage = document.querySelector('.error');

    if(content.length < 2 || title.length < 2) {
        errorMessage.style.display = "block";
        return;
    };

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content, public }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Post could not be added, please try again');
      }
    }

document.querySelector('#newPostForm').addEventListener('submit', addPost);

// if the user is logged in and therefore the modal button displays, add an event listener to it
window.addEventListener('load', function() {
    if(document.getElementById('modal-btn')) {
        newPostModalControl();
    }
});


// about the site modal functionality
const aboutModalControl = function(){
    const modal = document.getElementById('about-modal');
    const btn = document.querySelector('.help');
    const span = document.querySelector('.about-modal-close');

    // When the user clicks the button, open the modal 
    btn.addEventListener('click', function() {
        modal.style.display = "block";
        document.getElementById('modal-blur').className = 'is-blurred';
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', function() {
        modal.style.display = "none";
        document.getElementById('modal-blur').className = '';
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('modal-blur').className = '';
        };
    });
};


// event listener for the modal
window.addEventListener('load', aboutModalControl());