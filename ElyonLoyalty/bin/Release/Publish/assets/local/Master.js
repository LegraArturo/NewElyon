$(document).ready(function () {
    startTiming();
    cabecera();
    menuList('', 'S');
    piePagina();
 
});
function startTiming() {
    $.ajax({
        url: "/UI/GetDataWS.asmx/CheckLogin",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: "{}",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                getData(false);
            }
        },
        error: function (response) {
            alert(response.d);
        }
    });
}
function cabecera() {
    var cab = '<div class="page-header-inner">' +
        '<div class="page-logo">' +
        '<a href="/ui/index.html">' +
        ' <img src="/Img/newElyon.png" alt="logo" style="max-width: 130px;" class="logo-default" />' +
        '</a><div class="menu-toggler sidebar-toggler"></div>' +
        '</div> <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"></a>' +
        '<div class="page-top">' +
        '<form class="search-form" action="/ui/misc/extra_search.html" method="GET">' +
        '<div class="input-group">' +
        '<input type="text" class="form-control input-sm" placeholder="Buscar..." name="query">' +
        '<span class="input-group-btn">' +
        '<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>' +
        '</span>' +
        '</div>' +
        '</form>' +
        '<div class="top-menu">' +
        '<ul class="nav navbar-nav pull-right">' +
        '<li class="separator hide">' +
        '</li>' +
        '<li class="dropdown dropdown-user dropdown-dark">' +
        '<a href="javascript:;" id="img_home" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">' +
        '</a>' +
        '<ul class="dropdown-menu dropdown-menu-default">' +
        '<li>' +
        '<a href="javascript:sessionLogout()">' +
        '<i class="icon-key"></i> Cerrar Sesion </a>' +
        '</li>' +
        '</ul>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>';

    $('.page-header').append(cab);

    getUserData();
}
function sessionLogout() {
    localStorage.setItem("txtUsuario", "");
    localStorage.setItem("txtPass", "");
    localStorage.setItem("usuGrupoID", "");
    localStorage.setItem("foto", "");
    localStorage.setItem("user", "");
    localStorage.setItem("pass", "");
    localStorage.setItem("usuID", "");
    window.location.href = "/Login.aspx";
}
function menuList(txtFind, type) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _type: type,
            _find: txtFind
        }),
        url: "/UI/GetDataWS.asmx/getMenuList",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                return;
            }
            var result = [];
            var dataSet = [];
            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var cabecera = mytables["Table"];
                    var detalles = mytables["Table1"];


                    var collapse = document.createElement('div');
                    collapse.className = "page-sidebar navbar-collapse collapse";
                    var menu = document.createElement('ul');
                    menu.className = "page-sidebar-menu page-sidebar-menu-hover-submenu";

                    collapse.appendChild(menu);

                    for (cab = 0; cab < cabecera.length; cab++) {

                        var cabLI = document.createElement('li')

                        var cabA = document.createElement('a');
                        cabA.href = cabecera[cab]["form"];
                        if (cabecera[cab]["nuevaPestana"] === 'S')
                            cabA.target = "_blank";
                        cabLI.appendChild(cabA);

                        var cabI = document.createElement('i');
                        cabI.className = cabecera[cab]["icon"];
                        cabA.appendChild(cabI);

                        var cabSpan = document.createElement('span');
                        cabSpan.textContent = cabecera[cab]["Nombre"];
                        cabA.appendChild(cabSpan);

                        var x = detalles.filter(function (item) {
                            return item.Grupo == cabecera[cab]["id"];
                        });

                        if (x.length > 0) {
                            var arrow = document.createElement('span');
                            arrow.className = "arrow";
                            cabA.appendChild(arrow);

                            var submenu = document.createElement('ul');
                            submenu.className = "sub-menu";
                            cabLI.appendChild(submenu);


                            for (det = 0; det < x.length; det++) {
                                
                                var detLI = document.createElement('li')
                                submenu.appendChild(detLI);

                                var detA = document.createElement('a');
                                detA.href = x[det]["form"];
                                if (x[det]["nuevaPestana"] === 'S')
                                    detA.target = "_blank";
                                detLI.appendChild(detA);

                                var detI = document.createElement('i');
                                detI.className = x[det]["icon"];
                                detA.appendChild(detI);

                                var detSpan = document.createElement('span');
                                detSpan.textContent = x[det]["Nombre"];
                                detA.appendChild(detSpan);

                            }
                        }
                      
                        menu.appendChild(cabLI);
                    }

                    $('.page-sidebar-wrapper').html(collapse);
                    //var path = window.location.pathname;
                    //var page = path.split("/").pop();
                    //$('.page-sidebar ul li').find('a').each(function () {
                    //    var link = new regexp($(this).attr('href'));
                    //    if (link.test(document.location.href)) {
                    //        if (!$(this).parents().hasclass('active')) {
                    //            $(this).parents('li').addclass('open');
                    //            $(this).parents().addclass("active");
                    //            $(this).addclass("active");
                    //        }
                    //    }
                    //});
                    //$('.page-sidebar-menu ul li').find('a').each(function () {
                    //    var link = new regexp($(this).attr('href'));
                    //    if (link.test(document.location.href)) {
                    //        if (!$(this).parents().hasclass('active')) {
                    //            $(this).parents('li').find('span').each(function () {
                                     
                    //                $(this).addclass('open');
                    //            });
                    //            $(this).parents('li').addclass('open');
                    //            $(this).parents().addclass("active");
                    //            $(this).addclass("active");
                    //        }
                    //    }
                    //});
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}
 
function piePagina() {
    var date = new Date();

    var pie = '<div class="page-footer-inner">' +
        date.getFullYear() + ' &copy;LEGRA SRL' +
        '</div> ' +
        '<div class="scroll-to-top"> ' +
        '<i class="icon-arrow-up"></i> ' +
        '</div>';

    $('.page-footer').append(pie);

}
function getUserData() {
    var nombre = localStorage.getItem("nombres");
    var foto = localStorage.getItem("foto");

    var test = '<span class="username username-hide-on-mobile">' + nombre + ' </span>';
    $('#img_home').append(test);

    var img = new Image();
    img.id = "miImagen";
    img.src = foto;
    img.className = "img-circle";
    img_home.appendChild(img);//agrega hijos
}