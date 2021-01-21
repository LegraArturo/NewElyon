var FormWizard = function () {
    return {
        init: function () {
            if (!jQuery().bootstrapWizard) {
                return;
            }

            function format(state) {
                if (!state.id) return state.text;
                return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
            }

            $("#country_list").select2({
                placeholder: "Select",
                allowClear: true,
                formatResult: format,
                formatSelection: format,
                escapeMarkup: function (m) {
                    return m;
                }
            });

            var form = $('#submit_form');
            var error = $('.alert-danger', form);
            var success = $('.alert-success', form);

            form.validate({
                doNotHideMessage: true,
                errorElement: 'span',
                errorClass: 'help-block help-block-error',
                focusInvalid: false,
                rules: {
                    username: {
                        minlength: 2,
                        required: true
                    },
                    apellidos: {
                        minlength: 2,
                        required: true
                    },
                    fechanac: {
                        required: true
                    },
                    nroci: {
                        required: true
                    },
                    celular: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },

                },

                messages: {
                    'payment[]': {
                        required: "Please select at least one option",
                        minlength: jQuery.validator.format("Please select at least one option")
                    }
                },

                errorPlacement: function (error, element) {
                    if (element.attr("name") == "gender") {
                        error.insertAfter("#form_gender_error");
                    } else if (element.attr("name") == "payment[]") {
                        error.insertAfter("#form_payment_error");
                    } else {
                        error.insertAfter(element);
                    }
                },

                invalidHandler: function (event, validator) {
                    success.hide();
                    error.show();
                    Metronic.scrollTo(error, -200);
                },

                highlight: function (element) {
                    $(element)
                        .closest('.form-group').removeClass('has-success').addClass('has-error');
                },

                unhighlight: function (element) {
                    $(element)
                        .closest('.form-group').removeClass('has-error');
                },

                success: function (label) {
                    if (label.attr("for") == "gender" || label.attr("for") == "payment[]") {
                        label
                            .closest('.form-group').removeClass('has-error').addClass('has-success');
                        label.remove();
                    } else {
                        label
                            .addClass('valid')
                            .closest('.form-group').removeClass('has-error').addClass('has-success');
                    }
                },

                submitHandler: function (form) {
                    error.hide();
                }

            });

            var displayConfirm = function () {
                $('#tab7 .form-control-static', form).each(function () {
                    var input = $('[name="' + $(this).attr("data-display") + '"]', form);
                    if (input.is(":radio")) {
                        input = $('[name="' + $(this).attr("data-display") + '"]:checked', form);
                    }
                    if (input.is(":text") || input.is("textarea")) {
                        $(this).html(input.val());
                    } else if (input.is("select")) {
                        $(this).html(input.find('option:selected').text());
                    } else if (input.is(":radio") && input.is(":checked")) {
                        $(this).html(input.attr("data-title"));
                    } else if ($(this).attr("data-display") == 'payment[]') {
                        var payment = [];
                        $('[name="payment[]"]:checked', form).each(function () {
                            payment.push($(this).attr('data-title'));
                        });
                        $(this).html(payment.join("<br>"));
                    }
                });
            }

            var handleTitle = function (tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                $('.step-title', $('#form_wizard_1')).text('Paso ' + (index + 1) + ' de ' + total);
                jQuery('li', $('#form_wizard_1')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }

                if (current == 1) {
                    $('#form_wizard_1').find('.button-previous').hide();
                } else {
                    $('#form_wizard_1').find('.button-previous').show();
                }

                if (current >= total) {
                    $('#form_wizard_1').find('.button-next').hide();
                    $('#form_wizard_1').find('.button-submit').show();
                    displayConfirm();
                } else {
                    $('#form_wizard_1').find('.button-next').show();
                    $('#form_wizard_1').find('.button-submit').hide();
                }
                Metronic.scrollTo($('.page-title'));
            }
            function showErrorLabel(element, tipe) {
                if (tipe == "error") {
                    $(element)
                        .closest('.form-group').removeClass('has-success').addClass('has-error');
                } else {
                    $(element)
                        .closest('.form-group').removeClass('has-error').addClass('has-success');
                }
            }
            var valid = function (index) {
                if (index == 1) {
                    var nac = document.getElementById("lblNacionalidad");
                    var ciud = document.getElementById("lblCiudad");
                    var ec = document.getElementById("lblec");
                    var salario = document.getElementById("lblsalario");

                    if (nac.innerHTML == "-1") {
                        showErrorLabel(nac, "error");
                        return false
                    } else
                        showErrorLabel(nac, "ok")
                    if (ciud.innerHTML == "-1") {
                        showErrorLabel(ciud, "error");
                        return false
                    } else
                        showErrorLabel(ciud, "ok")
                    if (ec.innerHTML == "-1") {
                        showErrorLabel(ec, "error");
                        return false
                    } else
                        showErrorLabel(ec, "ok")
                    if (salario.innerHTML == "-1") {
                        showErrorLabel(salario, "error");
                        return false
                    } else
                        showErrorLabel(salario, "ok")

                }
                else if (index == 2) {
                    var valor2 = $('#ddlTieneUni').val();
                    if (valor2 == "-1") {
                        alert("Debes seleccionar una opcion en Formacion Universitaria")
                        return false;
                    }
                    if (!$('#gvUni').find('div').length > 0 && valor2 == "2")
                        return false;
                }
                else if (index == 3) {
                    var valor3 = $('#ddlTieneSec').val();
                    if (valor3 == "-1") {
                        alert("Debes seleccionar una opcion en Formacion Secundaria")
                        return false;
                    }
                    if (!$('#gvSec').find('div').length > 0 && valor3 == "2")
                        return false;
                }
                else if (index == 6) {
                    var valor = $('#ddlTieneExpLaboral').val();
                    if (valor == "-1") {
                        alert("Debes seleccionar una opcion en Experiencia Laboral")
                        return false;
                    }
                    if (!$('#gvExp').find('div').length > 0 && valor == "2")
                        return false;
                }

                return true;
            }
            $('#form_wizard_1').bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function (tab, navigation, index, clickedIndex) {
                    return false;

                },
                onNext: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    if (form.valid() == false || valid(index) == false) {
                        success.hide();
                        error.show();
                        Metronic.scrollTo(error, -200);
                        return false;
                    }

                    handleTitle(tab, navigation, index);
                },
                onPrevious: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    handleTitle(tab, navigation, index);
                },
                onTabShow: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var $percent = (current / total) * 100;
                    $('#form_wizard_1').find('.progress-bar').css({
                        width: $percent + '%'
                    });
                }
            });

            $('#form_wizard_1').find('.button-previous').hide();
            $('#form_wizard_1 .button-submit').click(function () {
                var ide = localStorage.getItem("empID");

                var txtExpNombreRefLab1 =
                    document.getElementById("txtExpNombreRefLab1").value;
                var txtExpEmpresaRefLab1 =
                    document.getElementById("txtExpEmpresaRefLab1").value;
                var txtExpCelRefLab1 =
                    document.getElementById("txtExpCelRefLab1").value;
                var txtExpRelacionRefLab1 =
                    document.getElementById("txtExpRelacionRefLab1").value;

                var txtExpNombreRefPart1 =
                    document.getElementById("txtExpNombreRefPart1").value;
                var txtExpNombreRefPart2 =
                    document.getElementById("txtExpNombreRefPart2").value;
                var txtExpCelRefPart1 =
                    document.getElementById("txtExpCelRefPart1").value;
                var txtExpCelRefPart2 =
                    document.getElementById("txtExpCelRefPart2").value;
                var txtExpRelacionRefPart1 =
                    document.getElementById("txtExpRelacionRefPart1").value;
                var txtExpRelacionRefPart2 =
                    document.getElementById("txtExpRelacionRefPart2").value;

                if (txtExpNombreRefPart1 == "" || txtExpNombreRefPart2 == "" || txtExpCelRefPart1 == "" || txtExpCelRefPart2 == "" || txtExpRelacionRefPart1 == "" || txtExpRelacionRefPart2 == "") {
                    alert("Debes completar todos los campos obligatorios * antes de guardar");
                    return false;
                }

                var val = $('#ddlTieneExpLaboral').val();
                if (val == 2) {
                    if (txtExpNombreRefLab1 == "" || txtExpEmpresaRefLab1 == "" || txtExpCelRefLab1 == "" || txtExpRelacionRefLab1 == "" || txtExpNombreRefPart1 == "" || txtExpNombreRefPart2 == "" || txtExpCelRefPart1 == "" || txtExpCelRefPart2 == "" || txtExpRelacionRefPart1 == "" || txtExpRelacionRefPart2 == "") {
                        alert("Debes completar todos los campos obligatorios * antes de guardar");
                        return false;
                    }
                }
                sendMailConf();
                alert('Genial! terminaste de cargar tu CV :)');
                if (ide == null)
                    window.location.href = "/UI/Externo/VacanciasList.aspx";
                else
                    window.location.href = "/UI/Externo/VacanciasList.aspx?idE=" + ide;
                return;

                document.getElementById("lblID").innerText = ide;
                // location.href = "VacanciasList.aspx?idE= " + ide;
                var current = 1;
                $('.step-title', $('#form_wizard_1')).text("Genial Terminaste de Cargar tu CV. Puedes editarlo cuando quieras");
                jQuery('li', $('#form_wizard_1')).removeClass("done");

                $('#form_wizard_1').find('.progress-bar').css({
                    width: 100 + '%'
                });
            }).hide();
        }

    };

}();
jQuery(document).ready(function () {
    var nroCI = localStorage.getItem("nroCI");
    if (nroCI === null || nroCI === "") {
        window.location = localStorage.getItem("clientUrl");
    }

    var fechaNac = localStorage.getItem("fechaNac");
    var logUrl = localStorage.getItem("logo");
    var ide = localStorage.getItem("empID");

    if (ide == null)
        ide = getParameterByName("idE");

    if (nroCI == null) {
        if (ide == null)
            window.location.href = "http://capital.postulate.com.py/";
        else {
            var clientURL = localStorage.getItem("clientUrl");
            window.location.href = clientURL;
        }
        return;
    }

    document.getElementById("txtCiPostulante").value = nroCI;
    document.getElementById("lblID").innerText = ide;
    document.getElementById("txtEditaFechaNac").value = fechaNac;

    Metronic.init();
    Layout.init();
    FormWizard.init();
    FormValidation.init();
    document.getElementById("imgLogo").src = logUrl;
    if (typeof (Worker) !== "undefined") {
        if (typeof (w) == "undefined") {
            w = new Worker(cargaDatos());
        }

    } else {
        alert("Ups tu navegador no soporta nuestros procesos");
    }

});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function sendNotif(nombre, correo, empID) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _nombre: nombre,
            _correo: correo,
            _empID: empID
        }),
        url: "/UI/Externo/ExternoWS.asmx/sendNotification",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);

        }
    });
}


