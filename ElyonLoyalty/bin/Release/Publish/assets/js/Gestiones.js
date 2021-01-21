/// <reference path="../../Pantallas/Datos.asmx" />
/// <reference path="../../rep/Datos.asmx" />
/// <reference path="../../rep/Datos.asmx" />
/// <reference path="C:\Proyectos\EZEQUIEL-JAVASCRIP\ProyectoFleming\ArezCrm\Javascrip/PageTodo.aspx" />
/// <reference path="C:\Proyectos\EZEQUIEL-JAVASCRIP\ProyectoFleming\ArezCrm\Javascrip/PageTodo.aspx" />
/// <reference path="C:\Proyectos\EZEQUIEL-JAVASCRIP\ProyectoFleming\ArezCrm\Javascrip/PageTodo.aspx" />
/// <reference path="C:\Proyectos\EZEQUIEL-JAVASCRIP\ProyectoFleming\ArezCrm\Javascrip/Datos.asmx" />
/// <reference path="C:\Proyectos\EZEQUIEL-JAVASCRIP\ProyectoFleming\ArezCrm\Javascrip/Datos.asmx" />


function guardaFoto() {
    var des = $('#idDescripcion').val();
    var idImg = $('#StudentGender').val();
    var ide = localStorage.getItem("empID");

    if ($('.fileinput-preview').find('img')[0] != null && des != null && idImg != null) {
        var img = $('.fileinput-preview').find('img')[0].src;
        cargaDatosImagen(des, idImg, img, ide);
       
    }
    cargaImagenes();
}


function cargaDatos2(vDesde, vHasta, vimg, vIde) {
    console.log("desdeartu" + vDesde + "hasta" + vHasta + "img" + vimg + "emp" + vIde)
    var datosTabla = [];
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ descripcion: vDesde, idIm: vHasta, imagen: vimg, emp: vIde}),
        url: "Datos.asmx/setImagenPerfil",
        dataType: "json",
        success: function (data) {
            alert("Imagen cargada exitosamente!");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            debugger;
        }
    });

};

function cargaPerfil(des, vIde) {
    console.log("desJar=" + des)
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ usuID: des, empID: vIde }),
        url: "Datos.asmx/getPerfil",
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
                        var nroImagen = 1;

                        datos.forEach(function (item) {
                            var items = Object.keys(item);

                            items.forEach(function (key) {
                                if (key == "imgRuta") {
                                    var img1 = "data:image/png;base64," + item[key];

                                    var imgGaleria = document.getElementById('img').src = img1;
                                    nroImagen++;

                                }
                            });


                        });
                        //cargaEstados();

                    }

                }
            }
            else {
                alert("Ups! surgio un problema para insertar el dato. Contacta con el administrador: Galeria");
            }



        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            debugger;

        }

    })

}

function dataTableFunction() {
    var table = $('#TablaDetalle1');
    $.extend(true, $.fn.DataTable.TableTools.classes, {
        "container": "btn-group tabletools-btn-group pull-right",
        "buttons": {
            "normal": "btn btn-sm default",
            "disabled": "btn btn-sm default disabled"
        }
    });

    var oTable = table.dataTable({
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "No data available in table",
            "info": "&nbsp;&nbsp;&nbsp;Mostrar _START_ to _END_ of _TOTAL_ registros",
            "infoEmpty": "No entries found",
            "infoFiltered": "(filtered1 from _MAX_ total entries)",
            "lengthMenu": "&nbsp;&nbsp;&nbsp;Mostrar _MENU_ registros",
            "search": "Buscar Registros:&nbsp;&nbsp;",
            "zeroRecords": "No tenemos datos para mostrar"
        },

        "order": [
            [0, 'asc']
        ],
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "Todos"] // change per page values here
        ],

        // set the initial value
        "pageLength": 10,
        "dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        "tableTools": {
            "sSwfPath": "../../assets/global/plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
            "aButtons": [{
                "sExtends": "pdf",
                "sButtonText": "PDF"
            }, {
                "sExtends": "csv",
                "sButtonText": "CSV"
            }, {
                "sExtends": "xls",
                "sButtonText": "Excel"
            }, {
                "sExtends": "print",
                "sButtonText": "Imprimir",
                "sInfo": 'Presiona "CTRL+P" para imprimir o "ESC" para salir',
                "sMessage": "Generado por MedicApp"
            }, {
                "sExtends": "copy",
                "sButtonText": "Copiar en Portapapeles"
            }]
        }
    });

    var tableWrapper = $('#tablaAvanzada1');
    tableWrapper.find('.dataTables_length select').select2();
}








