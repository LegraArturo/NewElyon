jQuery(document).ready(function () {
    var userID = getParameterByName("User").replace(" ", "+");
    var empID = getParameterByName("Emp").replace(" ", "+");

    if (userID == null || userID == "" || empID == "" || empID == null) {
        userID = localStorage.getItem("userID");
        empID = localStorage.getItem("empID");
    }
    if (userID == null || userID == "" || empID == "" || empID == null)
        window.location = "/UI/VistasDefault/Login.aspx";

    localStorage.setItem("userID", userID.replace(" ", "+"));
    localStorage.setItem("empID", empID.replace(" ", "+"));

    getVacanciasList();
    getVacResume();
});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function getVacanciasList() {
    var userID = localStorage.getItem("userID");
    var empID = localStorage.getItem("empID");

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _usuID: userID.replace(" ", "+"), _empID: empID.replace(" ", "+")
        }),
        url: "/UI/Vacancias/VacanciasDet.asmx/getVacListResumen",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;
            var html = "";
            var html2 = "";
            try {
                if (data.d != "[{resultado: 'No'}]") {
                    localStorage.setItem("data", data.d);
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);
                            $('#gvDetOpen').html("");
                            $('#gvDetClose').html("");
                            datos.forEach(function (item) {
                                var items = Object.keys(item);
                                var id = "";
                                var Nombre = "";
                                var cant = "";
                                var usu = "";
                                var estado = "";

                                items.forEach(function (key) {
                                    if (key == "vac")
                                        Nombre = item[key];
                                    if (key == "cant")
                                        cant = item[key];
                                    if (key == "usu")
                                        usu = item[key];
                                    if (key == "id")
                                        id = item[key];
                                    if (key == "estado")
                                        estado = item[key];

                                });
                                if (estado == 'A') {
                                    html += '<tr><td><a href="javascript:OpenVac(1,' + id + ');">' + Nombre + '</a></td><td>' + cant + '</td><td>' + usu + '</td><td><a href="javascript:OpenVac(1,' + id + ');" class="btn default btn-xs green-stripe">Ver </a></td></tr> ';
                                    $('#gvDetOpen').append(html);
                                    html = "";
                                }
                                else {
                                    html2 += '<tr><td><a href="javascript:OpenVac(2,' + id + ');">' + Nombre + '</a></td><td>' + cant + '</td><td>' + usu + '</td><td><a href="javascript:OpenVac(2,' + id + ');" class="btn default btn-xs green-stripe">Ver </a></td></tr> ';
                                    $('#gvDetClose').append(html2);
                                    html2 = "";
                                }

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
            debugger;
        }
    })
}
function getVacResume() {
    var userID = localStorage.getItem("userID");
    var empID = localStorage.getItem("empID");

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _empID: empID.replace(" ", "+")
        }),
        url: "/UI/Vacancias/VacanciasDet.asmx/getVacResume",
        dataType: "json",
        success: function (data) {
            if (data.d == "") {
                return;
            }
            var miObjeto = data;
            var html = "";
            try {
                if (data.d != "[{resultado: 'No'}]") {
                    localStorage.setItem("data", data.d);
                    for (var propiedad in miObjeto) {
                        if (miObjeto.hasOwnProperty(propiedad)) {
                            var datos = JSON.parse(miObjeto[propiedad]);
                            $('#gvResume').html("");
                            datos.forEach(function (item) {
                                var items = Object.keys(item);
                                var Nombre = "";
                                var foto = "";
                                var Total = "";
                                var abierto = "";
                                var cerrado = "";
                                var usuario = "";

                                items.forEach(function (key) {
                                    if (key == "nombre")
                                        Nombre = item[key];
                                    if (key == "foto") {
                                        if (item[key] != "")
                                            foto = item[key];
                                        else
                                            foto = 'http://www.anesapa.org/wp-content/uploads/2014/03/25_04_2012__10_23_18___foto_23.jpg';
                                    }
                                    if (key == "Total")
                                        Total = item[key];
                                    if (key == "abierto")
                                        abierto = item[key];
                                    if (key == "cerrado")
                                        cerrado = item[key];
                                    if (key == "usuario")
                                        usuario = item[key];

                                });
                                var rate = Math.round((cerrado / Total) * 100, 0);
                                var cadena1 = "'" + usuario + "'";
                                html += '<tr><td class="fit"><img class="user-pic" src="' + foto + '">';
                                html += '</td><td><a href="javascript:OpenVac(1, ' + cadena1 + ');" class="primary-link">' + Nombre + '</a></td><td>' + Total + '</td><td>' + abierto + '</td><td>' + cerrado + '</td><td><span class="bold theme-font-color">' + rate + '%</span></td></tr>';
                                $('#gvResume').append(html);
                                html = "";
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
            debugger;
        }
    })
}
function OpenVac(type, id) {
    window.location = "/UI/Vacancias/Vacancias.aspx?type=" + type + "&number=" + id;
}