function cargaDatos() {

    document.getElementById("pnlCarga").style.display = "block";
    var nroCI = localStorage.getItem("nroCI");
    var ide = localStorage.getItem("empID");

    $('#txtempID').val(ide);
    if (nroCI == null)
        return;

    cargaDatosPersonales('2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', nroCI, '', '', ide, '-1', '-1', '-1');
    cargaDatosSec('2', '', '', ide, nroCI, '');
    cargaDatosTec('2', '', '', ide, nroCI, '');
    cargaDatosIdioma('2', '', '', '', ide, nroCI);
    cargaDatosUni('2', '', '', '', '', '', '', '', '', ide, nroCI);
    cargaDatosExperiencia('2', '', '', '', '', '', '', '', '', '', '', '', '', ide, nroCI, '');
    cargaDatosReferencias('2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ide, nroCI);
    console.log("Datos Cargados");
    document.getElementById("pnlCarga").style.display = "none";

    var yourUl = document.getElementById("btnSave");
    yourUl.style.display = yourUl.style.display === 'none' ? '' : 'none';
}
function cargaDatosPersonales(tipo, nombre, apellido, gender, nac, ciudad, ec, salario, disponibilidad, correo, cel1, cel2,
    obs, maneja, movil, nroCI, fechaNac, lineaBaja, empID, expLab, forUni, forSec) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _new: tipo,
            _nombre: nombre, _apellido: apellido, _gender: gender, _nac: nac, _ciudad: ciudad,
            _ec: ec, _salario: salario, _disponibilidad: disponibilidad, _correo: correo,
            _cel1: cel1, _cel2: cel2, _obs: obs, _maneja: maneja, _movil: movil,
            _nroCI: nroCI, _fechaNac: fechaNac, _lineaBaja: lineaBaja, _empID: empID, _expLab: expLab, _forUni: forUni, _forSec: forSec

        }),
        url: "/UI/Externo/ExternoWS.asmx/setDatosPersonales",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;
            var picture = "http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=sube+tu+foto";
            try {

                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);

                                items.forEach(function (key) {
                                    if (key == "perNombres")
                                        document.getElementById("txtNombrePostu").value = item[key];;
                                    if (key == "perApellidos")
                                        document.getElementById("txtApellidoPostu").value = item[key];
                                    if (key == "mail")
                                        document.getElementById("txtEditaMail").value = item[key];
                                    if (key == "cel1")
                                        document.getElementById("txtCel1").value = item[key];
                                    if (key == "cel2")
                                        document.getElementById("txtCel2").value = item[key];
                                    if (key == "telefono")
                                        document.getElementById("txtLineaBaja").value = item[key];
                                    if (key == "nacID") {
                                        document.getElementById("lblNacionalidad").innerHTML = item[key];
                                        $("#ddlNacionalidad").select2("val", item[key]);
                                    }
                                    if (key == "sID") {
                                        document.getElementById("lblsalario").innerHTML = item[key];
                                        $("#ddlSalario").select2("val", item[key]);
                                    }

                                    if (key == "pECID") {
                                        document.getElementById("lblec").innerHTML = item[key];
                                        $("#ddlec").select2("val", item[key]);
                                    }
                                    if (key == "perLugarNac") {
                                        document.getElementById("lblCiudad").innerHTML = item[key];
                                        $("#ddlCiudadNacimiento").select2("val", item[key]);
                                    }
                                    if (key == "perSexo") {
                                        if (item[key] == "M")
                                            $("[id='ckSexo']").bootstrapSwitch('state', false);
                                        else
                                            $("[id='ckSexo']").bootstrapSwitch('state', true);
                                    }
                                    if (key == "idDisHoraria") {
                                        document.getElementById("lbldisponibilidad").innerHTML = item[key];
                                        $("#ddlDisHoraria").select2("val", item[key]);
                                    }
                                    if (key == "movPropia") {
                                        if (item[key] == "S") {
                                            $("[id='ckMovilidadPropia']").bootstrapSwitch('state', true);
                                        }
                                        document.getElementById("ckMovilidadPropia").checked;
                                    }
                                    if (key == "sabeManejar") {
                                        if (item[key] == "S")
                                            $("[id='ckSabeManejar']").bootstrapSwitch('state', true);
                                    }
                                    if (key == "perFoto") {
                                        document.getElementById("imgPerfil").src = item[key];
                                        document.getElementById("img").src = item[key];

                                    }
                                    if (key == "doc") {
                                        var doc = item[key];
                                        if (doc != "" && doc != null) {
                                            document.getElementById("txtUp").value = "Tienes un CV cargado. Presiona Descargar para verlo";
                                            document.getElementById("txtUp").style.display = 'block';
                                            document.getElementById("dvDesc").style.display = 'block';
                                        } else {
                                            document.getElementById("txtUp").style.display = 'none';
                                            document.getElementById("dvDesc").style.display = 'none';
                                        }
                                    }
                                    if (key == "perObs")
                                        document.getElementById("txtObs").value = item[key];

                                    //if (key == "expLaboral") {
                                    //    $("#ddlTieneExpLaboral").select2("val", item[key]);
                                    //}

                                    //if (key == "forUniversitaria") {
                                    //    $("#ddlTieneUni").select2("val", item[key]);
                                    //}

                                    //if (key == "forSecundaria") {
                                    //    $("#ddlTieneSec").select2("val", item[key]);
                                    //}
                                });
                            });

                        }
                    }
                    document.getElementById("pnlCargaInicial").style.display = "none";

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
function cargaFotoPerfil(url) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _url: url
        }),
        url: "/UI/Externo/ExternoWS.asmx/getFotoPerfil",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }

            if (data.d != "[{resultado: 'No'}]") {
                document.getElementById("fotoDefault").src = data.d;
                document.getElementById("imgPerfil").src = data.d;
            }
            else {
                //alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: cargaFotoPerfil");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            
        }
    })
}
function cargaDatosUni(tipo, titulo, tituloCarrera, nombreUni, pais, estadoEstudio, anhoInicio, anhoFin, obs, ide, nroCI) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _titulo: titulo, _nombreTit: tituloCarrera,
            _nombreUni: nombreUni, _pais: pais,
            _estadoEst: estadoEstudio, _anhoInicio: anhoInicio,
            _anhoFin: anhoFin, _obs: obs,
            _lblID: ide, _nroCI: nroCI, _new: tipo
        }),
        url: "/UI/Externo/ExternoWS.asmx/setUniv",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                $('#ddlTieneUni').val("-1");
                document.getElementById('pnlYNUni').style.display = "block";
                return;
            }
            var miObjeto = data;
            var html = "";
            try {

                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);
                                var id = "";
                                var Descripcion = "";
                                var Nivel = "";
                                var anho = "";
                                var obs = "";

                                items.forEach(function (key) {
                                    if (key == "IDFormacion")
                                        id = item[key];
                                    if (key == "Titulo")
                                        Descripcion = item[key];
                                    if (key == "Universidad")
                                        Nivel = item[key];
                                    if (key == "anoInicio")
                                        anho = item[key];
                                    if (key == "faObs")
                                        obs = item[key];
                                });
                                //Crea HTML
                                html += "<div class='blog-twitter-block'><a>" + Descripcion + " - " + anho + "</a><p>" + Nivel;
                                html += "<span class='pull-right'><input type='button' class='btn btn-warning btn-sm' onclick='EditarReg(" + id + ",1);' value='EDITAR' /><input type='button' class='btn btn-danger btn-sm' onclick='EliminaReg(" + id + ",1);' value='ELIMINAR' /></span></p><hr /> </div> ";
                              //s  $("#ddlTieneUni").val('2');
                                document.getElementById('btnUniversitaria').style.display = 'block';
                            });
                            $('#gvUni').html(html);
                            ocultaFormacion("block", "none", "none", "none", "none", "block", "block", "block", "block");
                            $('#ddlTieneUni').val("1");
                            document.getElementById('pnlYNUni').style.display = "none";
                             
                        }
                    }
                }  

            } catch (ex) {
                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: cargaDatosUni " + ex);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            
        }
    })
}
function cargaDatosSec(tipo, nombre, titulo, ide, nroCI, anho) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _NombreColegio: nombre, _Titulo: titulo,
            _lblID: ide, _nroCI: nroCI,
            _anho: anho, _new: tipo
        }),
        url: "/UI/Externo/ExternoWS.asmx/setSecundaria",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                $('#ddlTieneSec').val("-1");
                document.getElementById('pnlYNSec').style.display = "block"; 
                return;
            }
            var miObjeto = data;
            var html = "";

            if (data.d != "[{resultado: 'No'}]") {
                for (var propiedad in miObjeto) {
                    if (miObjeto.hasOwnProperty(propiedad)) {
                        var datos = JSON.parse(miObjeto[propiedad]);

                        datos.forEach(function (item) {
                            var items = Object.keys(item);
                            var id = "";
                            var Descripcion = "";
                            var Nivel = "";
                            var anho = "";

                            items.forEach(function (key) {
                                if (key == "IDFormacion")
                                    id = item[key];
                                if (key == "tituloColegio")
                                    Descripcion = item[key];
                                if (key == "nomColegio")
                                    Nivel = item[key];
                                if (key == "culminoColegio")
                                    anho = item[key];
                            });
                            //Crea HTML
                            html += "<div class='blog-twitter-block'><a>" + Descripcion + " - " + anho + "</a><p>" + Nivel;
                            html += "<span class='pull-right'><input type='button' class='btn btn-warning btn-sm' onclick='EditarReg(" + id + ",2);' value='EDITAR' /><input type='button'  class='btn btn-danger btn-sm' onclick='EliminaReg(" + id + ",2);' value='ELIMINAR' /></span></p><hr /> </div> ";
                            $("#ddlTieneSec").val('2');
                            document.getElementById('btnSecundaria').style.display = 'block';
                        });
                        $('#gvSec').html(html);
                        $('#ddlTieneSec').val("1");
                        document.getElementById('pnlYNSec').style.display = "none"; 
                        ocultaFormacion("block", "none", "none", "none", "none", "block", "block", "block", "block");
                    }
                }
            }
            else {
                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: setSecundaria");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            
        }
    })
}
function cargaDatosTec(tipo, txtTecNombre, selectedValue, ide, nroCI, fechaNac) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _TecNombre: txtTecNombre, _ddlNivelTec: selectedValue,
            _lblID: ide, _nroCI: nroCI,
            _fechaNac: fechaNac, _new: tipo
        }),
        url: "/UI/Externo/ExternoWS.asmx/setTec",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;
            var html = "";
            try {
                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);
                                var id = "";
                                var Descripcion = "";
                                var Nivel = "";

                                items.forEach(function (key) {
                                    if (key == "idConot")
                                        id = item[key];
                                    if (key == "DetalleConoT")
                                        Descripcion = item[key];
                                    if (key == "NIVEL")
                                        Nivel = item[key];
                                });
                                //Crea HTML
                                html += "<div class='blog-twitter-block'><a>" + Nivel + "</a><p>" + Descripcion;
                                html += "<span class='pull-right'><input type='button' class='btn btn-warning btn-sm' onclick='EditarReg(" + id + ",3);' value='EDITAR' /><input type='button' class='btn btn-danger btn-sm' onclick='EliminaReg(" + id + ",3);' value='ELIMINAR' /></span></p><hr /> </div> ";

                            });
                            $('#gvConTec').html(html);
                            ocultaFormacion("block", "none", "none", "none", "none", "block", "block", "block", "block");
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
    })
}
function cargaDatosIdioma(tipo, ddlIdiomas, ddlHabla, ddlEscribe, ide, nroCI) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _idioma: ddlIdiomas, _habla: ddlHabla,
            _LeeEscribe: ddlEscribe, _lblID: ide,
            _nroCI: nroCI, _new: tipo
        }),
        url: "/UI/Externo/ExternoWS.asmx/setIdiomas",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;
            var html = "";
            try {
                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);
                                var id = "";
                                var Descripcion = "";
                                var Nivel = "";
                                var habla = "";

                                items.forEach(function (key) {
                                    if (key == "idIdioma")
                                        id = item[key];
                                    if (key == "idioma")
                                        Descripcion = item[key];
                                    if (key == "habla")
                                        Nivel = item[key];
                                    if (key == "LeeEscribe")
                                        habla = item[key];
                                });
                                //Crea HTML
                                html += "<div class='blog-twitter-block'><a>Habla: <b>" + Nivel + "</b> - Lee y Escribe: <b>" + habla + "</b></a><p>" + Descripcion;
                                html += "<span class='pull-right'><input type='button' class='btn btn-warning btn-sm' onclick='EditarReg(" + id + ",4);' value='EDITAR' /><input type='button' class='btn btn-danger btn-sm' onclick='EliminaReg(" + id + ",4);' value='ELIMINAR' /></span></p><hr /> </div> ";

                            });
                            $('#gvIdioma').html(html);
                            ocultaFormacion("block", "none", "none", "none", "none", "block", "block", "block", "block");
                        }
                    }
                }
            }
            catch (ex) {
                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: setDatosPersonales: " + ex);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            
        }
    })
}
function cargaDatosExperiencia(tipo, nombrePuesto, categoria, PaisTrabajo, tipoInd, areaTrab, subAreaTrab,
    fechaIni, fechaFin, maneja, nombreEmpresa, salidaId, tieneMov, ide, nroCI, descTareas) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _nombrePuesto: nombrePuesto, _categoria: categoria,
            _PaisTrabajo: PaisTrabajo, _tipoInd: tipoInd,
            _areaTrab: areaTrab, _subAreaTrab: subAreaTrab,
            _fechaIni: fechaIni, _fechaFin: fechaFin,
            _maneja: maneja, _nombreEmpresa: nombreEmpresa,
            _salidaId: salidaId, _tieneMov: tieneMov,
            _lblID: ide, _nroCI: nroCI,
            _new: tipo, _descTareas: descTareas
        }),
        url: "/UI/Externo/ExternoWS.asmx/setExpLaboral",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                $('#ddlTieneExpLaboral').val("-1");
                document.getElementById('pnlYNEL').style.display = "block"; 
                return;
            }
            var miObjeto = data;
            var html = "";

            if (data.d != "[{resultado: 'No'}]") {
                for (var propiedad in miObjeto) {
                    if (miObjeto.hasOwnProperty(propiedad)) {
                        var datos = JSON.parse(miObjeto[propiedad]);

                        datos.forEach(function (item) {
                            var items = Object.keys(item);
                            var id = "";
                            var Descripcion = "";
                            var HastaFecha = "";
                            var Inicio = "";
                            var Tareas = "";

                            items.forEach(function (key) {
                                if (key == "expID")
                                    id = item[key];
                                if (key == "empresa")
                                    Descripcion = item[key];
                                if (key == "hasta")
                                    HastaFecha = item[key];
                                if (key == "expFechaIni")
                                    Inicio = item[key];
                            });
                            //Crea HTML
                            html += "<div class='blog-twitter-block'><p><b>" + Descripcion + "</b></p><p><b>Fecha de Inicio: </b>" + Inicio + "<b>Hasta: </b>" + HastaFecha;
                            html += " <span class='pull-right'><input type='button' class='btn btn-warning btn-sm' onclick='EditarReg(" + id + ",5);' value='EDITAR' /><input type='button' class='btn btn-danger btn-sm' onclick='EliminaReg(" + id + ",5);' value='ELIMINAR' /></span></p><hr /> </div> ";
                            document.getElementById('btnExperiencia').style.display = 'block';
                        });
                        $('#gvExp').html(html);
                        $('#ddlTieneExpLaboral').val("1");
                        document.getElementById('pnlYNEL').style.display = "none";
                        ocultaExp("block", "none", "block");
                    }
                }
            }
            else {
                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: cargaDatosExperiencia");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            
        }
    })
}
function cargaDatosReferencias(tipo, nombPart1, telPart1, relPart1, nombPart2, telPart2, relPart2,
    nombLab1, telLab1, empLab1, relLab1, nombLab2, telLab2, empLab2, relLab2, empID, nroCI) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _new: tipo,
            _nombPart1: nombPart1, _telPart1: telPart1, _relPart1: relPart1,
            _nombPart2: nombPart2, _telPart2: telPart2, _relPart2: relPart2,
            _nombLab1: nombLab1, _telLab1: telLab1, _empLab1: empLab1, _relLab1: relLab1,
            _nombLab2: nombLab2, _telLab2: telLab2, _empLab2: empLab2, _relLab2: relLab2,
            _nroCI: nroCI, _empID: empID
        }),
        url: "/UI/Externo/ExternoWS.asmx/setDatosReferencias",
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

                            items.forEach(function (key) {
                                if (key == "rPerNombre1")
                                    document.getElementById("txtExpNombreRefPart1").value = item[key];;
                                if (key == "rPerNombres2")
                                    document.getElementById("txtExpNombreRefPart2").value = item[key];
                                if (key == "rPerCelular1")
                                    document.getElementById("txtExpCelRefPart1").value = item[key];
                                if (key == "rPerCelular2")
                                    document.getElementById("txtExpCelRefPart2").value = item[key];
                                if (key == "rPerRelacion1")
                                    document.getElementById("txtExpRelacionRefPart1").value = item[key];
                                if (key == "rPerRelacion2")
                                    document.getElementById("txtExpRelacionRefPart2").value = item[key];
                                if (key == "rLabNombres1")
                                    document.getElementById("txtExpNombreRefLab1").value = item[key];
                                if (key == "rLabNomres2")
                                    document.getElementById("txtExpNombreRefLab2").value = item[key];
                                if (key == "rLabEmpresa1")
                                    document.getElementById("txtExpEmpresaRefLab1").value = item[key];
                                if (key == "rLabEmpresa2")
                                    document.getElementById("txtExpEmpresaRefLab2").value = item[key];
                                if (key == "rLabCelular1")
                                    document.getElementById("txtExpCelRefLab1").value = item[key];
                                if (key == "rLabCelualr2")
                                    document.getElementById("txtExpCelRefLab2").value = item[key];
                                if (key == "rLabRelacion1")
                                    document.getElementById("txtExpRelacionRefLab1").value = item[key];
                                if (key == "rLabRelacion2")
                                    document.getElementById("txtExpRelacionRefLab2").value = item[key];

                            });
                        });

                    }
                }
            }
            else {
                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: cargaDatosReferencias");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            
        }
    })

}


