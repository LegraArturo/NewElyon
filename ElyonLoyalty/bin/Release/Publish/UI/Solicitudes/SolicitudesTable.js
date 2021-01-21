
$(document).ready(function inicia() {
    startTiming();
    Metronic.init();
    Layout.init();
    ComponentsPickers.init();
    $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Aguarda un momento...</strong></h4><p>Estamos procesando la informacion..</p></div></div>');

    cargaData();
    var regIDparam = getParameterByName("regID");
    if (regIDparam !== null && regIDparam !== "")
        detail(regIDparam);
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
            _cID: "0",
            _type: 'S',
            _nroFactura: '',
            _fechaFactura: '',
            _codID: '0'
        }),
        url: "/UI/GetDataWS.asmx/getSolicitudesList",
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
                    var motivos = mytables["Table1"];

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
                        btn.href = "javascript:detail(" + menu[a]["regID"] + ");";
                        nCloneTdbtn.appendChild(btn);
                        table.find('tbody tr:last').each(function () {
                            this.appendChild(nCloneTdbtn.cloneNode(true));
                        });
                    }
                    tableInit(table, "#tb_wrapper", titulos);


                    //Carga Motivo de Rechazos
                    for (a = 0; a < motivos.length; a++) {
                        var evento = "javascript:saveDataSol(" + motivos[a]["ID"] + ")";

                        var li = document.createElement('li');
                        var vA = document.createElement('a');
                        vA.textContent = motivos[a]["Motivo"];
                        vA.href = evento;
                        li.appendChild(vA);

                        $('#mRechazo').append(li);
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
    /* Formatting function for row details */
    function fnFormatDetails(oTable, nTr) {
        var aData = oTable.fnGetData(nTr);
        var sOut = '<div class="row"><div class="col-lg-2"></div><div class="col-lg-6"><table class="table table-striped table-bordered table-hover">';
        sOut += '<tr><td>Alarma</td><td>' + aData[2] + '</td></tr>';
        sOut += '<tr><td>Nombre del Cliente:</td><td>' + aData[3] + '</td></tr>';
        sOut += '<tr><td>Vendedor:</td><td>' + aData[5] + '</td></tr>';
        sOut += '<tr><td>Foto de la Factura:</td><td><a href="' + aData[9] + '" target="_blank">' + aData[6] + '</a></td></tr>';
        sOut += '</table></div></div>';

        return sOut;
    }
    var nCloneTh = document.createElement('th');
    nCloneTh.className = "table-checkbox";

    var nCloneTd = document.createElement('td');
    nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

    table.find('thead tr').each(function () {
        this.insertBefore(nCloneTh, this.childNodes[0]);
    });

    table.find('tbody tr').each(function () {
        this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
    });


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
            "infoFiltered": "(filtered1 from _MAX_ total registros)",
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
function detail(solID) {
    $('#pnlCargandoDetalles').html(null);
    document.getElementById("lblNroSol").innerHTML = solID;
    $("#modalSolDetail").modal("show");

    //limpia datos
    $('#txtNroFactura').val("");
    $('#txtFechaFactura').val("");
    $('#txtSucursal').val("");
    $('#txtVendedor').val("");

    document.getElementById('lblTotalPts').textContent = "Total Pts: 0";
    document.getElementById('aNroFac').href = "#";
    document.getElementById('imgFact').src = "#";

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: solID,
            _type: 'I',
            _nroFactura: '',
            _fechaFactura: '',
            _codID: '0'
        }),
        url: "/UI/GetDataWS.asmx/getSolicitudesList",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                $('#pnlCargandoDetalles').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> No tenemos registros.</p></div></div>');
                return;
            }

            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var menu = mytables["Table"];
                    var productos = mytables["Table1"];
                    var titulos = Object.keys(productos[0]);

                    $('#txtNroFactura').val(menu[0]["nroFactura"]);
                    $('#txtFechaFactura').val(menu[0]["fechaVta"]);
                    $('#txtSucursal').val(menu[0]["Sucursal"]);
                    $('#txtVendedor').val(menu[0]["Vendedor"]);

                    document.getElementById('lblTotalPts').textContent = "Total Pts: " + menu[0]["totalPts"];
                    document.getElementById('aNroFac').href = menu[0]["fotoFactura"];
                    document.getElementById('imgFact').src = menu[0]["fotoFactura"];

                    var tb = $('#pnlCargandoDetalles');
                    var t = document.createElement('table');
                    t.className = "table table-striped table-hover table-bordered";
                    t.id = "prodDetail";
                    tb.append(t);

                    var thead = document.createElement('thead');
                    t.appendChild(thead);
                    var htr = document.createElement('tr');
                    thead.appendChild(htr);

                    var tbody = document.createElement('tbody');
                    t.appendChild(tbody);

                    for (i = 0; i < titulos.length; i++) {
                        var tn1 = document.createElement('th');
                        tn1.innerText = titulos[i];
                        htr.appendChild(tn1);
                    }
                    var tnEditar = document.createElement('th');
                    tnEditar.innerText = "#";
                    htr.appendChild(tnEditar);
                    var tnElimnar = document.createElement('th');
                    tnElimnar.innerText = "#";
                    htr.appendChild(tnElimnar);

                    for (a = 0; a < productos.length; a++) {
                        var filas = document.createElement('tr');

                        for (ti = 0; ti < titulos.length; ti++) {
                            var tit = titulos[ti];
                            var n1 = document.createElement('td');
                            n1.innerText = productos[a][tit];
                            filas.appendChild(n1);
                        }
                        ////AGrega el boton Editar
                        var nCloneTdbtn = document.createElement('td');
                        var btn = document.createElement('a');
                        btn.className = "edit";
                        btn.innerHTML = "Editar";
                        btn.style.position = "center";
                        btn.href = "javascript:editRecord(" + productos[a]["regID"] + "," + [a] + ");";
                        nCloneTdbtn.appendChild(btn);
                        filas.appendChild(nCloneTdbtn);

                        ////AGrega el Eliminar
                        var eliminar = document.createElement('td');
                        var btnEliminar = document.createElement('a');
                        btnEliminar.className = "delete";
                        btnEliminar.innerHTML = "Eliminar";
                        btnEliminar.style.position = "center";
                        btnEliminar.href = "javascript:deleteRecord(" + productos[a]["regID"] + "," + [a] + ");";
                        eliminar.appendChild(btnEliminar);
                        filas.appendChild(eliminar);

                        tbody.appendChild(filas);
                    }

                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#pnlCargandoDetalles').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });

    ///BLOQUEAR BOTN

}
function saveDataSol(mID) {
    var solID = document.getElementById("lblNroSol").innerHTML;
    var nroFactura = $('#txtNroFactura').val();
    var fechaFactura = $('#txtFechaFactura').val();

    document.getElementById('btnSave').disabled = true;
    document.getElementById('btnSave').textContent = "Procesando...";

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: solID,
            _type: 'U',
            _nroFactura: nroFactura,
            _fechaFactura: fechaFactura,
            _codID: mID
        }),
        url: "/UI/GetDataWS.asmx/getSolicitudesList",
        dataType: "json",
        success: function (data) {
            showToast("Correcto!", "Genial! actualizamos los datos", "success");
            $("#closeSolDetail").click();
            setTimeout(reload, 1000);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#pnlCargandoDetalles').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });

}
function reload() {
    window.open("/UI/Solicitudes/Solicitudes.html", "_self");
}

