$(document).ready(function inicia() {
    var query = getParameterByName("query");

    $('#pnlCargando').html('<div class="col-lg-1"></div><div class="col-lg-10"><div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><h4><strong>Aguarda un momento...</strong></h4><p>Estamos procesando la informacion..</p></div></div>');

    menuSearch(query, 'I');
});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function menuSearch(txtFind, type) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            _type: type,
            _find: txtFind
        }),
        url: "/UI/GetDataWS.asmx/getMenuList",
        dataType: "json",
        success: function (data) {
            if (data.d === "" || data.d === "[{resultado: 'No'}]") {
                resultados("No tenemos datos para mostrarte.", "#", txtFind);
                $('#pnlCargando').html(null);
                return;
            }
            var result = [];
            var dataSet = [];
            var mytables = null;
            for (var propiedad in data) {
                if (data.hasOwnProperty(propiedad)) {
                    mytables = JSON.parse(data[propiedad]);
                    var cabecera = mytables["Table"];
                     
                    for (cab = 0; cab < cabecera.length; cab++) {

                        resultados(cabecera[cab]["Nombre"], cabecera[cab]["form"], txtFind);

                    }
                    $('#pnlCargando').html(null);

                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });

}
function resultados(tit, ref, txtFind) {
    var div = document.createElement('div');
    var h4 = document.createElement('h4');
    var link = document.createElement('a');
    link.href = ref

    div.className = "search-classic";
    h4.innerHTML = '<a href="' + ref + '">'+tit+'</a>';

    div.appendChild(h4);

    link.textContent = ref;
    div.appendChild(link);

    var p = document.createElement('p');
    p.textContent = txtFind;
    div.appendChild(p);

    $('#searchDiv').append(div);
}