function ocultaFormacion(sel, universitaria, secundaria, tecnico, idioma, secu, tec, idio, footer) {

    document.getElementById("pnlSel").style.display = sel;
    document.getElementById("pnlUni").style.display = universitaria;
    document.getElementById("pnlSec").style.display = secundaria;
    document.getElementById("pnlTec").style.display = tecnico;
    document.getElementById("pnlIdioma").style.display = idioma;
    document.getElementById("correcto").style.display = "none";

    document.getElementById("pnlSecu").style.display = secu;
    document.getElementById("pnlTecnico").style.display = tec;
    document.getElementById("pnlIdio").style.display = idio;

    document.getElementById("pnlFooter").style.display = footer;

    limpiaFormacionAc();
}
function ocultaPaneles(sel, universitaria, secundaria, tecnico, idioma, secu, tec, idio, footer) {
    document.getElementById("pnlSel").style.display = sel;
    document.getElementById("pnlUni").style.display = universitaria;
    document.getElementById("pnlSec").style.display = secundaria;
    document.getElementById("pnlTec").style.display = tecnico;
    document.getElementById("pnlIdioma").style.display = idioma;

    document.getElementById("pnlSecu").style.display = secu;
    document.getElementById("pnlTecnico").style.display = tec;
    document.getElementById("pnlIdio").style.display = idio;
    document.getElementById("pnlFooter").style.display = footer;
}
function ocultaExp(sel, exp, footer) {
    document.getElementById("pnlExpSel").style.display = sel;
    document.getElementById("pnlExpLab").style.display = exp;

    document.getElementById("pnlFooter").style.display = footer;

    limpiaExp();
}


