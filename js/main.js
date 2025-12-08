(function ($) {
    "use strict";

    // Spinner
    window.addEventListener('load', function() {
        const spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.style.transition = 'opacity 0.5s ease';
            spinner.style.opacity = '0';
            setTimeout(function() {
                spinner.style.display = 'none';
            }, 500);
        }
    });

    // Initiate WOW.js
    new WOW().init();

   // Sticky Navbar
$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('.sticky-top').addClass('shadow-sm').css('top', '0px');
    } else {
        $('.sticky-top').removeClass('shadow-sm').css('top', '-200px');
    }
});

// Navbar + Logo change au scroll
$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.navbar').addClass('scrolled');
        $('#logo').attr('src', '/img/logo-gsa-modified.svg');
    } else {
        $('.navbar').removeClass('scrolled');
        $('#logo').attr('src', '/img/colorkit (2).svg');
    }
});
// ✅ Correction du retard → on force l’état correct dès le load
$(window).trigger('scroll');  

    // Testimonials carousel (OwlCarousel)
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{ items:1 },
            576:{ items:1 },
            768:{ items:1 },
            992:{ items:2 },
            1200:{ items:2 }
        }
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Secteur : rotation automatique des mots-clés
    const keywords = document.querySelectorAll(".txt-rotate-keyword");
    let current = 0;
    function showNextKeyword() {
        keywords[current].classList.remove("active");
        current = (current + 1) % keywords.length;
        keywords[current].classList.add("active");
    }
    if (keywords.length > 0) {
        keywords[current].classList.add("active");
        setInterval(showNextKeyword, 2500);
    }

    // Allow "Services" to act as link AND dropdown
    $('.nav-item.dropdown > a.nav-link').on('click', function (e) {
        var href = $(this).attr('href');
        if (href && href !== '#') {
            window.location.href = href;
        }
    });

    // Bootstrap Carousel (plein écran)
    document.addEventListener('DOMContentLoaded', function () {
        var el = document.getElementById('carouselId');
        if (el) {
            var instance = bootstrap.Carousel.getInstance(el);
            if (instance) instance.dispose();
            var carousel = new bootstrap.Carousel(el, { interval: 7000, wrap: true });
            carousel.cycle();
        }
    });

    // ✅ ScrollSpy manuel pour navbar active
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar .nav-link');

    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY + 140; // offset si navbar fixe
        sections.forEach(sec => {
            if(scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight){
                navLinks.forEach(link => link.classList.remove('active'));
                const id = sec.getAttribute('id');
                const activeLink = document.querySelector('.navbar .nav-link[href="#'+id+'"]');
                if(activeLink) activeLink.classList.add('active');
            }
        });
    });
   // document.addEventListener("DOMContentLoaded", function () {
  if (typeof bootstrap === "undefined") {
    console.warn("Bootstrap JS non chargé — le script de menu mobile ne fonctionnera pas.");
    return;
  }

  

   const navbarCollapse = document.getElementById("navbarCollapse");
if (!navbarCollapse) return;
const navbarToggler = document.querySelector(".navbar-toggler");



// 🔒 Toujours forcer menu fermé au départ (évite le bug du 1er clic dehors)
navbarCollapse.classList.remove("show");
if (navbarToggler) {
  navbarToggler.classList.add("collapsed");
  navbarToggler.setAttribute("aria-expanded", "false");
} // 
  const dropdownToggles = navbarCollapse.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth > 991) return; // seulement mobile

      e.preventDefault();
      e.stopImmediatePropagation(); // <-- IMPORTANT : bloque les autres handlers (Bootstrap inclus)

      const parent = this.closest(".dropdown");
      const menu = parent.querySelector(".dropdown-menu");
      const isOpen = parent.classList.contains("show");

      if (isOpen) {
        // fermer celui-ci
        parent.classList.remove("show");
        menu.classList.remove("show");
      } else {
        // fermer les autres puis ouvrir celui-ci
        navbarCollapse.querySelectorAll(".dropdown.show").forEach(opened => {
          opened.classList.remove("show");
          opened.querySelector(".dropdown-menu")?.classList.remove("show");
        });
        parent.classList.add("show");
        menu.classList.add("show");
      }
    });
  });

  // Fermer le menu mobile quand on clique sur un lien normal (non-dropdown)
// Fermer le menu mobile quand on clique sur un lien (sauf dropdown)
navbarCollapse.addEventListener("click", function (e) {
  if (window.innerWidth > 991) return;

  const link = e.target.closest("a");
  if (!link) return;

  // Si c’est un dropdown toggle → on ne ferme pas
  if (link.classList.contains("dropdown-toggle") || 
      link.getAttribute("data-bs-toggle") === "dropdown") {
    return;
  }

   // Sinon → on ferme le menu
  bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
});

// ✅ Fermer les dropdowns même si clic dedans (vide), dehors ou re-clic
document.addEventListener("click", function (e) {
  if (window.innerWidth > 991) return; // seulement mobile

  const isInsideNavbar = e.target.closest("#navbarCollapse");
  const isDropdownToggle = e.target.closest(".dropdown-toggle");

  // Cas 1 : clic en dehors du menu
  if (!isInsideNavbar) {
    closeAllDropdowns();
    return;
  }

  // Cas 2 : clic dans le menu mais pas sur un lien (vide)
  if (isInsideNavbar && !e.target.closest("a")) {
    closeAllDropdowns();
    return;
  }

  // Cas 3 : clic sur un toggle déjà ouvert → refermer
  if (isDropdownToggle) {
    const parent = isDropdownToggle.closest(".dropdown");
    if (parent && parent.classList.contains("show")) {
      closeAllDropdowns();
      return;
    }
  }
});

// 🔧 Fonction utilitaire pour tout fermer proprement
function closeAllDropdowns() {
  navbarCollapse.querySelectorAll(".dropdown.show").forEach(opened => {
    opened.classList.remove("show");
    opened.querySelector(".dropdown-menu")?.classList.remove("show");
    opened.querySelector(".dropdown-toggle")?.classList.remove("active"); // enlève l’orange
  });
}
// === Mobile : bouton + / - pour ouvrir les dropdowns ===
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const dropdown = btn.closest('.nav-item').querySelector('.dropdown-menu');

        dropdown.classList.toggle('show');
        btn.textContent = dropdown.classList.contains('show') ? '-' : '+';
    });
});

// === Fermer automatiquement les dropdowns quand on scrolle ===
document.addEventListener("scroll", () => {
    document.querySelectorAll(".dropdown-menu.show").forEach(menu => {
        menu.classList.remove("show");

        const btn = menu.closest('.nav-item').querySelector('.toggle-btn');
        if (btn) btn.textContent = '+';
    });
});

})(jQuery);
