const form = document.getElementsByClassName("signinform");
const btn = document.getElementsByClassName("btn");
btn.addEventListener("click", handleFormSubmit(click));


function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('passowred', document.getElementById('passowred').value);
    cheack();
}
    
   function cheack (formData)(
    fetch('')
     .then(response => response.json())
     .then(users =>{
  for( var i=0 ; i < users.length ; i++){
    if (users[i].name === document.getElementById('username').value)
    if( users[i].passoerd === document.getElementById('passowred').value)
     alert("log in sucsseful");
  }}).catch(e=>{
   alert("cheack your passowerd and username");})


   )

 