function limpiaExp() {
    $('#txtExpNombre').val("");
    $('#txtExpNombreEmp').val("");
    $('#txtEmpAnhoInicio').val("");
    $('#txtDescTareas').val("");
    $('#txtEmpAnhoFin').val("");
    document.getElementById("lblExpTipoIndEmp").innerText = "-1";
    $('#ddlTipoIndustria').val("-1").trigger('change.select2');
    document.getElementById("lblExpAreaEmp").innerText = "-1";
    $('#ddlEmpAreaTrabajo').val("-1").trigger('change.select2');
    document.getElementById("lblExpPais").innerText = "";
    $('#ddlExpPais').val("-1").trigger('change.select2');
    document.getElementById("lblExpCategoria").innerText = "";
    $('#ddlExpCategoria').val("-1").trigger('change.select2');
    document.getElementById("lblExpFuncionEmp").innerText = "-1";
    $('#ddlSubAreaTrabajo').val("-1").trigger('change.select2');
    document.getElementById("lblEmpMotivoSalida").innerText = "-1";
    $('#ddlEmpMotSalida').val("-1").trigger('change.select2');
    $("[id='ckEmpAct']").bootstrapSwitch('state', false);
}
function limpiaFormacionAc() {
    document.getElementById("lbluniID").innerText = "0";
    document.getElementById("lblTecID").innerText = "0";
    document.getElementById("lblSecID").innerText = "0";
    document.getElementById("lblIdiomaID").innerText = "0";
    document.getElementById("lblExpID").innerText = "0";

    document.getElementById("lblTituloCarrera").innerText = "-1";
    $('#ddlTipoFormacion').val("-1").trigger('change.select2');
    document.getElementById("lblPaisUni").innerText = "51";
    $('#ddlPaisUni').val("51").trigger('change.select2');
    document.getElementById("lblEstadoEstudio").innerText = "-1";
    $('#ddlEstadoEstudio').val("-1").trigger('change.select2');
    $('#txtUniAnhoInicio').val("");
    $('#txtUniAnhoFin').val("");
    $('#txtDescripcionEstudio').val("");
    $('#txtUniNombreUni').val("");
    $('#txtSecNombre').val("");
    $('#txtSecTitulo').val("");
    $('#txtSecAnhoFin').val("");
    $('#txtTecNombre').val("");
    document.getElementById("lblTecNivelCono").innerText = "-1";
    $('#ddlTecNivelConocimiento').val("-1").trigger('change.select2');
    document.getElementById("lblIdioma").innerText = "-1";
    $('#ddlIdiomas').val("-1").trigger('change.select2');
    document.getElementById("lblHabla").innerText = "-1";
    $('#ddlHablaIdioma').val("-1").trigger('change.select2');
    document.getElementById("lblEscribe").innerText = "-1";
    $('#ddlLeeEscribe').val("-1").trigger('change.select2');

}


