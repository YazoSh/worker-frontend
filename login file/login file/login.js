let usrename=document.querySelector('.input-field input');
let password=document.querySelector('.input-field input');
let getbutt=document.querySelector('.btn input');

getbutt.addEventListener=function(){
    checkfiled();
};

function checkfiled (){
     if(usrename.value=="" || password.value==""){
     alert("there is missing plase fill all filde")
    }
     

}


