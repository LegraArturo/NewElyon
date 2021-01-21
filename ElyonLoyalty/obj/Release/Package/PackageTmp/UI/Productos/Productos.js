
$(document).ready(function inicia() {
    startTiming();
    Metronic.init();
    Layout.init();


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
            _catID: '',
            _marcaID: '0',
            _codArt: '0',
            _pts: '0'
        }),
        url: "/UI/GetDataWS.asmx/setProductosList",
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
function detail(solID) {
    document.getElementById("lblNroSol").innerHTML = solID;
    $("#modalSolDetail").modal("show");
    //limpia datos
    $('#txtNombre').val("");
    $('#txtCodArt').val("");
    $('#txtPts').val("");
  
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: solID,
            _type: 'I',
            _nombre: '',
            _catID: '',
            _marcaID: '0',
            _codArt: '0',
            _pts: '0'
        }),
        url: "/UI/GetDataWS.asmx/setProductosList",
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
                    
                    $('#txtNombre').val(menu[0]["Descripcion"]);
                    $('#txtCodArt').val(menu[0]["codArticulo"]);
                    $('#txtPts').val(menu[0]["pts"]);
                    
                    $('#ddlCategoria').val(menu[0]["Categoria"]);
                    $('#lblCatID').val(menu[0]["Categoria"]);

                    $('#ddlMarca').val(menu[0]["Marca"]);
                    $('#lblMarcaID').val( menu[0]["Marca"]);

                    $('#pnlCargando').html(null);

                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#pnlCargandoDetalles').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });

}
function saveDataSol() {
    updData('U');
}
function updData(type) {
    var solID = document.getElementById("lblNroSol").innerHTML;
    var nombres = $('#txtNombre').val();
    var catID = $('#lblCatID').val();
    var marcaID = $('#lblMarcaID').val();
    var codArt = $('#txtCodArt').val();
    var pts = $('#txtPts').val();

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: solID,
            _type: type,
            _nombre: nombres,
            _catID: catID,
            _marcaID: marcaID,
            _codArt: codArt,
            _pts: pts
        }),
        url: "/UI/GetDataWS.asmx/setProductosList",
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
