var idE = window.location.search;
document.write('<script src="/assets/global/plugins/bootstrap-toastr/toastr.min.js" type="text/javascript"></script>');
function open() {
    Metronic.init();
    Layout.init();
    ComponentsPickers.init();
    $.backstretch([
        "/assets/admin/pages/media/bg/1.jpg",
        "/assets/admin/pages/media/bg/2.jpg",
        "/assets/admin/pages/media/bg/3.jpg",
        "/assets/admin/pages/media/bg/4.jpg"
    ], {
        fade: 1000,
        duration: 8000
    }
    );
  
    var idReg = getParameterByName("vacanciaNro");
    if (idReg === null || idReg === "") {
        getEmpData();
        var nroCI = localStorage.getItem("nroCI");
        if (nroCI !== null && nroCI !== "") {
            window.location = "/UI/Externo/PostulateExt.aspx";
        }
    } else {
        getEmpInfo(idReg, 3);
        window.location = "/UI/Externo/VacanciasList.aspx?idReg=" + idReg;
    }

}
function getEmpData() {
    var URLactual = window.location.toString(); 
    console.log(URLactual);
    getEmpInfo(URLactual, 1);
}
function showToast(titulo, mensaje, tipoMsg) {
    var i = -1,
        toastCount = 0,
        $toastlast,
        getMessage = function () {
            var msg = ['Hello, some notification sample goes here',
                '<div><input class="form-control input-small" value="textbox"/>&nbsp;<a href="http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes" target="_blank">Check this out</a></div><div><button type="button" id="okBtn" class="btn blue">Close me</button><button type="button" id="surpriseBtn" class="btn default" style="margin: 0 8px 0 8px">Surprise me</button></div>',
                'Did you like this one ? :)',
                'Totally Awesome!!!',
                'Yeah, this is the Metronic!',
                'Explore the power of Metronic. Purchase it now!'
            ];
            i++;
            if (i === msgs.length) {
                i = 0;
            }

            return msgs[i];
        };


    var shortCutFunction = tipoMsg;
    var msgs = '<div class="col-lg-8"><div class="row"><div class="col-lg-4"></div><div class="col-lg-8">' + mensaje + '</div></div><div class="row"><div class="col-lg-12 pull-right"><button type="button" id="surpriseBtn" onclick="toastr.clear();" class="btn default yellow-stripe pull-right">Leído</button></div></div></div>';
    var msg = ['Hello, some notification sample goes here',
        '<div><input class="form-control input-small" value="textbox"/>&nbsp;<a href="http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes" target="_blank">Check this out</a></div><div><button type="button" id="okBtn" class="btn blue">Close me</button><button type="button" id="surpriseBtn" class="btn default" style="margin: 0 8px 0 8px">Surprise me</button></div>',
        'Did you like this one ? :)',
        'Totally Awesome!!!',
        'Yeah, this is the Metronic!',
        'Explore the power of Metronic. Purchase it now!'
    ];
    var title = titulo || 'Mensaje';
    var $showDuration = 1000;
    var $hideDuration = 1000;
    var $timeOut = 3000;
    var $extendedTimeOut = 1000;
    var $showEasing = "swing";
    var $hideEasing = "linear";
    var $showMethod = "fadeIn";
    var $hideMethod = "fadeOut";
    var toastIndex = toastCount++;

    toastr.options = {
        closeButton: true,
        debug: false,
        positionClass: 'toast-top-full-width',
        onclick: null
    };

    toastr.options.showDuration = $showDuration;
    toastr.options.hideDuration = $hideDuration;
    toastr.options.timeOut = $timeOut;
    toastr.options.extendedTimeOut = $extendedTimeOut;
    toastr.options.showEasing = $showEasing;
    toastr.options.hideEasing = $hideEasing;
    toastr.options.showMethod = $showMethod;
    toastr.options.hideMethod = $hideMethod;

    if (!msg) {
        msg = getMessage();
    }
    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;

    $('#clearlasttoast').click(function () {
        toastr.clear($toastlast);
    });

    if ($toast.find('#okBtn').length) {
        $toast.delegate('#okBtn', 'click', function () {
            alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
            $toast.remove();
        });
    }


};
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function UrlAbrir() {
    var idE = localStorage.getItem("empID");
    if (idE === null || idE === "") {
        getEmpData();
    }
    window.location = "/UI/Externo/VacanciasList.aspx";
}
function calcularEdad(fecha) {
    console.log(fecha);
    var parts = fecha.split("/");
    var year = parseInt(parts[2], 10);
    var hoy = new Date();
    var edad = hoy.getFullYear() - year;

    return edad;
}
function aceptar() {
    var txtnroCI = document.getElementById("txtnroCI").value;
    var fechaNac = document.getElementById("fechaNac").value;
    if (txtnroCI.length == 0 || fechaNac.length == 0) {
        alert("Debes llenar los campos antes de continuar");
        return;
    }
    if (calcularEdad(fechaNac) >= 17) {
        document.getElementById("alertDiv").style.display = "block";
        getInfo(txtnroCI.replace(",", "").replace(".", ""), fechaNac, localStorage.getItem("empID"));
    } else {
        alert("No tienes mayoria de edad para continuar");
    }
}
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
                                    if (key == "idEmp") {
                                        localStorage.setItem("empID", item[key]);
                                        lblID.innerHTML = item[key];
                                    }
                                    if (key == "nombre")
                                        document.getElementById("txtApellidoPostu").value = item[key];
                                    //if (key == "descripcionEmpresa")
                                    //    document.getElementById("txtEditaMail").value = item[key];
                                    if (key == "logo") {
                                        document.getElementById("imgEmp").src = item[key];
                                        localStorage.setItem("logo", item[key]);
                                    }
                                    if (key == "clientURL") {
                                        localStorage.setItem("clientUrl", item[key]);
                                    }
                                    if (key == "HabilitarLogo")
                                        if (item[key] == "N")
                                            document.getElementById("imgPostulate").style.display = "none";
                                        else
                                            document.getElementById("imgPostulate").style.display = "block";
                                });
                            });
                            document.getElementById("alertDiv").style.display = "none";
                            document.getElementById("btnLogin").style.display = "block";
                            document.getElementById("btnVac").style.display = "block";

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
function getInfo(nroCi, fechaNac, ide) {
    var datosTabla = [];
    var dataSet = [];
   
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ _nroci: nroCi, _fechanac: fechaNac, _id: ide }),
        url: "/UI/Externo/ExternoWS.asmx/getInfoPostulante",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            console.log(data.d);
            if (data.d == '[{"resultado":"Ok"}]') {
                localStorage.setItem("nroCI", nroCi);
                localStorage.setItem("empID", ide);
                localStorage.setItem("fechaNac", fechaNac);
               
                window.location.href = "/UI/Externo/PostulateExt.aspx";
            }
            else {
                document.getElementById("alertDiv").style.display = "none";
                alert("La fecha de nacimiento no coincide con este número de C.I." + data.d);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}
