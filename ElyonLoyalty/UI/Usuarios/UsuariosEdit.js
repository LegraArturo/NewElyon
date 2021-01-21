
$(document).ready(function inicia() {
    startTiming();
    Metronic.init();
    Layout.init();
    Profile.init();
    $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Aguarda un momento...</strong></h4><p>Estamos procesando la informacion..</p></div></div>');

    var usuIDparam = getParameterByName("usuID");
    if (usuIDparam !== null && usuIDparam !== "") {
        cargaData(usuIDparam);
        document.getElementById('ov').href = "/UI/Usuarios/extra_profile.html?usuID=" + usuIDparam;
        document.getElementById('ed').href = "/UI/Usuarios/extra_profile_account.html?usuID=" + usuIDparam;
    }
});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
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
function cargaData(usuIDparam) {

    $('#txtNombres').val("");
    $('#txtApellidos').val("");
    $('#txtTel').val("");
    $('#txtLogin').val("");
    $('#txtEmail').val("");

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _usuID: usuIDparam,
            _type: 'I',
            _nombre: '',
            _apellidos: '',
            _sucID: '0',
            _email: '',
            _tel: '',
            _login: ''
        }),
        url: "/UI/GetDataWS.asmx/setUsuarios",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> No tenemos registros.</p></div></div>');
                return;
            }

            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var menu = mytables["Table"];

                    /// Actualiza DDL
                    var empresas = mytables["Table1"];
                    var ddlEmpresas = "#ddlEmpresa";
                    //Carga Empresas
                    for (a = 0; a < empresas.length; a++) {
                        var $option = $("<option></option>").val(empresas[a]["ID"]).text(empresas[a]["nombre"]);
                        $(ddlEmpresas).append($option).trigger('change');
                    }
                    $(ddlEmpresas).on('change', function (evt) {
                        if ($(ddlEmpresas).select2().select2('val') !== null) {
                            var valor = $(ddlEmpresas).select2().select2('val');
                            document.getElementById("lblEmpresaID").value = valor;
                            cargarDDLSucursal(valor);
                        }
                    });

                    var sucursal = mytables["Table2"];
                    sessionStorage.setItem("ListaSucursal", JSON.stringify(sucursal));

                    var ddlSucursal = "#ddlSucursal";
                    //Carga Sucursales
                    for (a = 0; a < sucursal.length; a++) {
                        $(ddlSucursal).append($("<option></option>").val(sucursal[a]["ID"]).text(sucursal[a]["nombre"])).trigger('change');
                    }
                    $(ddlSucursal).on('change', function (evt) {
                        if ($(ddlSucursal).select2().select2('val') !== null) {
                            var valor = $(ddlSucursal).select2().select2('val');
                            document.getElementById("lblSucID").value = valor;
                        }
                    });

                    $('#txtNombres').val(menu[0]["nombres"]);
                    $('#txtApellidos').val(menu[0]["apellidos"]);
                    $('#txtTel').val(menu[0]["tel"]);
                    $('#txtLogin').val(menu[0]["usulogin"]);
                    $('#txtEmail').val(menu[0]["email"]);

                    $('#ddlEmpresa').val(menu[0]["empID"]);
                    $('#lblEmpresaID').val(menu[0]["empID"]);
                    $('#ddlSucursal').val(menu[0]["sucID"]);
                    $('#lblSucID').val(menu[0]["sucID"]);

                    var estado = menu[0]["Estado"];
                    var btn2 = document.createElement('a');
                    btn2.className = "btn btn-circle green-haze btn-sm";
                    btn2.textContent = "ACTIVO";
                    btn2.href = "javascript:ActiveUsu(1);";

                    if (estado === 'INACTIVO') {
                        btn2.className = "btn btn-circle btn-danger btn-sm";
                        btn2.textContent = "INACTIVO";
                        btn2.href = "javascript:ActiveUsu(2);";
                    }
                    document.getElementsByClassName('profile-userbuttons')[0].append(btn2);

                    document.getElementById('imgUsu').src = menu[0]["foto"];
                    document.getElementById('imgUsu2').src = menu[0]["foto"];

                    document.getElementsByClassName('profile-usertitle-name')[0].textContent = menu[0]["nombres"] + " " + menu[0]["apellidos"];
                    document.getElementById('lblMail').textContent = menu[0]["email"];
                    document.getElementById('lblTel').textContent = menu[0]["tel"];
                    document.getElementById('lblnroCI').textContent = menu[0]["usulogin"];
                    document.getElementsByClassName('profile-desc-title')[0].textContent = "Acerca de " + menu[0]["nombres"];
                    document.title = menu[0]["nombres"] + " " + menu[0]["apellidos"];
                    document.getElementsByClassName('profile-desc-text')[0].textContent = menu[0]["descripcion"];
                    document.getElementById('lblUsuID').textContent = menu[0]["usuID"];

                    // PTS
                    if (mytables["Table3"].length > 0) {
                        document.getElementsByClassName('profile-stat-title')[0].textContent = mytables["Table3"][0]["cantPts"];
                        document.getElementsByClassName('profile-stat-title')[1].textContent = mytables["Table3"][0]["ptsCanjeados"];
                        document.getElementsByClassName('profile-stat-title')[2].textContent = mytables["Table3"][0]["TotalPts"];
                    }
                    $('#pnlCargando').html(null);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });
}
function detail(usuID) {
    window.open("/UI/Usuarios/extra_profile.html?usuID=" + usuID);
}
function detailEdit() {
    var usuIDparam = getParameterByName("usuID");
    if (usuIDparam !== null)
        window.open("/UI/Usuarios/extra_profile_account.html?usuID=" + usuIDparam, "_self");
    else
        alert("no tiene usuario. Volver al Inicio");
}
function cargarDDLSucursal(empID) {
    var datoSession = sessionStorage.getItem("ListaSucursal");
    var datoParse = JSON.parse(datoSession);
    var ddlSucursal = "#ddlSucursal";

    var datosFILTRADO = datoParse.filter(function (i, n) {
        return i.empID == empID;
    });

    $(ddlSucursal).empty().trigger("change");

    $(ddlSucursal).append($("<option></option>").val("-1").text("-Selecciona una opcion-"));

    for (a = 0; a < datosFILTRADO.length; a++) {
        $(ddlSucursal).append($("<option></option>").val(datosFILTRADO[a]["ID"]).text(datosFILTRADO[a]["nombre"])).trigger('change');
    }
}
function saveData() {
    var txtNombres = $('#txtNombres').val();
    updData('U', txtNombres);
}
function ActiveUsu(estado) {
    var Alerta = "Estas seguro que quieres inactivar el Usuario?";
    if (estado === 2) {
        Alerta = "Quieres Habilitar el usuario?";
    }

    if (confirm(Alerta) == false) {
        return;
    }
    updData('D', estado);

    var btn2 = document.createElement('a');
    btn2.className = "btn btn-circle green-haze btn-sm";
    btn2.textContent = "ACTIVO";
    btn2.href = "javascript:ActiveUsu(1);";

    if (estado === 1) {
        btn2.className = "btn btn-circle btn-danger btn-sm";
        btn2.textContent = "INACTIVO";
        btn2.href = "javascript:ActiveUsu(2);";
    }
    $('.profile-userbuttons').empty()
    document.getElementsByClassName('profile-userbuttons')[0].append(btn2);
}
function updData(type, nombres) {
    var txtApellidos = $('#txtApellidos').val();
    var txtTel = $('#txtTel').val();
    var txtLogin = $('#txtLogin').val();
    var txtEmail = $('#txtEmail').val();
    var lblSucID = $('#lblSucID').val();
    var lblUsuID = document.getElementById('lblUsuID').textContent;

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _usuID: lblUsuID,
            _type: type,
            _nombre: nombres,
            _apellidos: txtApellidos,
            _sucID: lblSucID,
            _email: txtEmail,
            _tel: txtTel,
            _login: txtLogin
        }),
        url: "/UI/GetDataWS.asmx/setUsuarios",
        dataType: "json",
        success: function (data) {
            showToast("Correcto!", "Genial! actualizamos los datos", "success");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#pnlCargandoDetalles').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });
}
function changePwd() {

    var pwd = $('#pwd1').val();
    var pwd2 = $('#pwd2').val();
    var lblUsuID = document.getElementById('lblUsuID').textContent;

    if (pwd === pwd2) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _usuID: lblUsuID,
                _type: "P",
                _nombre: pwd,
                _apellidos: "",
                _sucID: "",
                _email: "",
                _tel: "",
                _login: ""
            }),
            url: "/UI/GetDataWS.asmx/setPass",
            dataType: "json",
            success: function (data) {
                showToast("Correcto", "Contrasena cambiada con exito", "success");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#pnlCargandoDetalles').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
                return;
            }
        });
    } else {
        showToast("Incorrecto", "Los textos no son iguales. Verifica", "error");
    }
}
function savePict() {
    var lblUsuID = document.getElementById('lblUsuID').textContent
    var img = "";

    if ($('.fileinput-preview').find('img')[0] != null) {
        img = $('.fileinput-preview').find('img')[0].src;
    }
    if (img != "") {
        try {
            var mytables = null;
            $.ajax({
                url: "/UI/GetDataWS.asmx/setFoto",
                data: JSON.stringify({ _usuID: lblUsuID, _img: img }),
                contentType: "application/json",
                dataType: "json",
                type: 'POST',
                success: function (data) {

                    for (var propiedad in data) {
                        if (data.hasOwnProperty(propiedad)) {
                            mytables = JSON.parse(data[propiedad]);
                            var menu = mytables["Table"];
                            document.getElementById('imgUsu').src = menu[0]["foto"];
                            document.getElementById('imgUsu2').src = menu[0]["foto"];
                        }
                    }
                }
            });
        }
        catch (err) {
            alert("Ocurrio un error al guardar la imagen");
        }
    }

}