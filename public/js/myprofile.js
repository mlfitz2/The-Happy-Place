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

  


// update a post
const updatePost = async (event) => {
    event.preventDefault();

    const postId = event.target.dataset.id;
    const title = document.getElementById(`${postId}-title`).textContent;
    const content = document.getElementById(`${postId}-body`).textContent;
    const public = document.getElementById(`${postId}-public`).checked;
        
    const response = await fetch(`/api/post/${postId}`, {
         method: 'PUT',
         body: JSON.stringify({ title, content, public }),
         headers: { 'Content-Type': 'application/json' }
       });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Post could not be updated, please try again');
      }
    }

document.querySelectorAll('.post-update').forEach(function(btn) {
    btn.addEventListener('click', updatePost)
});


// delete a post

const deletePost = async (event) => {
    event.preventDefault();

    const postId = event.target.dataset.id
        
    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Post could not be deleted, please try again');
      }
    }

document.querySelectorAll('.post-delete').forEach(function(btn) {
    btn.addEventListener('click', deletePost)
    });


// update a user
const updateUser = async (event) => {
  console.log(event.target)
  event.preventDefault();

  const bio = document.getElementById(`bio-body`).textContent;
  
  const response = await fetch(`/api/profile/${event.target.dataset.user}`, {
       method: 'PUT',
       body: JSON.stringify({ bio }),
       headers: { 'Content-Type': 'application/json' }
     });
    
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Profile could not be updated, please try again');
    };
};

document.getElementById('bio-btn').addEventListener('click', updateUser);