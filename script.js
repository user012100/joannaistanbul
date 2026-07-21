(function () {
  function isImageTarget(el) {
    return el && el.tagName === "IMG";
  }

  document.addEventListener(
    "contextmenu",
    function (e) {
      if (isImageTarget(e.target)) {
        e.preventDefault();
      }
    },
    false
  );

  document.addEventListener(
    "dragstart",
    function (e) {
      if (isImageTarget(e.target)) {
        e.preventDefault();
      }
    },
    false
  );
})();

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

(function () {
  function isCoarseTouch() {
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  }

  function tapFlashMs() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return 120;
    }
    return 260;
  }

  function scheduleTapActive(el) {
    if (!el) return;
    el.classList.add("tap-active");
    clearTimeout(el._tapActiveTimer);
    el._tapActiveTimer = setTimeout(function () {
      el.classList.remove("tap-active");
      el._tapActiveTimer = null;
    }, tapFlashMs());
  }

  function blurSoon(el) {
    if (!el) return;
    window.requestAnimationFrame(function () {
      el.blur();
    });
  }

  function blurAfterPointerClick(el, e) {
    if (!el || !e) return;
    if (typeof e.detail === "number" && e.detail === 0) return;
    blurSoon(el);
  }

  function bindTapFeedback() {
    var brand = document.querySelector(".top-bar__brand");
    if (brand) {
      brand.addEventListener(
        "touchend",
        function () {
          scheduleTapActive(brand);
          blurSoon(brand);
        },
        { passive: true }
      );
      brand.addEventListener("click", function (e) {
        blurAfterPointerClick(brand, e);
      });
    }

    var navLinks = document.querySelectorAll(".top-bar__nav .top-bar__nav-link");
    for (var i = 0; i < navLinks.length; i++) {
      (function (link) {
        link.addEventListener(
          "touchend",
          function () {
            scheduleTapActive(link);
            blurSoon(link);
          },
          { passive: true }
        );
        link.addEventListener("click", function (e) {
          blurAfterPointerClick(link, e);
        });
      })(navLinks[i]);
    }

    var ctas = document.querySelectorAll("a.closing__label");
    for (var j = 0; j < ctas.length; j++) {
      (function (cta) {
        cta.addEventListener(
          "touchend",
          function () {
            scheduleTapActive(cta);
            blurSoon(cta);
          },
          { passive: true }
        );
        cta.addEventListener("click", function (e) {
          blurAfterPointerClick(cta, e);
        });
      })(ctas[j]);
    }

    var mapLinks = document.querySelectorAll(".info-strip__map-link");
    for (var k = 0; k < mapLinks.length; k++) {
      (function (mapLink) {
        mapLink.addEventListener(
          "touchend",
          function () {
            var wrap = mapLink.closest(".info-strip__address--map");
            scheduleTapActive(wrap);
            blurSoon(mapLink);
          },
          { passive: true }
        );
        mapLink.addEventListener("click", function (e) {
          blurAfterPointerClick(mapLink, e);
        });
      })(mapLinks[k]);
    }

    var phoneLink = document.querySelector(".info-label--phone a");
    if (phoneLink) {
      phoneLink.addEventListener(
        "touchend",
        function () {
          var pill = phoneLink.closest(".info-label--phone");
          scheduleTapActive(pill);
          blurSoon(phoneLink);
        },
        { passive: true }
      );
      phoneLink.addEventListener("click", function (e) {
        blurAfterPointerClick(phoneLink, e);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindTapFeedback);
  } else {
    bindTapFeedback();
  }
})();
