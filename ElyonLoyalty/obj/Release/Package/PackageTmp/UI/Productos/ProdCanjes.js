
$(document).ready(function inicia() {
    startTiming();
    Metronic.init();
    Layout.init();
    ComponentsPickers.init();
    $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Aguarda un momento...</strong></h4><p>Estamos procesando la informacion..</p></div></div>');

   cargaData();

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
function cargaData() {

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: "0",
            _type: 'S',
            _nombre: '',
            _Desc: '',
            _MarcaID: '',
            _catID: '',
            _pts: '',
            _costo: '',
            _obs: ''
        }),
        url: "/UI/GetDataWS.asmx/setProdCanjes",
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
                        btn.href = "javascript:detail(" + menu[a]["regID"] + ");";
                        nCloneTdbtn.appendChild(btn);
                        table.find('tbody tr:last').each(function () {
                            this.appendChild(nCloneTdbtn.cloneNode(true));
                        });
                    }
                    tableInit(table, "#tb_wrapper", titulos);

                    var marcas = mytables["Table1"];
                    var ddlMarcas = "#ddlMarca";
                    //Carga Marcas
                    for (a = 0; a < marcas.length; a++) {
                        var $option = $("<option></option>").val(marcas[a]["ID"]).text(marcas[a]["nombre"]);
                        $(ddlMarcas).append($option).trigger('change');
                    }
                    $(ddlMarcas).on('change', function (evt) {
                        if ($(ddlMarcas).select2().select2('val') !== null) {
                            var valor = $(ddlMarcas).select2().select2('val');
                            document.getElementById("lblMarcaID").value = valor;
                        }
                    });

                    var cat = mytables["Table2"];
                    var ddlCategoria = "#ddlCategoria";
                    //Carga Categorias
                    for (a = 0; a < cat.length; a++) {
                        $(ddlCategoria).append($("<option></option>").val(cat[a]["ID"]).text(cat[a]["nombre"])).trigger('change');
                    }
                    $(ddlCategoria).on('change', function (evt) {
                        if ($(ddlCategoria).select2().select2('val') !== null) {
                            var valor = $(ddlCategoria).select2().select2('val');
                            document.getElementById("lblCatID").value = valor;
                        }
                    });
                    
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
        case "fotoPrincipal":
            return false;
        case "usuMod":
            return false;
        case "usuCreador":
            return false;
        case "fechaMod":
            return false;
        case "Obs":
            return false;
        case "Costo":
            return false;
    }
    return true;
}
function tableInit(table, wrapper, Columnas) {
    /* Formatting function for row details */
    function fnFormatDetails(oTable, nTr) {
        var aData = oTable.fnGetData(nTr);
        var sOut = '<div class="row"><div class="col-lg-2"></div><div class="col-lg-6"><table class="table table-striped table-bordered table-hover">';
        sOut += '<tr><td>Costo</td><td>' + aData[7] + '</td></tr>';
        sOut += '<tr><td>Se creo el:</td><td>' + aData[8] + '</td></tr>';
        sOut += '<tr><td>Usuario Creo:</td><td>' + aData[10] + '</td></tr>';
        sOut += '<tr><td>Se Modifico ult:</td><td>' + aData[9] + '</td></tr>';
        sOut += '<tr><td>Usuario Mod:</td><td>' + aData[11] + '</td></tr>';
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
    $('#txtNombre').val("");
    $('#txtDescripcion').val("");
    $('#txtCantPTSProdDetail').val("0");
    $('#txtObs').val("");
    $('#txtCostoProducto').val("0");

    document.getElementById('lblTotalPts').textContent = "Total Pts: 0";
    document.getElementById('aNroFac').href = "#";
    document.getElementById('imgFact').src = "#";

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: solID,
            _type: 'I',
            _nombre: '',
            _Desc: '',
            _MarcaID: '',
            _catID: '',
            _pts: '',
            _costo: '',
            _obs: ''
        }),
        url: "/UI/GetDataWS.asmx/setProdCanjes",
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
                      

                    $('#txtNombre').val(menu[0]["Nombre"]);
                    $('#txtDescripcion').val(menu[0]["Descripcion"]);
                    $('#txtCantPTSProdDetail').val(menu[0]["Pts"]);
                    $('#txtObs').val(menu[0]["Obs"]);
                    $('#txtCostoProducto').val(menu[0]["Costo"]);
                    
                    document.getElementById('lblTotalPts').textContent = "Total Pts: " + menu[0]["Pts"];
                    $('#ddlCategoria').val(menu[0]["Categoria"]);
                    $('#lblCatID').val(menu[0]["Categoria"]);

                    $('#ddlMarca').val(menu[0]["Marca"]);
                    $('#lblMarcaID').val(menu[0]["Marca"]);

                    document.getElementById('aNroFac').href = menu[0]["fotoPrincipal"];
                    document.getElementById('imgFact').src = menu[0]["fotoPrincipal"];

                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#pnlCargandoDetalles').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });

}
function updProd() {
    updData('U');
}
function updData(type) {
    var solID = document.getElementById("lblNroSol").innerHTML;
    var nombres = $('#txtNombre').val();
    var catID = $('#lblCatID').val();
    var marcaID = $('#lblMarcaID').val();
    var txtDescripcion = $('#txtDescripcion').val();
    var pts = $('#txtCantPTSProdDetail').val();
    var txtObs = $('#txtObs').val();
    var txtCostoProducto = $('#txtCostoProducto').val();

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: solID,
            _type: type,
            _nombre: nombres,
            _Desc: txtDescripcion,
            _MarcaID: marcaID,
            _catID: catID,
            _pts: pts,
            _costo: txtObs,
            _obs: txtCostoProducto
        }),
        url: "/UI/GetDataWS.asmx/setProdCanjes",
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
    location.reload();
}
function eliminiarProd() {
    if (confirm("Estas seguro de eliminar el registro?") == false) {
        return;
    }
    updData('D');
}
  
 