function saveDP() {
    var nombre = document.getElementById("txtNombrePostu").value;
    var apellido = document.getElementById("txtApellidoPostu").value;
    var nac = document.getElementById("lblNacionalidad").innerHTML;
    var ciud = document.getElementById("lblCiudad").innerHTML;
    var ec = document.getElementById("lblec").innerHTML;
    var salario = document.getElementById("lblsalario").innerHTML;
    var disponibilidad = document.getElementById("lbldisponibilidad").innerHTML;
    var correo = document.getElementById("txtEditaMail").value;
    var lineaBaja = document.getElementById("txtLineaBaja").value;
    var txtCelular1 = document.getElementById("txtCel1").value;
    var txtCelular2 = document.getElementById("txtCel2").value;
    var obs = document.getElementById("txtObs").value;

    var maneja = "N";
    if (document.getElementById("ckSabeManejar").checked)
        maneja = "S";
    var movil = "N";
    if (document.getElementById("ckMovilidadPropia").checked)
        movil = "S";
    var nroCI = localStorage.getItem("nroCI");
    var ide = localStorage.getItem("empID");
    var fechaNac = localStorage.getItem("fechaNac");

    //if ($('#ddlTieneExpLaboral').val() == "") {
        var expLab = "-1"
    //} else {
    //    expLab = $('#ddlTieneExpLaboral').val();
    //}

    //if ($('#ddlTieneUni').val() == "") {
        var forUni = "-1"
    //} else {
    //    forUni = $('#ddlTieneUni').val();
    //}

    //if ($('#ddlTieneSec').val() == "") {
        var forSec = "-1"
    //} else {
    //    forSec = $('#ddlTieneSec').val();
    //}

    var gender = "M";
    if ($('[id="ckSexo"]').is(':checked')) {
        gender = "F";
    }

    cargaDatosPersonales(1, nombre, apellido, gender, nac, ciud, ec, salario, disponibilidad, correo, txtCelular1, txtCelular2,
        obs, maneja, movil, nroCI, fechaNac, lineaBaja, ide, expLab, forUni, forSec);
    savePict();
    
}
function saveUni() {
    var tituloSelect = document.getElementById("lblTipoFormacion").innerHTML;
    var NombreUni = document.getElementById("txtUniNombreUni").value;
    var lblPaisUni = document.getElementById("lblPaisUni").innerHTML;
    var lblEstadoEstudio = document.getElementById("lblEstadoEstudio").innerHTML;
    var txtUniAnhoInicio = document.getElementById("txtUniAnhoInicio").value;
    var txtUniAnhoFin = document.getElementById("txtUniAnhoFin").value;
    var txtDescripcionEstudio = document.getElementById("txtDescripcionEstudio").value;
    var cb = document.getElementById("ckUniCursando");
    var lblTituloCarrera = document.getElementById("lblTituloCarrera").innerHTML;
    var nroCI = localStorage.getItem("nroCI");
    var ide = localStorage.getItem("empID");
    var idUni = document.getElementById("lbluniID").innerHTML;
    var valor = $('#ddlTieneUni').val();

    if (valor == 2) {
        if (NombreUni == "" || tituloSelect == "-1" || lblTituloCarrera == "-1" || lblPaisUni == "-1" || txtUniAnhoInicio == "") {
            alert("Debes completar todos los campos obligatorios * antes de guardar");
            return;
        }

        if (!cb.checked && txtUniAnhoFin == "") {
            alert("Tienes que marcar el anho de culminacion. De lo contrario marca como Cursando Actualmente SI");
            return;
        }
    }

    var btn = $('#btnUniSave');
    btn.button('loading');
    setTimeout(function () {
        btn.button('reset');
    }, 3000);

    if (idUni == "0")
        cargaDatosUni('1', tituloSelect, lblTituloCarrera, NombreUni, lblPaisUni, lblEstadoEstudio, txtUniAnhoInicio, txtUniAnhoFin, txtDescripcionEstudio, ide, nroCI);
    else
        cargaDatosUni(idUni, tituloSelect, lblTituloCarrera, NombreUni, lblPaisUni, lblEstadoEstudio, txtUniAnhoInicio, txtUniAnhoFin, txtDescripcionEstudio, ide, nroCI);

    document.getElementById("txtUniNombreUni").value = "";
    document.getElementById("txtUniAnhoInicio").value = "";
    document.getElementById("txtUniAnhoFin").value = "";
    document.getElementById("txtDescripcionEstudio").value = "";
    document.getElementById('btnUniversitaria').style.display = 'block';

}
function saveSecund() {
    var nombre = document.getElementById("txtSecNombre").value;
    var titulo = document.getElementById("txtSecTitulo").value;
    var anho = document.getElementById("txtSecAnhoFin").value;
    var nroCI = localStorage.getItem("nroCI");
    var ide = localStorage.getItem("empID");
    var idSec = document.getElementById("lblSecID").innerHTML;

    if ($('#ddlTieneSec').val() == 2) {
        if (nombre == "" || titulo == "" || anho == "") {
            alert("Debes completar todos los campos antes de guardar");
            return;
        }
    }

    var btn = $('#btnSecSave')
    btn.button('loading')
    setTimeout(function () {
        btn.button('reset')
    }, 3000)

    if (idSec == "0")
        cargaDatosSec('1', nombre, titulo, ide, nroCI, anho);
    else
        cargaDatosSec(idSec, nombre, titulo, ide, nroCI, anho);

    document.getElementById("txtSecNombre").value = "";
    document.getElementById("txtSecTitulo").value = "";
    document.getElementById("txtSecAnhoFin").value = "";
    document.getElementById('btnSecundaria').style.display = 'block';

}
function saveTec() {
    var txtTecNombre = document.getElementById("txtTecNombre").value;
    var selectedValue = document.getElementById("lblTecNivelCono").innerHTML;
    var nroCI = localStorage.getItem("nroCI");
    var fechaNac = localStorage.getItem("fechaNac");
    var ide = localStorage.getItem("empID");
    var idTec = document.getElementById("lblTecID").innerHTML;

    if (txtTecNombre == "" || selectedValue == "-1") {
        alert("Debes completar todos los campos antes de guardar");
        return;
    }
    var btn = $('#btnTecSave');
    btn.button('loading');
    setTimeout(function () {
        btn.button('reset');
    }, 3000);

    if (idTec == "0")
        cargaDatosTec('1', txtTecNombre, selectedValue, ide, nroCI, fechaNac);
    else
        cargaDatosTec(idTec, txtTecNombre, selectedValue, ide, nroCI, fechaNac);

    document.getElementById("txtTecNombre").value = "";
}
function saveIdioma() {
    var ddlIdiomas = document.getElementById("lblIdioma").innerHTML;
    var ddlHabla = document.getElementById("lblHabla").innerHTML;
    var ddlEscribe = document.getElementById("lblEscribe").innerHTML;
    var nroCI = localStorage.getItem("nroCI");
    var ide = localStorage.getItem("empID");
    var idIdioma = document.getElementById("lblIdiomaID").innerHTML;

    if (ddlIdiomas == "- Seleccione Idioma -" || ddlHabla == "- Seleciona tu Nivel -" || ddlEscribe == "- Seleciona tu Nivel -") {
        alert("Debes completar todos los campos antes de guardar");
        return;
    }
    var btn = $('#btnIdiSave')
    btn.button('loading')
    setTimeout(function () {
        btn.button('reset')
    }, 3000)

    if (idIdioma == "0")
        cargaDatosIdioma('1', ddlIdiomas, ddlHabla, ddlEscribe, ide, nroCI);
    else
        cargaDatosIdioma(idIdioma, ddlIdiomas, ddlHabla, ddlEscribe, ide, nroCI);


}
function saveExp() {
    var nombre = document.getElementById("txtExpNombre").value;
    var lblExpCategoria = document.getElementById("lblExpCategoria").innerHTML;
    var lblExpPais = document.getElementById("lblExpPais").innerHTML;
    var txtExpNombreEmp = document.getElementById("txtExpNombreEmp").value;
    var lblExpTipoIndEmp = document.getElementById("lblExpTipoIndEmp").innerHTML;
    var lblExpAreaEmp = document.getElementById("lblExpAreaEmp").innerHTML;
    var lblExpFuncionEmp = document.getElementById("lblExpFuncionEmp").innerHTML;
    var actual = "N";
    if (document.getElementById("ckEmpAct").checked)
        actual = "S";
    var txtEmpAnhoInicio = document.getElementById("txtEmpAnhoInicio").value;
    var txtEmpAnhoFin = document.getElementById("txtEmpAnhoFin").value;
    var lblEmpMotivoSalida = document.getElementById("lblEmpMotivoSalida").innerHTML;
    var maneja = "N";
    if (document.getElementById("ckSabeManejar").checked)
        maneja = "S";
    var movil = "N";
    if (document.getElementById("ckMovilidadPropia").checked)
        movil = "S";
    var nroCI = localStorage.getItem("nroCI");
    var ide = localStorage.getItem("empID");
    var txtDescTareas = document.getElementById("txtDescTareas").value;
    var idExpID = document.getElementById("lblExpID").innerHTML;

    if ($('#ddlTieneExpLaboral').val() == 2) {
        if (nombre == "" || txtExpNombreEmp == "" || lblExpTipoIndEmp == "-1" || lblExpAreaEmp == "-1" || lblExpFuncionEmp == "-1" || txtDescTareas == "") {
            alert("Debes completar todos los campos obligatorios * antes de guardar");
            return;
        }
        if (actual == "N" && lblEmpMotivoSalida == "-1") {
            alert("Debes cargar un motivo de salida");
            return;
        }
    }

    var btn = $('#btnExpSave')
    btn.button('loading')
    setTimeout(function () {
        btn.button('reset')
    }, 3000)

    if (idExpID == "0")
        cargaDatosExperiencia('1', nombre, lblExpCategoria, lblExpPais, lblExpTipoIndEmp, lblExpAreaEmp, lblExpFuncionEmp, txtEmpAnhoInicio,
            txtEmpAnhoFin, maneja, txtExpNombreEmp, lblEmpMotivoSalida, movil, ide, nroCI, txtDescTareas);
    else
        cargaDatosExperiencia(idExpID, nombre, lblExpCategoria, lblExpPais, lblExpTipoIndEmp, lblExpAreaEmp, lblExpFuncionEmp, txtEmpAnhoInicio,
            txtEmpAnhoFin, maneja, txtExpNombreEmp, lblEmpMotivoSalida, movil, ide, nroCI, txtDescTareas);

    document.getElementById('btnExperiencia').style.display = 'block';
}
function saveRefencias() {
    var txtExpNombreRefPart1 =
        document.getElementById("txtExpNombreRefPart1").value;
    var txtExpNombreRefPart2 =
        document.getElementById("txtExpNombreRefPart2").value;
    var txtExpCelRefPart1 =
        document.getElementById("txtExpCelRefPart1").value;
    var txtExpCelRefPart2 =
        document.getElementById("txtExpCelRefPart2").value;
    var txtExpRelacionRefPart1 =
        document.getElementById("txtExpRelacionRefPart1").value;
    var txtExpRelacionRefPart2 =
        document.getElementById("txtExpRelacionRefPart2").value;
    var txtExpNombreRefLab1 =
        document.getElementById("txtExpNombreRefLab1").value;
    var txtExpNombreRefLab2 =
        document.getElementById("txtExpNombreRefLab2").value;
    var txtExpEmpresaRefLab1 =
        document.getElementById("txtExpEmpresaRefLab1").value;
    var txtExpEmpresaRefLab2 =
        document.getElementById("txtExpEmpresaRefLab2").value;
    var txtExpCelRefLab1 =
        document.getElementById("txtExpCelRefLab1").value;
    var txtExpCelRefLab2 =
        document.getElementById("txtExpCelRefLab2").value;
    var txtExpRelacionRefLab1 =
        document.getElementById("txtExpRelacionRefLab1").value;
    var txtExpRelacionRefLab2 =
        document.getElementById("txtExpRelacionRefLab2").value;
    var nroCI = localStorage.getItem("nroCI");
    var ide = localStorage.getItem("empID");

    //sendNotif(document.getElementById("txtNombrePostu").value, document.getElementById("txtEditaMail").value, ide);

    cargaDatosReferencias('1', txtExpNombreRefPart1, txtExpCelRefPart1, txtExpRelacionRefPart1, txtExpNombreRefPart2, txtExpCelRefPart2, txtExpRelacionRefPart2,
        txtExpNombreRefLab1, txtExpCelRefLab1, txtExpEmpresaRefLab1, txtExpRelacionRefLab1, txtExpNombreRefLab2, txtExpCelRefLab2, txtExpEmpresaRefLab2,
        txtExpRelacionRefLab2, ide, nroCI);

}
function savePict() {
    var nroCI = $("#txtCiPostulante").val();
    var empID = localStorage.getItem("empID");

    var img = "";
    if ($('.fileinput-preview').find('img')[0] != null) {
        img = $('.fileinput-preview').find('img')[0].src;
    }
    if (img != "") {
        try {

            $.ajax({
                url: "/UI/Externo/ExternoWS.asmx/setFoto",
                data: JSON.stringify({ _cedula: nroCI, _empID: empID, _img: img }),
                contentType: "application/json",
                dataType: "json",
                type: 'POST',
                success: function (data) {
                    document.getElementById("imgPerfil").src = data.d;
                }
            });
        }
        catch (err) {
            alert("Ocurrio un error al guardar la imagen");
        }
    }

}


