$(document).ready(function inicia() {
    Metronic.init();
    Layout.init();
    PortletDraggable.init();

    $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Aguarda un momento...</strong></h4><p>Estamos procesando la información..</p></div></div>');

    if (localStorage.getItem("PivotColPnl") === null)
        localStorage.setItem("PivotColPnl", 1);
    pnlIcon();
    getDataViewList();
    cargaData("0");
     //showfunnel();
     
});
 
function editTitle(cID, title, subtitle, type) {
    if (type === 1) {
        var btn = "editTitle('" + cID + "','',''," + 2 + ");";
        $("#modalEditTitle").modal("show");

        $("#txtTitle").val(title);
        $("#subTitle").val(subtitle);

        $("#btnTitle").html('<button type="button" onclick="' + btn + '" class="btn btn-circle green-haze btn-sm pull-right">Guardar</button>');

    } else {
        var newTitle = $("#txtTitle").val();
        var newSub = $("#subTitle").val();

        document.getElementById("t" + cID).innerHTML = newTitle + "&nbsp;";
        document.getElementById("st" + cID).innerHTML = newSub;

        updRegCab(cID, "U", newTitle, newSub, "1", "-1");
        $("#closeEditTitle").click();
    }
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function cargaData(cID) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: cID,
            _type: 'd'
        }),
        url: "/UI/Pivot/PivotWS.asmx/getDatosQueryFirst",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Prueba generar un reporte nuevo.</p></div></div>');
                return;
            }
            var result = [];
            var dataSet = [];
            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var datos = mytables["Table3"];
                    var menu = mytables["Table"];
                    var cab = mytables["Table1"];
                    var configSaved = cab[0]["formatoJson"];
                    ///create a Panels
                    for (a = 0; a < menu.length; a++) {
                        createPanel(menu[a]["cID"], menu[a]["nombre"], menu[a]["descripcion"], a, menu.length);
                    }

                    pivot(datos, cab[0]["cID"], configSaved, true);

                    for (a = 1; a < menu.length; a++) {
                        if (menu.length > 1 && a > 0) {
                            getData(menu[a]["cID"]);
                        }

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
function getData(cID) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: cID
        }),
        url: "/UI/Pivot/PivotWS.asmx/getDatosQueryID",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Prueba generar un reporte nuevo.</p></div></div>');
                return;
            }

            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);

                    var cab = mytables["Table"];
                    var datos = mytables["Table2"];
                    var tipoDatos = mytables["Table1"];
                    var configSaved = cab[0]["formatoJson"];
                    ///create a Panels
                    pivot(datos, cab[0]["cID"], configSaved, true);
                    // sessionStorage.setItem("pvtData" + cab[0]["cID"], JSON.stringify(datos));  
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });
}
function pivot(data, cID, config, first) {
    var table = "#load" + cID;

    var derivers = $.pivotUtilities.derivers;
    var tpl = $.pivotUtilities.aggregatorTemplates;
    var configSaved = JSON.parse(config);
    var monthAndDayDeriver = $.pivotUtilities.derivers.dateFormat("Name of Attribute", "%m/%d");
    //var fmt = $.pivotUtilities.numberFormat({ suffix: " °C" });
    var fmt = $.pivotUtilities.numberFormat({ thousandsSep: ".", decimalSep: "," });

    $(function (mps) {
        $(table).pivotUI(data, {
            renderers: $.extend(
                {
                    "Tabla": $.pivotUtilities.renderers["Table"],
                    "Tabla con barras": $.pivotUtilities.renderers["Table Barchart"],
                    "Mapa de Calor": $.pivotUtilities.renderers["Heatmap"],
                    "Mapa de Calor Filas": $.pivotUtilities.renderers["Row Heatmap"],
                    "Line Chart": $.pivotUtilities.renderers["Line Chart"],
                    "Mapa de Calor Columnas": $.pivotUtilities.renderers["Col Heatmap"]
                },
                $.pivotUtilities.export_renderers,
                $.pivotUtilities.d3_renderers,
                $.pivotUtilities.plotly_renderers
            ),
            //formato
            /*
%y: date.getFullYear()
%m: zeroPad(date.getMonth()+1)
%n: mthNames[date.getMonth()]
%d: zeroPad(date.getDate())
%w: dayNames[date.getDay()]
%x: date.getDay()
%H: zeroPad(date.getHours())
%M: zeroPad(date.getMinutes())
%S: zeroPad(date.getSeconds())
*/
            //campos nuevos
            //derivedAttributes: {
            //    "Age Bin": derivers.bin("CanReg", 10), ///agrupado de rangos de 10
            //    "Deriver": derivers.dateFormat("FechaCreacion", "%n/%x"),
            //    "month name": derivers.dateFormat("FechaCreacion", "%n", true),
            //    "msonthAndDayDeriver": derivers.dateFormat("FechaCreacion", "%n-%d-%w"), ///fechas
            //    "cALCULO": function (record) { return record["CanReg"] * 2; },
            //    "Cal Entre Campos": function (record) { return record.CanReg * record["CanRegTest"]; },
            //    "Gender Imbalance": function (mp) { return mp["Nombres"] === "AMPARO IRIS" ? "ENCONTRADO" : "NO SE ENCUENTRA"; },
            //    "Gender": monthAndDayDeriver
            //},
            unusedAttrsVertical: 10,
            rows: configSaved.rows,
            cols: configSaved.cols,
            vals: configSaved.vals,
            exclusions: configSaved.exclusions,
            rowOrder: "value_a_to_z",
            colOrder: "value_z_to_a",
            rendererName: configSaved.rendererName,

            //sorters: {
            //    cALCULO: $.pivotUtilities.sortAs(
            //            ["ASC"]) //sort backwards
            //},

            rendererOptions: {
                heatmap: {
                    colorScaleGenerator: function (values) {
                        min = Math.min.apply(Math, values)
                        max = Math.max.apply(Math, values)
                        medio = max / 2
                        return d3.scale.linear()
                            .domain([min, medio, max])
                            .range(["#77F", "#FFF", "#F77"])
                    }
                },

                gchart: { width: 1000, height: 600 }
            },
            onRefresh: function (config) {
                //var config_copy = JSON.parse(JSON.stringify(config));
                //delete config_copy["renderers"];
                //delete config_copy["rendererOptions"];

                //filas = config_copy.cols.toString
                //$(jsonConf).text(JSON.stringify(config_copy, undefined, 2));
                if (!first)
                    saveFormat(cID, true);
                else
                    first = false;
            }
        });
    });
}
function btnCambiaVista() {
    var columnaPnl = localStorage.getItem("PivotColPnl");

    if (columnaPnl === "1")
        localStorage.setItem("PivotColPnl", 2);
    else
        localStorage.setItem("PivotColPnl", 1);

    pnlIcon();
}
function pnlIcon() {
    var columnaPnl = localStorage.getItem("PivotColPnl");
    var iconPnl = document.getElementById("iconPnl");

    if (columnaPnl === "1")
        iconPnl.className = 'fa fa-stop';
    else
        iconPnl.className = 'fa fa-th-large';

    genera();
}
function genera() {
    var columnaPnl = localStorage.getItem("PivotColPnl");
    var divs = document.getElementsByClassName("sortable");
    var pnl1 = "";

    if (columnaPnl === "1") {
        pnl1 = 'col-md-6 column sortable';
    } else {
        pnl1 = 'col-md-12 column sortable';
    }
    for (var i = 0; i < divs.length; i++) {
        divs[i].className = pnl1;
    }
}
function createPanel(pnlID, title, subtitle, cant, total) {
    var columnaPnl = localStorage.getItem("PivotColPnl");
    var pnl = "";
    if (columnaPnl === "1") {
        pnl = 'col-md-6 column sortable';
    } else {
        pnl = 'col-md-12 column sortable';
    }

    var iDiv = document.createElement('div');
    iDiv.id = "pnl" + pnlID;
    iDiv.className = pnl;
    document.getElementById('sortable_portlets').appendChild(iDiv);

    //Portet
    var portletDiv = document.createElement('div');
    portletDiv.className = "portlet portlet-sortable light bordered";
    iDiv.appendChild(portletDiv);

    //Header and Body
    var headerDiv = document.createElement('div');
    headerDiv.className = "portlet-title";
    portletDiv.appendChild(headerDiv);

    //Title
    var titleDiv = document.createElement('div');
    titleDiv.className = 'caption font-green-sharp pencil';
    var handleClick = function (e) {
        editTitle(pnlID, title, subtitle, 1);
    }
    titleDiv.onclick = handleClick;
    headerDiv.appendChild(titleDiv);

    var titleIcon = document.createElement('i');
    titleIcon.className = 'icon-speech font-green-sharp';
    titleDiv.appendChild(titleIcon)

    var titleName = document.createElement('span');
    titleName.className = 'caption-subject bold uppercase';
    titleName.innerHTML = title + "&nbsp;";
    titleName.id = "t" + pnlID;
    titleDiv.appendChild(titleName)
    var SubtitleName = document.createElement('span');
    SubtitleName.className = 'caption-helper';
    SubtitleName.innerHTML = subtitle;
    SubtitleName.id = "st" + pnlID;
    titleDiv.appendChild(SubtitleName)

    // Tools
    var toolsDiv = document.createElement('div');
    toolsDiv.className = 'tools';
    headerDiv.appendChild(toolsDiv);

    var a1 = document.createElement('a');
    a1.className = 'collapse';
    a1.title = 'Contraer';
    $(a1).attr("data-original-title", "Comprime");
    toolsDiv.appendChild(a1);

    var dcsv = document.createElement('a');
    var downCSV = "javascript:exportData(" + pnlID + ");"
    dcsv.href = downCSV;
    dcsv.style.color = "gray"
    $(dcsv).attr("data-original-title", "CSV");
    $(dcsv).attr("title", "Descargar CSV");
    dcsv.innerHTML = '<i class="fa fa-cloud-download"></i>';
    toolsDiv.appendChild(dcsv);


    var a2 = document.createElement('a');
    a2.href = "javascript:;";
    a2.className = 'fullscreen';
    $(a2).attr("data-original-title", "Pantalla Completa");
    toolsDiv.appendChild(a2);

    //var testa2 = document.createElement('a');
    //testa2.href = "javascript:;fullscreen();";
    //testa2.style.color = "gray"
    //testa2.innerHTML = '<i class="fa fa-expand"></i>';
    //$(testa2).attr("data-original-title", "Pantalla Completa");
    //toolsDiv.appendChild(testa2);


    var a3 = document.createElement('a');
    var del = "javascript:deletePnl(" + pnlID + ");"
    a3.title = 'Eliminar';
    a3.href = del;
    a3.style.width = "11px";
    a3.style.backgroundImage = "url('/assets/global/img/portlet-remove-icon.png')";
    $(a3).attr("data-original-title", "Eliminar");
    toolsDiv.appendChild(a3);

    //Action
    var actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';
    headerDiv.appendChild(actionsDiv);
    var a4 = document.createElement('a');
    a4.id = "sf" + pnlID;
    a4.className = 'btn btn-circle btn-default yellow-stripe';
    a4.style.marginLeft = "15px";
    a4.style.display = "none";
    var saveFormat = "javascript:saveFormat(" + pnlID + ", false);"
    a4.href = saveFormat;
    a4.style.marginRight = "15px";
    a4.innerHTML = '<i class="fa fa-save"></i>&nbsp;Guardar Formato&nbsp;';
    actionsDiv.appendChild(a4);

    //var a5 = document.createElement('a');
    //a5.className = 'btn btn-circle btn-default';
    //$(a5).attr("data-toggle", "dropdown"); 
    //a5.innerHTML = '<i class="fa fa-filter"></i>&nbsp;Filtros&nbsp; <i class="fa fa-angle-down"></i>';
    //actionsDiv.appendChild(a5);

    //Body
    var bodyDiv = document.createElement('div');
    bodyDiv.className = "portlet-body";
    portletDiv.appendChild(bodyDiv);
    var scrollerDiv = document.createElement('div');
    scrollerDiv.className = 'scroller';
    //scrollerDiv.style.overflow = "scroll";
   // scrollerDiv.style.overflow.scrollY = "hidden";
    //scrollerDiv.style.height = "600px";
    bodyDiv.appendChild(scrollerDiv);

    var contentBodyDiv = document.createElement('div');
    contentBodyDiv.id = "load" + pnlID;
    scrollerDiv.appendChild(contentBodyDiv);
    $(contentBodyDiv).html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Aguarda un momento...</strong></h4><p>Estamos procesando la información.</p></div></div>');

    //blank
    var innerDiv = document.createElement('div');
    innerDiv.className = "portlet portlet-sortable-empty";
    iDiv.appendChild(innerDiv);


    if (cant === total - 1) {
        $(".pencil").hover(
            function () {
                $(this).append($("<span onclick='' class='caption-helper'>&nbsp;<i class='fa fa-pencil'></i></span>"));
            }, function () {
                $(this).find("span").last().remove();

            }
        );
        $(".scroller").slimScroll({
            size: '8px',
            width: '100%',
            height: '600px',
            color: '#ff4800',
            allowPageScroll: true,
            alwaysVisible: true,
            scrollY: "block"
        });
    }
}
function fullscreen() {
    $('#pnl5').toggleClass('fullscreens'); 
     
}
function CargaDatosTabla() {
    var table = $('#gvDatos');
    var oTable = table.DataTable({
        destroy: true,
        "data": dataSet,//<%=dataTable_local%>, 
        //"data": datosTabla,
        "scrollY": "300px",

        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "No existen datos",
            "info": "Desde _START_ hasta _END_ de _TOTAL_ filas",
            "infoEmpty": "Ningun dato encontrado",
            "infoFiltered": "(Filtrado de _MAX_ total filas)",
            "lengthMenu": "Ver _MENU_ datos",
            "search": "Buscador:",
            "zeroRecords": "Ninguna fila encontrada"
        },

        "order": [
            [0, 'desc']
        ],

        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "Todos"]
        ],
        "pageLength": 10,
        "dom": 'Bfrtip',
        "buttons": [
            { extend: 'copy', sButtonText: "Copiar", attr: { id: 'allan' } },
            'csv', 'excel', 'pdf', 'print'
        ]

    });

    $('.toggle-vis').on('click', function (e) {
        e.preventDefault();

        // Get the column API object
        var column = oTable.column($(this).attr('data-columnindex'));

        // Toggle the visibility
        column.visible(
            !column.visible()
        );
    });

    //var tableWrapper = $('#sample_1_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper

    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
}
function deletePnl(pnlID) {
    if (confirm("Por favor confirma la acción")) {
        var pnl = "#pnl" + pnlID;
        $(pnl).html(null);
        updRegCab(pnlID, 'D', '', '', '', '');
    }
}
function saveFormat(pnlID, show) {
    var btnID = "#sf" + pnlID;

    var table = "#load" + pnlID;
    var config = $(table).data("pivotUIOptions");
    var config_copy = JSON.parse(JSON.stringify(config));
    delete config_copy["renderers"];
    delete config_copy["rendererOptions"];

    if (!show) {
        updRegCab(pnlID, 'F', '', JSON.stringify(config_copy), '', '');
        $(btnID).css("display", "none");
    } else {
        $(btnID).css("display", "block");
    }

}
function updRegCab(regID, type, nombre, desc, orden, vID) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _regID: regID,
            _type: type,
            _nombre: nombre,
            _desc: desc,
            _orden: orden,
            _vID: vID
        }),
        url: "/UI/Pivot/PivotWS.asmx/uspPivotAdd",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Prueba generar un reporte nuevo.</p></div></div>');
                return;
            }
            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var menu = mytables["Table"];
                    if (menu[0]["regID"] === 0)
                        return;

                    var datos = mytables["Table2"];
                    var cab = mytables["Table"];

                    var configSaved = cab[0]["formatoJson"];
                    ///create a Panels
                    for (a = 0; a < menu.length; a++) {
                        createPanel(menu[a]["cID"], menu[a]["nombre"], menu[a]["descripcion"], a, menu.length);
                    }
                    pivot(datos, cab[0]["cID"], configSaved, true);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });
}
function newPvt() {
    var ddlID = document.getElementById("lblVistaID").value;
    if (ddlID === null || ddlID === "-1") {
        alert("Debes Seleccionar un Origen de Datos");
    } else {
        var nombre = document.getElementById("txtNombre").value;
        if (nombre === null || nombre === "") {
            alert("Debes completar el campo Nombre");
        } else {
            var desc = document.getElementById("txtDesc").value;
            console.log(ddlID);
            updRegCab("-1", "N", nombre, desc, 1, ddlID);
        }
    }
    document.getElementById("closeNewPvt").click();
}
function getDataViewList() {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _type: 'S'
        }),
        url: "/UI/Pivot/PivotWS.asmx/getDataViewList",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                return;
            }
            var ddl = "#ddlVista";
            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var datos = mytables["Table"];
                    ///create a Panels
                    for (a = 0; a < datos.length; a++) {
                        var $option = $("<option></option>").val(datos[a]["ID"]).text(datos[a]["nombre"]);
                        $(ddl).append($option).trigger('change');
                    }
                }
            }
            $(ddl).on('change', function (evt) {
                if ($(ddl).select2().select2('val') !== null) {
                    var valor = $(ddl).select2().select2('val');
                    document.getElementById("lblVistaID").value = valor;
                }
            });

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            return;
        }
    });
}
function showfunnel() {
    var data =
        [
            ['PROSPECT', 2500000],
            ['PROPOSAL', 1700000],
            ['NEGOTIATION', 1000000],
            ['DEAL', 500000]
        ];
    var options =
    {
        chart:
        {
            curve:
            {
                enabled: true
            }
        }
    };
    var chart = new D3Funnel('#funnel');
    chart.draw(data, options);
}
var PortletDraggable = function () {
    return {
        //main function to initiate the module
        init: function () {

            if (!jQuery().sortable) {
                return;
            }

            $("#sortable_portlets").sortable({
                connectWith: ".portlet",
                items: ".portlet",
                opacity: 0.8,
                handle: '.portlet-title',
                coneHelperSize: true,
                placeholder: 'portlet-sortable-placeholder',
                forcePlaceholderSize: true,
                tolerance: "pointer",
                helper: "clone",
                tolerance: "pointer",
                forcePlaceholderSize: !0,
                helper: "clone",
                cancel: ".portlet-sortable-empty, .portlet-fullscreen", // cancel dragging if portlet is in fullscreen mode
                revert: 250, // animation in milliseconds
                update: function (b, c) {
                    // console.log('update: ' + c.item.index());
                    // console.log(c.item.offsetParent());

                    if (c.item.prev().hasClass("portlet-sortable-empty")) {
                        c.item.prev().before(c.item);

                    }

                },

            });
        }
    };
}();
function exportData(cID) {
    $("#staticModal").modal("show");
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _cID: cID
        }),
        url: "/UI/Pivot/PivotWS.asmx/getDatosQueryID",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                return;
            }

            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);

                    var datos = mytables["Table2"];

                    if (datos != null) {
                        var csv = JSON2CSV(datos);
                        // exportTableToExcel(csv, 'test');
                        var downloadLink = document.createElement("a");
                        var blob = new Blob(["\ufeff", csv]);
                        var url = URL.createObjectURL(blob);
                        downloadLink.href = url;
                        downloadLink.download = "DatosPivot.csv";

                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                    }
                    document.getElementById("closeStatic").click();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#closeStatic").click();
            return;
        }
    });




}
function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';

    // get all distinct keys      
    let titles = [];
    for (var i = 0; i < array.length; i++) {
        let obj = array[i];
        Object.entries(obj).forEach(([key, value]) => {
            //console.log('key=', key, "   val=", value );
            if (titles.includes(key)) {
                // console.log (key , 'exists');
                null;
            }
            else {
                titles.push(key);
            }
        })
    }
    let htext = '"' + titles.join('","') + '"';

    // add to str
    str += htext + '\r\n';
    //
    // lines
    for (var i = 0; i < array.length; i++) {
        var line = '';
        // get values by header order
        for (var j = 0; j < titles.length; j++) {
            // match keys with current header
            let obj = array[i];
            let keyfound = 0;
            // each key/value pair
            Object.entries(obj).forEach(([key, value]) => {
                if (key == titles[j]) {
                    // console.log('equal tit=', titles[j] , ' e key ', key ); // matched key with header
                    line += ',"' + value + '"';
                    keyfound = 1;
                    return false;
                }

            })
            if (keyfound == 0) {
                line += ',"' + '"';   // add null value for this key
            } // end loop of header values

        }

        str += line.slice(1) + '\r\n';
    }
    return str;
}
function exportTableToExcel(csv, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['ufeff', csv], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + csv;
        downloadLink.id = 'donwloadExcel';
        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
    var excel = document.getElementById("donwloadExcel");
    if (excel != null)
        excel.remove();
}