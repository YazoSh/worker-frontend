const firstname = document.getElementsByClassName("firstname").value;
const lastname = document.getElementsByClassName("lastname").value;
const username= document.getElementsByClassName("username").value;
const email =document.getElementsByClassName("email").value;
const phonenumber = document.getElementsByClassName("phonenumber").value;
const password =document.getElementsByClassName("password").value;
const confpas =document.getElementsByClassName("conpas").value;

function cheackname(firstname){
  for(var i =0 ;i < firstname.length ; i++){
   if((firstname.charAt(i) > 65 && firstname.charAt(i) < 90 ) || (firstname.charAt(i)>97 && firstname.charAt(i) <122)){
    document.getElementsByClassName("firstname").style.border="green";
   }
  else {
    document.getElementsByClassName("firstname").style.border="red";}}
  for(var i =0 ;i < lastname.length ; i++){
    if((lastname.charAt(i) > 65 && lastname.charAt(i) < 90 ) || (lastname.charAt(i)>97 && lastname.charAt(i) <122)){
        fetch('' , {
            method: 'POST',
            body: JSON.stringify({ name: firstname,lastname})  
          })}else {
     document.getElementsByClassName("lastname").style.border="red";
   }}
   fetch().then(response => response.json()).then( users =>{
    for(var i =0 ;i < users.length ; i++){
    if((users.username.localeCompare(username)) === 0 ){
     document.getElementsByClassName("firstname").style.border="green"; }
   else {
     document.getElementsByClassName("firstname").style.border="red";}}})
}
