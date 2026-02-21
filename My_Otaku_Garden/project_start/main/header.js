// JavaScript code for hiding the preloader once the page is fully loaded
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
  });

//   document.addEventListener("DOMContentLoaded", function () {
//     const menuIcon = document.getElementById("menu-icon");
//     const nav = document.getElementById("nav");

//     menuIcon.addEventListener("click", function () {
//         nav.classList.toggle("active");
//     });
// });

// $(document).ready(function() {
// $("#menu-toggle").click(function() {
//     $(".nav").toggleClass("active");
// });
// });
    