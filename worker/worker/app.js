
// for search 
const searchBtn= document.getElementsByClassName("search-button");
const joplist =document.getElementById("Jobs");
searchBtn.addEventListener('click', getjoplist);
function getjoplist(){
    let searchinnputtxt=document.getElementsByClassName("search-card").value.trim();
    fetch("").then(response => response.json())
    .then(data=>{
        let jopimg=document.getElementsByClassName("job-profile");
        let detail=""; 
        if(data.jops){
            data.jop.forEach(jop => {
                jopimg.setAttribute(src,jop.imgurl);
                 detail='<h4>${ jop.comname }</h4>'+
                '<h3>${jop.jopname }</h3>'+
                '<p>${jop.jopdetail}</p>'; });
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