function UrlVacancias() {
    var idE = localStorage.getItem("empID");
    if (idE === null || idE === "")
        idE = "1";

    window.location = "/UI/Externo/VacanciasList.aspx";
}
function UrlCerrarSesion() {
    window.location.href = localStorage.getItem("clientUrl");
    localStorage.setItem("nroCI", "");
}


function EditarReg(id, tipo) {

    if (tipo == 1) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _idUni: id
            }),
            url: "/UI/Externo/ExternoWS.asmx/getEditaUni",
            dataType: "json",
            success: function (data) {
                if (data.d == "") {
                    $('#gvUni').html("Agrega aqui todas las carreras universitarias que hiciste");
                    return;
                }
                var miObjeto = data;
                var html = "";
                console.log(data.d);
                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);

                                items.forEach(function (key) {
                                    if (key == "tituloID") {
                                        document.getElementById("lblTituloCarrera").innerText = item[key];
                                        $('#ddlTipoFormacion').val(item[key]).trigger('change.select2');
                                    }
                                    if (key == "pais") {
                                        document.getElementById("lblPaisUni").innerText = item[key];
                                        $('#ddlPaisUni').val(item[key]).trigger('change.select2');
                                    }
                                    if (key == "nivelFormacion") {
                                        document.getElementById("lblEstadoEstudio").innerText = item[key];
                                        $('#ddlEstadoEstudio').val(item[key]).trigger('change.select2');
                                    }
                                    if (key == "anoInicio")
                                        $('#txtUniAnhoInicio').val(item[key]);
                                    if (key == "anoFin") {
                                        console.log(item[key]);
                                        if (item[key] == "" || item[key] == null) {
                                            $("[id='ckUniCursando']").bootstrapSwitch('state', true);
                                        } else {
                                            $('#txtUniAnhoFin').val(item[key]);
                                            $("[id='ckUniCursando']").bootstrapSwitch('state', false);
                                        }
                                    }
                                    if (key == "obs")
                                        $('#txtDescripcionEstudio').val(item[key]);
                                    if (key == "nombreUni")
                                        $('#txtUniNombreUni').val(item[key]);

                                });
                                document.getElementById("lbluniID").innerText = id;
                            });
                            ocultaPaneles('none', 'block', 'none', 'none', 'none', 'none', 'none', 'none', 'none');
                        }
                    }
                }
                else {
                    alert("Ups! surgio un problema para editar el registro. Contacta con el administrador: editaUni");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                
            }
        })
    }
    if (tipo == 2) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _idUni: id
            }),
            url: "/UI/Externo/ExternoWS.asmx/getEditaUni",
            dataType: "json",
            success: function (data) {
                if (data.d == "") {

                    return;
                }
                var miObjeto = data;
                var html = "";
                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);

                                items.forEach(function (key) {
                                    if (key == "colegio")
                                        $('#txtSecNombre').val(item[key]);
                                    if (key == "tituloColegio")
                                        $('#txtSecTitulo').val(item[key]);
                                    if (key == "anhoCon")
                                        $('#txtSecAnhoFin').val(item[key]);

                                });
                                document.getElementById("lblSecID").innerText = id;
                            });
                            ocultaPaneles('none', 'none', 'block', 'none', 'none', 'none', 'none', 'none', 'none');
                        }
                    }
                }
                else {
                    alert("Ups! surgio un problema para editar el registro. Contacta con el administrador: editaUni");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                
            }
        })
    }
    if (tipo == 3) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _idTec: id
            }),
            url: "/UI/Externo/ExternoWS.asmx/getEditaTec",
            dataType: "json",
            success: function (data) {
                if (data.d == "") {

                    return;
                }
                var miObjeto = data;
                var html = "";
                try {

                    if (data.d != "[{resultado: 'No'}]") {
                        for (var propiedad in miObjeto) {
                            if (miObjeto.hasOwnProperty(propiedad)) {
                                var datos = JSON.parse(miObjeto[propiedad]);

                                datos.forEach(function (item) {
                                    var items = Object.keys(item);

                                    items.forEach(function (key) {
                                        if (key == "DetalleConot")
                                            $('#txtTecNombre').val(item[key]);
                                        if (key == "idRefeConot") {
                                            document.getElementById("lblTecNivelCono").innerText = item[key];
                                            $('#ddlTecNivelConocimiento').val(item[key]).trigger('change.select2');
                                        }

                                    });
                                    document.getElementById("lblTecID").innerText = id;
                                });
                                ocultaPaneles('none', 'none', 'none', 'block', 'none', 'none', 'none', 'none', 'none');
                            }
                        }
                    }
                } catch (ex) {
                    alert("Ups! surgio un problema para editar el registro. Contacta con el administrador: editaTec " + ex);

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                
            }
        })
    }
    if (tipo == 4) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _idIdioma: id
            }),
            url: "/UI/Externo/ExternoWS.asmx/getEditaIdioma",
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

                                        if (key == "idioma") {
                                            document.getElementById("lblIdioma").innerText = item[key];
                                            $('#ddlIdiomas').val(item[key]).trigger('change.select2');
                                        }
                                        if (key == "habla") {
                                            document.getElementById("lblHabla").innerText = item[key];
                                            $('#ddlHablaIdioma').val(item[key]).trigger('change.select2');
                                        }
                                        if (key == "leeescribe") {
                                            document.getElementById("lblEscribe").innerText = item[key];
                                            $('#ddlLeeEscribe').val(item[key]).trigger('change.select2');
                                        }

                                    });
                                    document.getElementById("lblIdiomaID").innerText = id;
                                });
                                ocultaPaneles('none', 'none', 'none', 'none', 'block', 'none', 'none', 'none', 'none');
                            }
                        }
                    }
                } catch (ex) {
                    alert("Ups! surgio un problema para editar el registro. Contacta con el administrador: editaIdioma " + ex);

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                
            }
        })
    }
    if (tipo == 5) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _idExp: id
            }),
            url: "/UI/Externo/ExternoWS.asmx/getEditaExp",
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

                                        if (key == "nombrePuesto")
                                            $('#txtExpNombre').val(item[key]);
                                        if (key == "Empresa")
                                            $('#txtExpNombreEmp').val(item[key]);
                                        if (key == "fechaIni")
                                            $('#txtEmpAnhoInicio').val(item[key]);
                                        if (key == "obs")
                                            $('#txtDescTareas').val(item[key]);

                                        if (key == "fechaFin") {

                                            if (item[key] == "" || item[key] == null) {
                                                $("[id='ckEmpAct']").bootstrapSwitch('state', true);
                                            } else {
                                                $('#txtEmpAnhoFin').val(item[key]);
                                                $("[id='ckEmpAct']").bootstrapSwitch('state', false);
                                            }
                                        }
                                        if (key == "tipoIndId") {
                                            document.getElementById("lblExpTipoIndEmp").innerText = item[key];
                                            $('#ddlTipoIndustria').val(item[key]).trigger('change.select2');
                                        }
                                        if (key == "AreaTraId") {
                                            document.getElementById("lblExpAreaEmp").innerText = item[key];
                                            $('#ddlEmpAreaTrabajo').val(item[key]).trigger('change.select2');
                                        }
                                        if (key == "Pais") {
                                            document.getElementById("lblExpPais").innerText = item[key];
                                            $('#ddlExpPais').val(item[key]).trigger('change.select2');
                                        }
                                        if (key == "categoria") {
                                            document.getElementById("lblExpCategoria").innerText = item[key];
                                            $('#ddlExpCategoria').val(item[key]).trigger('change.select2');
                                        }
                                        if (key == "funcion") {
                                            document.getElementById("lblExpFuncionEmp").innerText = item[key];
                                            $('#ddlSubAreaTrabajo').val(item[key]).trigger('change.select2');
                                        }
                                        if (key == "motivoSalida") {
                                            document.getElementById("lblEmpMotivoSalida").innerText = item[key];
                                            $('#ddlEmpMotSalida').val(item[key]).trigger('change.select2');
                                        }

                                    });
                                    document.getElementById("lblExpID").innerText = id;
                                });

                                document.getElementById("pnlExpSel").style.display = 'none';
                                document.getElementById("pnlExpLab").style.display = 'block';
                                document.getElementById("pnlFooter").style.display = 'none';
                            }
                        }
                    }
                } catch (ex) {
                    alert("Ups! surgio un problema para editar el registro. Contacta con el administrador: editaExp " + ex);

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                
            }
        })
    }
}
function EliminaReg(id, tipo) {
    var nroCI = localStorage.getItem("nroCI");
    var ide = localStorage.getItem("empID");

    document.getElementById('btnUniversitaria').style.display = 'block';
    document.getElementById('btnExperiencia').style.display = 'block';
    document.getElementById('btnSecundaria').style.display = 'block';

    if (tipo == 3) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _id: id, _lblID: ide, _nroCI: nroCI
            }),
            url: "/UI/Externo/ExternoWS.asmx/setEliminaTec",
            dataType: "json",
            success: function (data) {
                if (data.d == "") {
                    $('#gvConTec').html("Tienes otros conocimientos tecnicos? agrega aqui.");
                    return;
                }
                var miObjeto = data;
                var html = "";
                console.log(data.d);
                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);
                                var id = "";
                                var Descripcion = "";
                                var Nivel = "";

                                items.forEach(function (key) {
                                    if (key == "idConot")
                                        id = item[key];
                                    if (key == "DetalleConoT")
                                        Descripcion = item[key];
                                    if (key == "NIVEL")
                                        Nivel = item[key];
                                });
                                //Crea HTML
                                html += "<div class='blog-twitter-block'><a>" + Nivel + "</a><p>" + Descripcion;
                                html += "<span class='pull-right'><input type='button' onclick='EliminaReg(" + id + ",3);' value='ELIMINAR' /></span></p><hr /> </div> ";

                            });

                            $('#gvConTec').html(html);
                            ocultaFormacion("block", "none", "none", "none", "none", "block", "block", "block", "block");
                        }
                    }
                }
                else {
                    alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: setEliminaTec");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                
            }
        })
    }
    if (tipo == 2) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _id: id, _lblID: ide, _nroCI: nroCI
            }),
            url: "/UI/Externo/ExternoWS.asmx/setEliminaSecundaria",
            dataType: "json",
            success: function (data) {
                if (data.d == "") {
                    $('#gvSec').html("Agrega aqui tu educacion secundaria");

                    $('#ddlTieneSec').val("-1");
                    document.getElementById('pnlYNSec').style.display = "block";
                    return;
                }
                var miObjeto = data;
                var html = "";
                console.log(data.d);
                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);
                                var id = "";
                                var Descripcion = "";
                                var Nivel = "";
                                var anho = "";

                                items.forEach(function (key) {
                                    if (key == "IDFormacion")
                                        id = item[key];
                                    if (key == "tituloColegio")
                                        Descripcion = item[key];
                                    if (key == "nomColegio")
                                        Nivel = item[key];
                                    if (key == "culminoColegio")
                                        anho = item[key];
                                });
                                //Crea HTML
                                html += "<div class='blog-twitter-block'><a>" + Descripcion + " - " + anho + "</a><p>" + Nivel;
                                html += "<span class='pull-right'><input type='button' onclick='EliminaReg(" + id + ",2);' value='ELIMINAR' /></span></p><hr /> </div> ";

                            });

                            $('#gvSec').html(html);
                            ocultaFormacion("block", "none", "none", "none", "block", "block", "block", "block", "block");
                        }
                    }
                }
                else {
                    alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: setEliminaSecundaria");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                
            }
        })
    }
    if (tipo == 1) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _id: id, _lblID: ide, _nroCI: nroCI
            }),
            url: "/UI/Externo/ExternoWS.asmx/setEliminaUni",
            dataType: "json",
            success: function (data) {
                if (data.d == "") {
                    $('#gvUni').html("Agrega aqui todas las carreras universitarias que hiciste");
                    $('#ddlTieneUni').val("-1");
                    document.getElementById('pnlYNUni').style.display = "block";
                    return;
                }
                var miObjeto = data;
                var html = "";
                console.log(data.d);
                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);
                                var id = "";
                                var Descripcion = "";
                                var Nivel = "";
                                var anho = "";

                                items.forEach(function (key) {
                                    if (key == "IDFormacion")
                                        id = item[key];
                                    if (key == "Titulo")
                                        Descripcion = item[key];
                                    if (key == "Universidad")
                                        Nivel = item[key];
                                    if (key == "anoInicio")
                                        anho = item[key];
                                });
                                //Crea HTML
                                html += "<div class='blog-twitter-block'><a>" + Descripcion + " - " + anho + "</a><p>" + Nivel;
                                html += "<span class='pull-right'><input type='button' onclick='EliminaReg(" + id + ",2);' value='ELIMINAR' /></span></p><hr /> </div> ";

                            });

                            $('#gvUni').html(html);
                            ocultaFormacion("block", "none", "none", "none", "block", "block", "block", "block", "block");
                        }
                    }
                }
                else {
                    alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: setEliminaUni");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                
            }
        })
    }
    if (tipo == 4) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _id: id, _lblID: ide, _nroCI: nroCI
            }),
            url: "/UI/Externo/ExternoWS.asmx/setEliminaIdiomas",
            dataType: "json",
            success: function (data) {
                if (data.d == "") {
                    $('#gvIdioma').html("Tienes conocimientos en idiomas? agrega aqui");
                    return;
                }
                var miObjeto = data;
                var html = "";
                console.log(data.d);
                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);
                                var id = "";
                                var Descripcion = "";
                                var Nivel = "";
                                var anho = "";

                                items.forEach(function (key) {
                                    if (key == "idIdioma")
                                        id = item[key];
                                    if (key == "idioma")
                                        Descripcion = item[key];
                                    if (key == "habla")
                                        Nivel = item[key];
                                    if (key == "LeeEscribe")
                                        habla = item[key];
                                });
                                //Crea HTML
                                html += "<div class='blog-twitter-block'><a>Habla: " + Nivel + " - Lee y Escribe " + habla + "</a><p>" + Descripcion;
                                html += "<span class='pull-right'><input type='button' onclick='EliminaReg(" + id + ",4);' value='ELIMINAR' /></span></p><hr /> </div> ";

                            });
                            $('#gvIdioma').html(html);
                            ocultaFormacion("block", "none", "none", "none", "none", "block", "block", "block", "block");
                        }
                    }
                }
                else {
                    alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: setEliminaIdiomas");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                
            }
        })
    }
    if (tipo == 5) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _id: id, _lblID: ide, _nroCI: nroCI
            }),
            url: "/UI/Externo/ExternoWS.asmx/setEliminaExpLab",
            dataType: "json",
            success: function (data) {
                if (data.d == "") {
                    $('#gvExp').html("Agrega aqui todos los trabajos donde estuviste.");

                    $('#ddlTieneExpLaboral').val("-1");
                    document.getElementById('pnlYNEL').style.display = "block";

                    return;
                }
                var miObjeto = data;
                var html = "";
                console.log(data.d);
                if (data.d != "[{resultado: 'No'}]") {
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);

                            datos.forEach(function (item) {
                                var items = Object.keys(item);
                                var id = "";
                                var Descripcion = "";
                                var Nivel = "";
                                var anho = "";

                                items.forEach(function (key) {
                                    if (key == "expID")
                                        id = item[key];
                                    if (key == "empresa")
                                        Descripcion = item[key];
                                    if (key == "hasta")
                                        HastaFecha = item[key];
                                    if (key == "expFechaIni")
                                        Inicio = item[key];
                                });
                                //Crea HTML
                                html += "<div class='blog-twitter-block'><p><b>" + Descripcion + "</b></p><p><b>Fecha de Inicio: </b>" + Inicio + "<b>Hasta: </b>" + HastaFecha;
                                html += " <span class='pull-right'><input type='button' onclick='EliminaReg(" + id + ",5);' value='ELIMINAR' /></span></p><hr /> </div> ";

                            });
                            $('#gvExp').html(html);
                            ocultaExp("block", "none", "block");
                        }
                    }
                }
                else {
                    alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: setEliminaExpLab");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
                
            }
        })
    }
    alert("Registro Eliminado");
}


