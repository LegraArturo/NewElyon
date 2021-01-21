let pnlTop = 2;
$(document).ready(function inicia() {
    startTiming();
    Metronic.init();
    Layout.init();
    $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Aguarda un momento...</strong></h4><p>Estamos procesando la informacion..</p></div></div>');

    var usuIDparam = getParameterByName("usuID");
    if (usuIDparam !== null && usuIDparam !== "") {
        Profile.init();
        document.getElementById('ov').href = "/UI/Usuarios/extra_profile.html?usuID=" + usuIDparam;
        document.getElementById('ed').href = "/UI/Usuarios/extra_profile_account.html?usuID=" + usuIDparam;
        cargaUsuData(usuIDparam);
        loadDashBoard(usuIDparam);
    }
    else
        cargaData();
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
function cargaData() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _usuID: "0",
            _type: 'S',
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
            var result = [];
            var dataSet = [];
            var table = $('#tb');
            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var menu = mytables["Table"];
                    var titulos = Object.keys(menu[0]);

                    //Inserta los titulos 
                    for (a = 0; a < titulos.length; a++) {
                        var nCloneTh = document.createElement('th');
                        nCloneTh.innerText = titulos[a];
                        table.find('thead tr').each(function () {
                            this.appendChild(nCloneTh);
                        });
                    }
                    //Agrego Boton
                    var ColumnaBoton = document.createElement('th');
                    table.find('thead tr:last').each(function () {
                        this.appendChild(ColumnaBoton);
                    });


                    // Inserta los campos segun los titulos
                    for (a = 0; a < menu.length; a++) {
                        var nCloneTt = document.createElement('tr');
                        table.find('tbody').each(function () {
                            this.appendChild(nCloneTt.cloneNode(true));
                        });
                        for (t = 0; t < titulos.length; t++) {
                            var tit = titulos[t];
                            var nCloneTd = document.createElement('td');
                            nCloneTd.innerText = menu[a][tit];
                            // controla si se muestra el campo para agregar
                            table.find('tbody tr:last').each(function () {
                                this.appendChild(nCloneTd.cloneNode(true));
                            });
                        }
                        //AGrega el boton
                        var nCloneTdbtn = document.createElement('td');
                        var btn = document.createElement('a');
                        btn.className = "btn default btn-xs green-stripe";
                        btn.innerHTML = "Ver Detalles";
                        btn.style.position = "center";
                        btn.href = "javascript:detail(" + menu[a]["usuID"] + ");";
                        nCloneTdbtn.appendChild(btn);
                        table.find('tbody tr:last').each(function () {
                            this.appendChild(nCloneTdbtn.cloneNode(true));
                        });
                    }
                    tableInit(table, "#tb_wrapper", titulos);

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
function muestra(tituloCampo) {
    switch (tituloCampo) {
        case "fotoFactura":
            return false;
        case "controlReg":
            return false;

    }
    return true;
}
function tableInit(table, wrapper, Columnas) {
    var oTable = table.dataTable({

        // Internationalisation. For more info refer to http://datatables.net/manual/i18n
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "No data available in table",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "No encontramos registros",
            "infoFiltered": "(filtrado 1 de _MAX_ total registros)",
            "lengthMenu": "muestra _MENU_ registros",
            "search": "Busca:",
            "zeroRecords": "No encontramos el registro buscado"
        },

        "columnDefs": [{
            "orderable": false,
            "targets": [0]
        }],
        "order": [
            [1, 'asc']
        ],
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "Todos"] // change per page values here
        ],
        // set the initial value
        "pageLength": 10,
        "destroy": true,
    });
    var tableWrapper = $(wrapper); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper

    tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown

    table.on('click', ' tbody td .row-details', function () {
        var nTr = $(this).parents('tr')[0];
        if (oTable.fnIsOpen(nTr)) {
            /* This row is already open - close it */
            $(this).addClass("row-details-close").removeClass("row-details-open");
            oTable.fnClose(nTr);
        } else {
            /* Open this row */
            $(this).addClass("row-details-open").removeClass("row-details-close");
            oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
        }
    });

    //oculta columnas en base a la lista de columnas 
    for (a = 0; a < Columnas.length - 1; a++) {
        if (!muestra(Columnas[a])) {
            {
                var Columna = a + 1;
                var bVis = oTable.fnSettings().aoColumns[Columna].bVisible;
                oTable.fnSetColumnVis(Columna, (bVis ? false : true));
            }
        }
    }
}
function detail(usuID) {
    window.open("/UI/Usuarios/extra_profile.html?usuID=" + usuID);
}
function cargaUsuData(usuIDparam) {
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

                    document.getElementsByClassName('profile-usertitle-name')[0].textContent = menu[0]["nombres"] + " " + menu[0]["apellidos"];
                    document.getElementById('lblMail').textContent = menu[0]["email"];
                    document.getElementById('lblTel').textContent = menu[0]["tel"];
                    document.getElementById('lblnroCI').textContent = menu[0]["usulogin"];
                    document.getElementsByClassName('profile-desc-title')[0].textContent = "Acerca de " + menu[0]["nombres"];
                    document.getElementsByClassName('profile-desc-text')[0].textContent = menu[0]["descripcion"];
                    document.getElementById('lblUsuID').textContent = menu[0]["usuID"];
                    document.title = menu[0]["nombres"] + " " + menu[0]["apellidos"];
                    document.getElementById('b1t').textContent = 'TOP 5 ' + menu[0]["empresa"];

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
function ActiveUsu(estado) {
    showToast("Info", "Ve hasta la opcion de Editar Datos", "warning");
}
function loadDashBoard(usuID) {
    ranking(usuID);
    feeds(usuID);
    canjes(usuID);
}
function ranking(usuID) {
    $('#tpCargando').html('<p>Cargando datos....</p>');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _type: 'T',
            _usuID: usuID
        }),
        url: "/UI/GetDataWS.asmx/getDashboard",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                $('#tpCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> No tenemos registros.</p></div></div>');
                return;
            }

            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var HOY = mytables["Table"];
                    var MES = mytables["Table1"];

                    generaTabla($('#t5h'), HOY);
                    generaTabla($('#t5m'), MES);

                    minigraf(mytables["Table2"]);
                    $('input[name="options"]').change(function () {
                        ocultaTop(pnlTop);
                    })

                    $('#tpCargando').html(null);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#tpCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });
}
function minigraf(datos) {
    ary = [];
    ary2 = []
    var totalpts = 0;
    var totalSol = 0;
    $.each(datos, function (i, item) {
        ary.push(item.pts);
        ary2.push(item.cantSol);
        totalpts += item.pts;
        totalSol += item.cantSol;
    });

    $("div.stat-number").find("div.number")[0].textContent = totalpts;
    $("div.stat-number").find("div.number")[1].textContent = totalSol;

    if (Metronic.isIE8() && !Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () { },
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }


    $("#sparkline_bar3").sparkline(ary, {
        type: 'bar',
        width: '100',
        barWidth: 7,
        height: '45',
        barColor: '#5C9BD1',
        negBarColor: '#e02222'
    });

    $("#sparkline_barPts").sparkline(ary2, {
        type: 'bar',
        width: '100',
        barWidth: 7,
        height: '45',
        barColor: '#F36A5B',
        negBarColor: '#e02222'
    });


}
function ocultaTop(tipo) {
    if (tipo === 1) {
        $("#t5h").show();
        $("#t5m").hide();
        pnlTop = 2;
    } else {
        $("#t5h").hide();
        $("#t5m").show();
        pnlTop = 1;
    }
}
function generaTabla(nombreTabla, datos) {
    // Tabla Dia
    var tableDia = nombreTabla;
    var HOY = datos;

    for (a = 0; a < HOY.length; a++) {
        var nCloneTt = document.createElement('tr');
        tableDia.find('tbody').each(function () {
            this.appendChild(nCloneTt.cloneNode(true));
        });

        var nCloneTd = document.createElement('td');
        nCloneTd.className = "fit";
        var img = document.createElement('img');
        img.className = "user-pic";
        img.src = HOY[a]["foto"];
        nCloneTd.appendChild(img);
        tableDia.find('tbody tr:last').each(function () {
            this.appendChild(nCloneTd.cloneNode(true));
        });

        var nCloneTd1 = document.createElement('td');
        var link = document.createElement('a');
        link.className = "primary-link";
        link.textContent = HOY[a]["nombres"];
        link.href = "/UI/Usuarios/extra_profile.html?usuID=" + HOY[a]["usuID"];
        nCloneTd1.appendChild(link);
        tableDia.find('tbody tr:last').each(function () {
            this.appendChild(nCloneTd1.cloneNode(true));
        });

        var nCloneTd2 = document.createElement('td');
        nCloneTd2.innerText = HOY[a]["totalPts"];
        tableDia.find('tbody tr:last').each(function () {
            this.appendChild(nCloneTd2.cloneNode(true));
        });

        var nCloneTd3 = document.createElement('td');
        nCloneTd3.innerText = HOY[a]["cantSol"];
        tableDia.find('tbody tr:last').each(function () {
            this.appendChild(nCloneTd3.cloneNode(true));
        });

        var nCloneTd4 = document.createElement('td');
        nCloneTd4.innerText = HOY[a]["Aprobadas"];
        tableDia.find('tbody tr:last').each(function () {
            this.appendChild(nCloneTd4.cloneNode(true));
        });

        var nCloneTd5 = document.createElement('td');
        var sp = document.createElement('span');
        sp.className = "bold theme-font";
        sp.textContent = calculate(HOY[a]["Aprobadas"], HOY[a]["cantSol"]) + "%"; // ((parseInt(HOY[a]["Aprobadas"]) / parseInt(HOY[a]["cantSol"])) * 100).toFixed(3);
        nCloneTd5.appendChild(sp);
        tableDia.find('tbody tr:last').each(function () {
            this.appendChild(nCloneTd5.cloneNode(true));
        });
    }


}
function calculate(pEarned, pPos) {
    var perc = "0";
    if (isNaN(pPos) || isNaN(pEarned) || pEarned === 0) {
        perc = "0";
    }
    else {
        perc = ((pEarned / pPos) * 100).toFixed(0);
    }
    return perc;
}
function feeds(usuID) {
    $('#tpCargandofeeds').html('<p>Cargando feeds....</p>');
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _type: 'S',
            _usuID: usuID
        }),
        url: "/UI/GetDataWS.asmx/getDashboard",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                $('#tpCargandofeeds').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> No tenemos registros.</p></div></div>');
                return;
            }

            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var apr = mytables["Table"];
                    var rech = mytables["Table1"];

                    for (a = 0; a < apr.length; a++) {
                        var estado = '<div class="label label-sm label-success"><i class="fa fa-bell-o"></i></div>';
                        if (apr[a]["Estado"] === 'P')
                            estado = '<div class="label label-sm label-warning"><i class="fa fa-bullhorn"></i></div>'

                        var str = '<li><a href="' + apr[a]["link"] + '"><div class="col1"><div class="cont"><div class="cont-col1">' + estado + '</div><div class="cont-col2"><div class="desc">' + apr[a]["descripcion"] + '</div></div></div></div><div class="col2"><div class="date">' + apr[a]["hace"] + '</div></div></a></li>';

                        $("#f1").append(str);
                    }
                    for (a = 0; a < rech.length; a++) {
                        var str1 = '<li><a href="' + rech[a]["link"] + '"><div class="col1"><div class="cont"><div class="cont-col1"><div class="label label-sm label-danger"><i class="fa fa-bolt"></i></div></div><div class="cont-col2"><div class="desc">' + rech[a]["descripcion"] + '</div></div></div></div><div class="col2"><div class="date">' + rech[a]["hace"] + '</div></div></a></li>';
                        $("#f2").append(str1);
                    }
                    $('#tpCargandofeeds').html(null);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#tpCargandofeeds').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });
}
function canjes(usuID) {
    $('#tpCargandocanjes').html('<p>Cargando canjes....</p>');
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _type: 'C',
            _usuID: usuID
        }),
        url: "/UI/GetDataWS.asmx/getDashboard",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                $('#tpCargandocanjes').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> No tenemos registros.</p></div></div>');
                return;
            }

            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var canjes = mytables["Table"];
                    var total = 0;
                    for (a = 0; a < canjes.length; a++) {
                        total++;
                        var str = '<div class="item"><div class="item-head"><div class="item-details"><img class="item-pic" src="' + canjes[a]["foto"] + '"><a href="' + canjes[a]["link"] + '" class="item-name primary-link">' + canjes[a]["premio"] + '</a></div><span class="item-status"><span class="badge badge-empty badge-success"></span>&nbsp;' + canjes[a]["hace"] + '</span></div><div class="item-body">' + canjes[a]["Descripcion"] + '</div></div>';
                        $("#c1").append(str);
                    }
                    
                    $('#lblTotalCanjes').html(total+" total articulos canjedos");
                    $('#tpCargandocanjes').html(null);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#tpCargandocanjes').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });
}