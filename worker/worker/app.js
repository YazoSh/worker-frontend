

async function addjop(){
let getdiv = document.querySelector("section .job-list");
let jopip = '';
fetch(jopip)
.then(response=>response.json())
.then(responseJson=>{

    let jopcard=document.createElement("div");
    let jopname=document.createElement("div");
    let jopimg = document.createElement("img");
    let jopdetail=document.createElement("div");
    let compheader=document.createElement("h4");
    let jopheader =document.createElement("h3");
    let jopdesc=document.createElement("p");
    let joplabel =document.createElement("div");
    let 


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