function sinExp(vDesde) {
    if (vDesde == "1") {

        document.getElementById('btnExperiencia').style.display = 'none';
        actualizaExpe(1);
    }
    else {
        document.getElementById('btnExperiencia').style.display = 'block';
        ocultaExp("none", "block", "none");
        actualizaExpe(2);
    }
}
function sinUni(vDesde) {
    if (vDesde == "1") {

        document.getElementById('btnUniversitaria').style.display = 'none';
        actualizaUni(1);
    }
    else {
        document.getElementById('btnUniversitaria').style.display = 'block';
        ocultaFormacion("none", "block", "none", "none", "none", "none", "none", "none", "none");
        actualizaUni(2);
    }
}
function sinSec(vDesde) {
    if (vDesde == "1") {

        document.getElementById('btnSecundaria').style.display = 'none';
        actualizaSec(1);
    }
    else {
        console.log(vDesde);
        document.getElementById('btnSecundaria').style.display = 'block';
        ocultaFormacion("none", "none", "block", "none", "none", "none", "none", "none", "none");
        actualizaSec(2);
    }
}

function actualizaExpe(vtipo) {
    var vcedula = localStorage.getItem("nroCI");
    var vempID = localStorage.getItem("empID");

    var datosTabla = [];
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ cedula: vcedula, empID: vempID, tipo: vtipo }),
        url: "/UI/Externo/ExternoWS.asmx/actualizaExp",
        dataType: "json",
        success: function (data) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
        }
    });

};
function actualizaUni(vtipo) {
    var vcedula = localStorage.getItem("nroCI");
    var vempID = localStorage.getItem("empID");

    var datosTabla = [];
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ cedula: vcedula, empID: vempID, tipo: vtipo }),
        url: "/UI/Externo/ExternoWS.asmx/actualizaUni",
        dataType: "json",
        success: function (data) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
        }
    });

};
function actualizaSec(vtipo) {
    var vcedula = localStorage.getItem("nroCI");
    var vempID = localStorage.getItem("empID");

    var datosTabla = [];
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ cedula: vcedula, empID: vempID, tipo: vtipo }),
        url: "/UI/Externo/ExternoWS.asmx/actualizaSec",
        dataType: "json",
        success: function (data) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
        }
    });

};
function sendMailConf() {
    var vcedula = localStorage.getItem("nroCI");
    var vempID = localStorage.getItem("empID");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _nroCI: vcedula, _empID: vempID, _type: 'New'
        }),
        url: "/UI/Vacancias/VacanciasDet.asmx/sendMail",
        dataType: "json",
        success: function (data) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            
        }
    })
}