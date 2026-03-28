// Very small script: open/close mobile menu (smooth in-page scroll: scroll-behavior on html in CSS)

var menuButton = document.getElementById("menuToggle");
var siteNav = document.getElementById("siteNav");
var header = document.querySelector(".top-bar");

if (menuButton && header) {
  menuButton.addEventListener("click", function () {
    var isOpen = header.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

if (siteNav && header && menuButton) {
  var links = siteNav.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      header.classList.remove("nav-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    });
  }
}
