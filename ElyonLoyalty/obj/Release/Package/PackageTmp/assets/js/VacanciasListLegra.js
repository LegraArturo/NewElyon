jQuery(document).ready(function () {
    var idReg = getParameterByName("idReg");
    if (idReg === null || idReg === "") {
        document.getElementById("imgLogo").src = localStorage.getItem("logo");
    } else {
        if (localStorage.getItem("empID") != null && localStorage.getItem("empID") != "")
            getEmpInfo(idReg, 3);
    }

    Metronic.init();
    Layout.init();

    if (typeof (Worker) !== "undefined") {
        if (typeof (w) === "undefined") {
            w = new Worker(cargaDatos());
        }

    } else {
        alert("Ups tu navegador no soporta nuestros procesos");
    }
    $('.postulando-btn')
        .click(function () {
            var btn = $(this);
            btn.innerHTML = "Postulando...";
            btn.disabled = true;

            setTimeout(function () {
                btn.innerHTML = "Postulate!";
                btn.disabled = false;

            }, 4000);
        });
});
function getEmpInfo(myUrl, tipo) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ _url: myUrl, _tipo: tipo }),
        url: "/UI/Externo/ExternoWS.asmx/getEmpInfo",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;
            try {
                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);

                                items.forEach(function (key) {
                                    if (key === "idEmp") {
                                        localStorage.setItem("empID", item[key]);
                                    }
                                    if (key == "logo") {
                                        document.getElementById("imgLogo").src = item[key];
                                        localStorage.setItem("logo", item[key]);
                                    }
                                    if (key === "clientURL")
                                        localStorage.setItem("clientUrl", item[key]);
                                });
                            });

                        }
                    }
                }
            } catch (ex) {

                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: setDatosPersonales: " + ex);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);

        }
    });
}
function wait(show) {
    if (show)
        document.getElementById("pnlCarga").style.display = "block";
    else
        document.getElementById("pnlCarga").style.display = "none";
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function cargaDatos() {
    var idE = localStorage.getItem("empID");
    var regID = getParameterByName("idReg");

    if (regID === "" || regID === null) {
        ocultaPnl("block", "none");
    } else {
        detail(regID);
        document.getElementById("pnlCarga").style.display = "none";
        return;
    }

    cargaLista(idE);
    cargaMenu(idE);
}

function detail(regID) {
    document.getElementById("lblidReg").innerText = regID;
    var clientURL = localStorage.getItem("clientUrl") + "?vacanciaNro%3D" + regID;
    var enlaceFace = "https://www.facebook.com/plugins/share_button.php?href=" + clientURL + "&layout=button_count&size=small&mobile_iframe=true&appId=2093852374276468&width=91&height=20";
    $('#share').attr('src', enlaceFace);

    cargaVacDet(regID);
    ocultaPnl("none", "block");
}
function cargaLista(empID) {
    wait(true);
    var nroCI = "";
    if (localStorage.getItem("nroCI") !== null)
        nroCI = localStorage.getItem("nroCI");

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _empID: empID, _nroCI: nroCI
        }),
        url: "/UI/Externo/ExternoWS.asmx/getVacanciasList",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;
            var html = "";

            if (data.d != "[{resultado: 'No'}]") {
                localStorage.setItem("data", data.d);
                for (var propiedad in miObjeto) {
                    if (miObjeto.hasOwnProperty(propiedad)) {
                        var datos = JSON.parse(miObjeto[propiedad]);

                        datos.forEach(function (item) {
                            var items = Object.keys(item);
                            var id = "";
                            var Nombre = "";
                            var ubicacion = "";
                            var creado = "";
                            var contrato = "";
                            var Descripcion = "";
                            var enlace = "";
                            var ligado = "";

                            items.forEach(function (key) {
                                if (key == "vNombre")
                                    Nombre = item[key];
                                if (key == "vUbicacion")
                                    ubicacion = item[key];
                                if (key == "tiempo")
                                    contrato = item[key];
                                if (key == "vCabId") {
                                    id = item[key];
                                    enlace = "https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2F34.211.109.182%2FUI%2FPostulateExterno%2FEmpresasLogin.aspx%3FidReg%3D" + item[key] + "&layout=button_count&size=small&mobile_iframe=true&appId=2093852374276468&width=91&height=20";
                                }
                                if (key == "vDescPuesto")
                                    Descripcion = item[key];
                                if (key == "vFechaCreado")
                                    creado = item[key];
                                if (key == "ligado")
                                    ligado = item[key];

                            });
                            //Crea HTML
                            html += "<div class='timeline-item'><div class='timeline-badge'><img class='timeline-badge-userpic' src='../../assets/admin/pages/media/users/maletin.png'> ";
                            html += "</div><div class='timeline-body'><div class='timeline-body-arrow'></div><div class='timeline-body-head'><div class='timeline-body-head-caption'> ";
                            html += "<a href='javascript:;' class='timeline-body-title font-blue-madison'>" + Nombre + "</a><span class='timeline-body-time font-grey-cascade'>" + creado + "</span> ";
                            html += "</div><div class='timeline-body-head-actions'> ";
                            html += "<button type='button' onclick='Share(" + id + ");' class='btn blue btn-sm'>Comparte &nbsp; <i class='icon-share blue'></i></button>";
                            html += "</div></div><div class='timeline-body-content'><span class='font-grey-cascade'>" + Descripcion + "</span><hr /> <div class='timeline-footer pull-right'>";
                            if (nroCI == null || nroCI == "")
                                html += "<a  onclick='iniciarSesion()' class='btn blue-madison'>Debes Iniciar Sesion <i class='icon-login m-icon-white'></i></a>";
                            else {
                                if (ligado != 0)
                                    html += "<a disabled='disabled' class='btn default green-stripe'>Ya te Postulate a esta vacancia<i class='icon-check m-icon-white'></i></a>";
                                else
                                    html += "<label><button type='button' id='btnPost' onclick='preguntasEliminatorias(" + id + "," + empID + "," + nroCI + ")' data-loading-text='Postulando...' class='postulando-btn btn red-thunderbird'>Postulate! <i class='icon-badge m-icon-white'></i></button></label>";
                            }
                            html += "<a onclick='detail(" + id + ")' class='btn grey'>Leer Mas <i class='  m-icon-white'></i></a></div></div></div></div> ";
                        });
                        $('#timelineDiv').html(html);
                    }
                }
            }
            else {
                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: cargaLista");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);

        }
    });
    wait(false);
}
function cargaMenu(empID) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _empID: empID
        }),
        url: "/UI/Externo/ExternoWS.asmx/getMenuList",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;
            var html = "<ul class='nav nav-pills nav-stacked'>";
            var logo = "";
            if (data.d != "[{resultado: 'No'}]") {
                for (var propiedad in miObjeto) {
                    if (miObjeto.hasOwnProperty(propiedad)) {
                        var datos = JSON.parse(miObjeto[propiedad]);

                        datos.forEach(function (item) {
                            var items = Object.keys(item);
                            var id = "";
                            var AreaGeneral = "";
                            var cant = "";

                            items.forEach(function (key) {
                                if (key === "AreaGeneral")
                                    Nombre = item[key];
                                if (key === "cant")
                                    cant = item[key];
                                if (key === "idAreaGral")
                                    id = item[key];
                                if (key === "logo")
                                    logo = item[key];

                            });
                            //Crea HTML
                            html += "<li><a onclick='getDataFilter(" + id + ")'><span class='badge badge-success'>" + cant + " </span>" + Nombre + " </a></li> ";
                        });
                        html += "</ul>";
                        $('#menulist').html(html);
                        //$('#imgLogo').attr('src', logo);
                        // localStorage.setItem("logoUrl", logo);
                    }
                }
            }
            else {
                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: cargaMenu");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);

        }
    });
}
function cargaVacDet(vacID) {
    var nroCI = "";
    if (localStorage.getItem("nroCI") !== null)
        nroCI = localStorage.getItem("nroCI");
    var empID = localStorage.getItem("empID");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _vacID: vacID, _nroCI: nroCI
        }),
        url: "/UI/Externo/ExternoWS.asmx/getVancaciaDet",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;

            if (data.d != "[{resultado: 'No'}]") {
                for (var propiedad in miObjeto) {
                    if (miObjeto.hasOwnProperty(propiedad)) {
                        var datos = JSON.parse(miObjeto[propiedad]);

                        datos.forEach(function (item) {
                            var items = Object.keys(item);
                            var id = "";
                            var html = "";

                            items.forEach(function (key) {
                                if (key == "Empleo")
                                    document.getElementById("lblTitulo").innerHTML = item[key];
                                if (key == "ubicacion")
                                    document.getElementById("lblUbicacion").innerHTML = item[key];
                                if (key == "Tiempo")
                                    document.getElementById("lblotros").innerHTML = item[key];
                                if (key == "vDescPuesto")
                                    document.getElementById("lblDescPuesto").innerHTML = item[key];
                                if (key == "vDescRequisitos")
                                    document.getElementById("lblDescRequisitos").innerHTML = item[key];
                                if (key == "vDescBeneficio")
                                    document.getElementById("lblDescBeneficios").innerHTML = item[key];
                                if (key == "vFechaCreado")
                                    document.getElementById("lblFecha").innerHTML = item[key];
                                if (key == "empId")
                                    localStorage.getItem("empID");

                                if (key == "ligado") {
                                    if (nroCI == null || nroCI == "")
                                        html += "<a  onclick='iniciarSesion()' class='btn blue-madison'>Debes Iniciar Sesion <i class='icon-login m-icon-white'></i></a>";
                                    else {
                                        if (item[key] != 0)
                                            html += "<a disabled='disabled' class='btn default green-stripe'>Ya te Postulate a esta vacancia<i class='icon-check m-icon-white'></i></a>";
                                        else
                                            html += "<button id='btnPost2' type='button' onclick='preguntasEliminatorias(" + vacID + "," + empID + "," + nroCI + ")' data-loading-text='Postulando...' class='demo-loading-btn btn red-thunderbird'>Postulate! <i class='icon-badge m-icon-white'></i></button>";
                                    }
                                    $('#btnPostulate').html(html);
                                }

                            });
                        });
                    }
                }
            }
            else {
                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: cargaVacDet");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}
function ocultaPnl(lista, detale) {
    document.getElementById("pnlLista").style.display = lista;
    document.getElementById("pnlDetalle").style.display = detale;
}
function Share(regID, titulo) {
    document.getElementById('viewModal').click();
    $post_url = 'http://www.your-site.com/';

    var clientURL = localStorage.getItem("clientUrl") + "?vacanciaNro%3D" + regID;

    var enlaceFace = "https://www.facebook.com/plugins/share_button.php?href=" + clientURL + "&layout=button_count&size=small&mobile_iframe=true&appId=2093852374276468&width=91&height=20";
    $('#face').attr('src', enlaceFace);

    var enlaceWhats = 'https://api.whatsapp.com/send?text=Postulate%20a%20esta%20vacancia%20laboral%20diponible%20en%20' + clientURL;
    $('#whats').attr('href', enlaceWhats);

    // var linkUrl = "http://ec2-34-211-109-182.us-west-2.compute.amazonaws.com:55/UI/Externo/VacanciasList.aspx?idReg%3D" + regID;
    var enlaceLinkedin = 'https://www.linkedin.com/sharing/share-offsite/?url=' + clientURL;
    var htmlLinkedin = " <a  target='_blank' class='btn btn-default icon' href='" + enlaceLinkedin + "' title='Linkedin'><span class='character'> <button class='IN-38518a63-cfd6-49fa-a264-d7caa8a74fd4-1G9ISYhSF8XoOmdcl0yKDu'> <xdoor-icon aria-hidden='true'><svg viewBox='0 0 24 24' width='24px' height='24px' x='0' y='0' preserveAspectRatio='xMinYMin meet'> <g style='fill: currentColor'><rect x='-0.003' style='fill:none;' width='24' height='24'></rect><path style='' d='M20,2h-16c-1.1,0-2,0.9-2,2v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2zM8,19h-3v-9h3V19zM6.5,8.8C5.5,8.8,4.7,8,4.7,7s0.8-1.8,1.8-1.8S8.3,6,8.3,7S7.5,8.8,6.5,8.8zM19,19h-3v-4c0-1.4-0.6-2-1.5-2c-1.1,0-1.5,0.8-1.5,2.2V19h-3v-9h2.9v1.1c0.5-0.7,1.4-1.3,2.6-1.3c2.3,0,3.5,1.1,3.5,3.7V19z'></path></g></svg></xdoor-icon>Compartir</button></span></a>";
    var twitter = '<a target="_blank" href=http://twitter.com/share?text=Postulate%20a%20esta%20vacancia!%20blog&url=' + clientURL + ' target="_blank" title="Click to post to Twitter"><img src="../../Imagenes/tweet.png" /></a>';
    $('#twitter').html(twitter);
    $('#linkedin').html(htmlLinkedin);
}
function getDataFilter(val) {
    var data = localStorage.getItem("data");
    var nroCI = "";
    if (localStorage.getItem("nroCI") !== null)
        nroCI = localStorage.getItem("nroCI");
    var empID = localStorage.getItem("empID");
    var html = "";

    var d = JSON.parse(data);
    var x = d.filter(function (item) {
        return item.idAreaGral == val;
    });
    x.forEach(function (item) {
        var items = Object.keys(item);
        var id = "";
        var Nombre = "";
        var ubicacion = "";
        var creado = "";
        var contrato = "";
        var Descripcion = "";
        var enlace = "";

        items.forEach(function (key) {
            if (key == "vNombre")
                Nombre = item[key];
            if (key == "vUbicacion")
                ubicacion = item[key];
            if (key == "tiempo")
                contrato = item[key];
            if (key == "vCabId") {
                id = item[key];
                var clientURL = localStorage.getItem("clientUrl") + "?vacanciaNro%3D" + id;
                enlace = "https://www.facebook.com/plugins/share_button.php?href=" + clientURL + "&layout=button_count&size=small&mobile_iframe=true&appId=2093852374276468&width=91&height=20";
            }
            if (key == "vDescPuesto")
                Descripcion = item[key];
            if (key == "vFechaCreado")
                creado = item[key];
            if (key == "ligado")
                ligado = item[key];

        });
        //Crea HTML
        html += "<div class='timeline-item'><div class='timeline-badge'><img class='timeline-badge-userpic' src='../../assets/admin/pages/media/users/maletin.png'> ";
        html += "</div><div class='timeline-body'><div class='timeline-body-arrow'></div><div class='timeline-body-head'><div class='timeline-body-head-caption'> ";
        html += "<a href='javascript:;' class='timeline-body-title font-blue-madison'>" + Nombre + "</a><span class='timeline-body-time font-grey-cascade'>" + creado + "</span> ";
        html += "</div><div class='timeline-body-head-actions'> ";
        html += "<button type='button' onclick='Share(" + id + ");' class='btn blue btn-sm'>Comparte &nbsp; <i class='icon-share blue'></i></button>";
        html += "</div></div><div class='timeline-body-content'><span class='font-grey-cascade'>" + Descripcion + "</span><hr /> <div class='timeline-footer pull-right'>";
        if (nroCI == null || nroCI == "")
            html += "<a  onclick='iniciarSesion()' class='btn blue-madison'>Debes Iniciar Sesion <i class='icon-login m-icon-white'></i></a>";
        else {
            if (ligado != 0)
                html += "<a disabled='disabled' class='btn default green-stripe'>Ya te Postulate a esta vacancia<i class='icon-check m-icon-white'></i></a>";
            else
                html += "<button id='btnPost' onclick='preguntasEliminatorias(" + id + "," + empID + "," + nroCI + ")' data-loading-text='Postulando...' class='demo-loading-btn btn red-thunderbird'>Postulate! <i class='icon-badge m-icon-white'></i></button>";
        }
        html += "<a onclick='detail(" + id + ")' class='btn grey'>Leer Mas <i class='  m-icon-white'></i></a></div></div></div></div> ";

    });
    $('#timelineDiv').html(html);

}

function search(tipe) {
    var nroCI = "";
    if (localStorage.getItem("nroCI") !== null)
        nroCI = localStorage.getItem("nroCI");
    var empID = localStorage.getItem("empID");
    var val = document.getElementById('source').value;
    if (tipe == 1)
        val = ' ';
    document.getElementById('cleanLabel').style.display = "block";
    var data = localStorage.getItem("data");
    var d = JSON.parse(data);
    var html = "";
    wait(true);
    d.forEach(function (item) {
        if (Object.values(item).toString().toLowerCase().includes(val.toLowerCase())) {
            var items = Object.keys(item);
            var id = "";
            var Nombre = "";
            var ubicacion = "";
            var creado = "";
            var contrato = "";
            var Descripcion = "";
            var enlace = "";

            items.forEach(function (key) {
                if (key == "vNombre")
                    Nombre = item[key];
                if (key == "vUbicacion")
                    ubicacion = item[key];
                if (key == "tiempo")
                    contrato = item[key];
                if (key == "vCabId") {
                    id = item[key];
                    var clientURL = localStorage.getItem("clientUrl") + "?vacanciaNro%3D" + id;
                    enlace = "https://www.facebook.com/plugins/share_button.php?href=" + clientURL + "&layout=button_count&size=small&mobile_iframe=true&appId=2093852374276468&width=91&height=20";
                }
                if (key == "vDescPuesto")
                    Descripcion = item[key];
                if (key == "vFechaCreado")
                    creado = item[key];
                if (key == "ligado")
                    ligado = item[key];

            });
            //Crea HTML
            html += "<div class='timeline-item'><div class='timeline-badge'><img class='timeline-badge-userpic' src='../../assets/admin/pages/media/users/maletin.png'> ";
            html += "</div><div class='timeline-body'><div class='timeline-body-arrow'></div><div class='timeline-body-head'><div class='timeline-body-head-caption'> ";
            html += "<a href='javascript:;' class='timeline-body-title font-blue-madison'>" + Nombre + "</a><span class='timeline-body-time font-grey-cascade'>" + creado + "</span> ";
            html += "</div><div class='timeline-body-head-actions'> ";
            html += "<button type='button' onclick='Share(" + id + ");' class='btn blue btn-sm'>Comparte &nbsp; <i class='icon-share blue'></i></button>";
            html += "</div></div><div class='timeline-body-content'><span class='font-grey-cascade'>" + Descripcion + "</span><hr /> <div class='timeline-footer pull-right'>";
            if (nroCI == null || nroCI == "")
                html += "<a  onclick='iniciarSesion()' class='btn blue-madison'>Debes Iniciar Sesion <i class='icon-login m-icon-white'></i></a>";
            else {
                if (ligado != 0)
                    html += "<a disabled='disabled' class='btn default green-stripe'>Ya te Postulate a esta vacancia<i class='icon-check m-icon-white'></i></a>";
                else
                    html += "<button id='btnPost' onclick='preguntasEliminatorias(" + id + "," + empID + "," + nroCI + ")'  data-loading-text='Postulando...' class='demo-loading-btn btn red-thunderbird'>Postulate! <i class='icon-badge m-icon-white'></i></button>";
            }
            html += "<a onclick='detail(" + id + ")' class='btn grey'>Leer Mas <i class='  m-icon-white'></i></a></div></div></div></div> ";
        }
    });
    $('#timelineDiv').html(html);
    wait(false);
}
function cleanBox() {
    search(1);
    document.getElementById('cleanLabel').style.display = "none";
    document.getElementById('source').value = '';
    document.getElementById('source').focus();
}
function preguntasEliminatorias(idReg, empID, nroCI) {
    var target = event.target || event.srcElement;

    target.innerHTML = "Postulando...";
    target.disabled = true;
    setTimeout(function () {
        target.innerHTML = "Postulate!  <i class='icon-badge m-icon-white'></i>";
        target.disabled = false;

    }, 4000)

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _idReg: idReg, _empID: empID, _nroCI: nroCI
        }),
        url: "/UI/Externo/ExternoWS.asmx/preguntasEliminatorias",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;
            var html = "";
            var resultado = "";
            var ts = JSON.parse(data.d);
            if (ts[0].resultado == "[{resultado: 'NO TIENE'}]") {
                postulateSinP(idReg, empID, nroCI);
            }
            else {
                for (var propiedad in miObjeto) {
                    if (miObjeto.hasOwnProperty(propiedad)) {
                        var datos = JSON.parse(miObjeto[propiedad]);
                        datos.forEach(function (item) {
                            var items = Object.keys(item);
                            var idPreg = "";
                            var Nombre = "";
                            items.forEach(function (key) {
                                if (key == "resultado") {
                                    resultado = item[key];
                                    return;
                                }
                                if (key == "IdVacCab") {
                                    idPreg = item[key];
                                }
                                if (key == "PreNombre") {
                                    Nombre = item[key];
                                }

                            });
                            html += '<div class="row"><div class="col-lg-12"><div class="panel panel-default"><div class="panel-body"><h3 class="panel-title">' + Nombre + '</h3>';
                            html += '</div><div class="panel-footer" ><div class="btn-group btn-group-justified"><a href="javascript:test(' + idReg + ',' + idPreg + ',true' + ');" class="btn btn-default">SI </a>';
                            html += '<a href="javascript:test(' + idReg + ',' + idPreg + ',false' + ');" class="btn btn-default">NO </a></div><div class="row"><div class="col-lg-12"><label class="text text-primary" name="chResulPrg" id="' + idPreg + '"></label></div></div></div></div></div></div>';
                        });
                        if (resultado != "") {
                            alert(resultado);
                            return;
                        }
                        $('#pnlPregContent').html(html);
                        html = "<label><button id='btnPost3' onclick='postulate(" + idReg + "," + empID + "," + nroCI + ")' data-loading-text='Postulando...' class='demo-loading-btn btn red-thunderbird'>Postulate! <i class='icon-badge m-icon-white'></i></button></label>";
                        $('#btnPostulatePreg').html(html);
                    }
                }
                target.innerHTML = "Postulate!  <i class='icon-badge m-icon-white'></i>";
                target.disabled = false;
                document.getElementById('viewModalPreguntas').click();
            }
            if (data.d == "[{resultado: 'SI'}]") {
                alert(data.d);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
             
        }
    })
}
function postulateSinP(idReg, empID, nroCI) {
    wait(true);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _idReg: idReg, _empID: empID, _nroCI: nroCI
        }),
        url: "/UI/Externo/ExternoWS.asmx/postularse",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;

            if (data.d != "[{resultado: 'No'}]") {
                cargaLista(empID);
                ocultaPnl("block", "none");
                document.getElementById('closeModal3').click();
                alert("Genial! te postulaste a esta Vacancia");
            }
            else {
                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: postulate");
            }
            ResultadoP(idReg, nroCI, empID);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            debugger;
        }
    })
    wait(false);
}
function postulate(idReg, empID, nroCI) {
    var target2 = event.target || event.srcElement;
    target2.innerHTML = "Postulando...";
    target2.disabled = true;

    setTimeout(function () {
        target2.innerHTML = "Postulate!  <i class='icon-badge m-icon-white'></i>";
        target2.disabled = false;

    }, 4000)
    if (!controlaPreguntas()) {
        alert("Debes completar todas las preguntas para postularte");
        target2.innerHTML = "Postulate!  <i class='icon-badge m-icon-white'></i>";
        target2.disabled = false;
        return;
    } else {

        $(".pregEliminatorias label").each(function () {
            var valorEtiq = "S";
            if ($(this).html() == "SELECCIONASTE: NO")
                valorEtiq = "N";
            var idPgta = $(this).attr('id');

            $.ajax({
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    _idReg: idReg, _empID: empID, _nroCI: nroCI, _idPregunta: idPgta, _estado: valorEtiq
                }),
                url: "/UI/Externo/ExternoWS.asmx/agregaPregEli",
                dataType: "json",
                success: function (data) {


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    debugger;
                }
            })
        })
        postulateSinP(idReg, empID, nroCI);

    }
}

function ResultadoP(idReg, nroCI, empID) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _idReg: idReg, _empID: empID, _nroCI: nroCI
        }),
        url: "/UI/Externo/ExternoWS.asmx/ResultadoP",
        dataType: "json",
        success: function (data) {


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            debugger;
        }
    })
}
function controlaPreguntas() {
    var valor = true;
    $(".pregEliminatorias label").each(function () {
        var valorEtiq = $(this).html();
        if (valorEtiq == "")
            valor = false;
    });
    return valor;
}
function iniciarSesion() {
    var clientURL = localStorage.getItem("clientUrl");
    window.location.href = clientURL;
}
function backList() {
    var idE = localStorage.getItem("empID");
    window.location = "/UI/Externo/PostulateExt.aspx";
}
function mostrarPreguntas(pregunta) {
    document.getElementById("pnlRespuesta").style.display = pregunta;
}

function expSin(vDesde) {
    var valor = vDesde;
}

