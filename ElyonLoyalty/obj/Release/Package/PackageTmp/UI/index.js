let pnlTop = 2;
dashboardMainChart = null;
$(document).ready(function inicia() {
    startTiming();
    Metronic.init();
    Layout.init();
   
    loadDashBoard(-1);

    setInterval(function () { loadDashBoard(-1); }, 30000); ///30000
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
function loadDashBoard(usuID) {
    ranking(usuID);
    grafLineal(usuID);
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

                    $('#t5h tbody').find(' tr').remove();
                    $('#t5m tbody').find(' tr').remove();

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
    $("div.gftotalPts").find("div.pts")[0].textContent = totalpts;
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
function grafLineal(usuID) {
    $('#pnlCargLineal').html('<p>Cargando datos....</p>');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _type: 'E',
            _usuID: usuID
        }),
        url: "/UI/GetDataWS.asmx/getDashboard",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                $('#pnlCargLineal').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> No tenemos registros.</p></div></div>');
                return;
            }

            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var datos = mytables["Table"];

                    $('#sales_statistics').html(null);
                    dibujaGraf(datos);
                    
                    $('#pnlCargLineal').html(null);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#pnlCargLineal').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Sin Datos para mostrarte!</strong></h4><p> Ocurrio un error en la presentacion de los registros.</p><p>' + textStatus + '</p></div></div>');
            return;
        }
    });

}
function dibujaGraf(datos) {
     if (Morris.EventEmitter) {
        dashboardMainChart = Morris.Area({
            element: 'sales_statistics',
            padding: 0,
            behaveLikeLine: false,
            gridEnabled: false,
            gridLineColor: false,
            axes: false,
            fillOpacity: 1,
            data: datos,
            lineColors: ['#399a8c', '#92e9dc'],
            xkey: 'DIA',
            ykeys: ['SOLICITUDES', 'APROBADOS'],
            labels: ['Solicitudes', 'Aprobados'],
            pointSize: 0,
            lineWidth: 0,
            hideHover: 'auto',
            resize: true
        });

    }
}