function editRecord(regID, nRow) {
    var nroFila = nRow + 1;
    document.getElementById("lblProdDetailID").innerHTML = regID;
    $("#modalProdDetail").modal("show");

    $('#txtCodProductoDetail').val(document.getElementById("prodDetail").rows[nroFila].cells[1].innerHTML);
    $('#txtDescProductoDetail').val(document.getElementById("prodDetail").rows[nroFila].cells[2].innerHTML);
    $('#txtCantProdDetail').val(document.getElementById("prodDetail").rows[nroFila].cells[3].innerHTML);
    $('#txtCantPTSProdDetail').val(document.getElementById("prodDetail").rows[nroFila].cells[4].innerHTML);

    $('#btnSaveModal').html('<button type="button" onclick="saveProdDetail(' + regID + ',' + nroFila + ');" style="margin-left:12px" class="btn btn-circle green-haze btn-sm pull-right">Editar</button>');
}
function saveProdDetail(regID, nroFila) {

    var cant = $('#txtCantProdDetail').val();
    var pts = $('#txtCantPTSProdDetail').val();

    document.getElementById("prodDetail").rows[nroFila].cells[3].innerHTML = cant;
    document.getElementById("prodDetail").rows[nroFila].cells[4].innerHTML = pts;

    setProductos(regID, 'U', cant, pts);
    closeProdDet();
}
function closeProdDet() {
    $("#closeProdDetail").click();
}
function deleteRecord(regID, nRow) {
    if (confirm("Estas seguro de eliminar el registro?") == false) {
        return;
    }
    //e.preventDefault();
    setProductos(regID, 'D', 0, 0);
    document.getElementById("prodDetail").deleteRow(nRow + 1);
}
function setProductos(ID, type, cant, pts) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: ID,
            _type: type,
            _cant: cant,
            _pts: pts
        }),
        url: "/UI/GetDataWS.asmx/setProductosSolList",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                $('#pnlCargandoDetalles').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> No tenemos registros.</p></div></div>');
                return;
            }
            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var menu = mytables["Table"];
                    document.getElementById('lblTotalPts').textContent = "Total Pts: " + menu[0]["totalPts"];
                    if (type === 'D')
                        showToast("Correcto!", "Eliminado", "success");
                    else
                        showToast("Correcto!", "Actualizado", "success");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#pnlCargandoDetalles').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });
}
