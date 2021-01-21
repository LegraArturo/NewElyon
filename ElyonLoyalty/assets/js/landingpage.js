/*!
    * Start Bootstrap - Creative v6.0.1 (https://startbootstrap.com/themes/creative)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-creative/blob/master/LICENSE)
    */
(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 72)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 75
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-scrolled");
            document.getElementById("imgLogo").src = "/Imagenes/logo.png";
            document.getElementById("imgLogo").style.maxWidth = "180px";

        } else {
            $("#mainNav").removeClass("navbar-scrolled");
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                document.getElementById("imgLogo").src = "/Imagenes/logo.png";
                document.getElementById("imgLogo").style.maxWidth = "180px";
            } else {
                document.getElementById("imgLogo").src = "/Imagenes/logoBlanco.png";
                document.getElementById("imgLogo").style.maxWidth = "250px";
            }

        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Magnific popup calls
    $('#portfolio').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });
    var getData = function () {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/UI/Vacancias/VacanciasDet.asmx/getDataDb",
            dataType: "json",
            success: function (data) {
                if (data.d === "") {
                    return;
                }
                var miObjeto = data;
                var html = "";
                try {
                    if (data.d !== "[{resultado: 'No'}]") {

                        for (var propiedad in miObjeto) {
                            if (miObjeto.hasOwnProperty(propiedad)) {
                                var datos = JSON.parse(miObjeto[propiedad]);

                                datos.forEach(function (item) {
                                    var items = Object.keys(item);

                                    items.forEach(function (key) {
                                        if (key === "TOTAL")
                                            document.getElementById("lblProc").innerHTML = item[key];
                                        if (key === "CERRADOS")
                                            document.getElementById("lblCerrados").innerHTML = item[key];
                                        if (key === "POSICIONES")
                                            document.getElementById("lblPosc").innerHTML = item[key];
                                        if (key === "CV")
                                            document.getElementById("lblCand").innerHTML = item[key];
                                    });
                                });
                            }
                        }
                    }

                } catch (ex) {
                    alert("Ups! surgio un problema al cargar las listas: " + ex);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }
    getData();

})(jQuery); // End of use strict
