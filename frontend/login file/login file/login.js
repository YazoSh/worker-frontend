const form = document.getElementsByClassName("signinform");
const btn = document.getElementsByClassName("btn");
btn.addEventListener("click", handleFormSubmit(click));


function handleFormSubmit(event) {
    event.preventDefault(); 
    
    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('passowred', document.getElementById('passowred').value);
  
    
    fetch('', {
      method: 'POST',
      body: formData
    })
    .then(response => {
        
    
    })
    .catch(error => {
   
    });
  }


