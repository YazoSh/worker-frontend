const form =document.getElementById("post");
const jobname =form.querySelector("#joptitle");
const companyname=form.querySelector("#companyname");
const Workplacetype = form.querySelector('[name=Workplace-type]');
const joblocation =form.querySelector('#job-location');
const jobtypes = form.querySelector('[name=job-type]');
let workplace ;
let jobtype;
document.getElementsByName(button).addEventListener('click', setattibut());
Workplacetype.addEventListener('change', e => {
   Workplace = e.target.value; })
  
  jobtypes.addEventListener('change', e => {
  jobtype= e.target.value;})  
 function setattibut(){
jobname=jobname.value;
companyname=companyname.value;
joblocation =joblocation.value;
fetch('' , {
  method: 'POST',
  body: JSON.stringify({ 
    title : jobname,
    companyname:companyname,
    location:joblocation,
    Workplace:Workplacetype,
    jobtype:jobtype })  
})


 }


  

