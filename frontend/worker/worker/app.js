const searchBtn= document.getElementsByClassName("search-button");
const joblist =document.getElementById("Jobs");
let jopimg = document.createElement("img");
let jobnames =document.createElement("div");
    jobnames.setAttribute("class","job-name");
    jopimg.setAttribute("class","job-profile");
    jobnames.appendChild(jopimg);
    joblist.appendChild(jobnames);
let jobcard=document.createElement("div");
    jobcard.setAttribute("class","job-card");
    joblist.appendChild(jobcard);
let jobdetail =document.createElement("div");
    jobdetail.setAttribute("class","job-detail");
    jobnames.appendChild(jobdetail);
const jobname = document.createElement("h4");
    jobdetail.appendChild(jobname);
const compname = document.createElement("h3");
    jobdetail.appendChild(compname);
const detail =document.createElement("p");
    jobdetail.appendChild(detail);

let joblabel = document.createElement("div");
let links = document.createElement("a");
    joblabel.setAttribute("class","job-label");
    links.setAttribute("class","label-a");
    joblist.appendChild(joblabel);
    joblabel.appendChild(links);




//display all jop 
fetch("").then(response => response.json())
    .then(data=>{
        let jopimg=document.getElementsByClassName("job-profile");
        if(data.jops){
            data.jop.forEach(jop => {
                jobname.textContent(job.title);
                compname.textContent(job.company);
                detail.textContent(job.description);
                jopimg.setAttribute(src,jop.imgurl);
                links.textContent(job.industry);
            document.getElementsByClassName("job-posted").jop.time;
            })
}})
 

// for search 
searchBtn.addEventListener('click', getjoplist);
function getjoplist(){
    let jopimg = document.createElement("img");
    let jobcard=document.createElement("div");
    jopcard.setAttribute("class","job-card")

    let searchinnputtxt=document.getElementsByClassName("search-card").value;
    fetch("\\link of api with searchinnputtxt ").then(response => response.json())
    .then(data=>{
        if(data.jobs){
            data.jop.forEach(job => {
                jobname.textContent(job.title);
                compname.textContent(job.company);
                detail.textContent(job.description);
                jopimg.setAttribute(src,jop.imgurl);
                links.textContent(job.industry);
            document.getElementsByClassName("job-posted").jop.time;
            })
}})
}

// display company 
let compcard = document.createElement("a");
compcard.setAttribute("class","featured-card");
let compimg = document.createElement("img");
compimg.setAttribute("class","featured-image")
compcard.appendChild(compimg);
compcard.appendChild(compname);
async function company(){
    fetch().then(response => response.json())
    .then(data => {
        if (data.company){
           data.company.forEach(company =>{
            compimg.setAttribute("src",company.img);
            compname.textContent(company.name);
           })
        }
    })
}


//change navbav color

$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 150) {
            $(".navbar").css("background", "#222");
            $(".navbar").css("box-shadow", "rgba(0,0,0,0.1) 0px 4px 12px");
        }
        else {
            $(".navbar").css("background", "transparent");
            $(".navbar").css("box-shadow", "none");

        }

    })
});
//smooth scroll
var navbarHeight = $(".navbar").outeHeight();
$(".navbar-menu a").click(function (e) {
    var targetHref = $(this).attr("href");
    $("html,body").animate({
        scrollTop: $(targetHref).offset().top - navbarHeight
    }, 1000)
    e.preventDefault();
});




//navbar mobile version

const mobile = document.querySelector(".menu-toggle");
const mobileLink = document.querySelector(".navbar-menu");


mobile.addEventListener("click", function () {
    mobile.classList.toggle("is-active");
    mobileLink.classList.toggle("active");

})

mobileLink.addEventListener("click", function () {
    const menuBars = document.querySelector(".is-active");
    if (window.innerWidth <= 768 && menuBars) {
        mobile.classList.toggle("is-active");
        mobileLink.classList.remove("active");
    }

})