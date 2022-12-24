const form =document.getElementById("post");
const jopname =form.querySelector("#joptitle");
const companyname=form.querySelector("#companyname");
const Workplacetype = form.querySelector('[name=Workplace-type]');
const joblocation =form.querySelector('#job-location');
const jobtype = form.querySelector('[name=job-type]');

Workplacetype.addEventListener('change', e => {
  const Workplace = e.target.value; 
  
  jobtype.addEventListener('change', e => {
 const jobtype= e.target.value;

    fetch('', {
      method: 'POST',
      body: JSON.stringify({ 
        title = jopname,


       })  
    })
  });
});

