<%@ Page Title="" Language="C#" MasterPageFile="~/Medicapp.Master" AutoEventWireup="true" CodeBehind="detalleConsultas.aspx.cs" Inherits="Grapp.UI.rep.detalleConsultas" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="/assets/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="/assets/js/jquery-1.10.2.js" type="text/javascript"></script>

    <div class="page-content">
        <div class="container-fluid">
            <asp:Label runat="server" Visible="false" ID="lblUsuID" Text="1"></asp:Label>
            <div class="row portlet light" style="min-height: 700px">
                <div class="row hidden-print">
                    <div class="form-group">
                        <label class="control-label col-md-3">Selecciona un Rango de Fecha</label>
                        <div class="col-md-4">
                            <div class="input-group input-large date-picker input-daterange" data-date="10/11/2012" data-date-format="dd/mm/yyyy">
                                <input type="text" class="form-control" name="from" />
                                <span class="input-group-addon">Hasta </span>
                                <input type="text" class="form-control" name="to" />
                            </div>
                            <span class="help-block">Ej.: desde 05/02/2019 Hasta 05/03/2019 </span>
                        </div>
                        <div class="col-md-4">
                            <input type="button" value="Consultar" class="btn green btn-sm" onclick="cargaDatos(document.getElementsByName('from')[0].value, document.getElementsByName('to')[0].value)" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="portlet box green-haze" style="display: block;">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-globe"></i>Detalle de Consultas
                            </div>
                            <div class="action pull-right" style="margin-top: 10px">
                                <a class="btn btn-sm green hidden-print margin-bottom-5" onclick="javascript:exportTableToExcel('TablaDetalle', 'detalleConsultas');">Descargar <i class="fa fa-file-excel-o"></i>
                                </a>
                                <a class="btn btn-sm blue hidden-print margin-bottom-5" onclick="javascript:viewPrint();">Imprimir <i class="fa fa-print"></i>
                                </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="elementH"></div>
                            <div id="tablaAvanzada" class="dataTables_wrapper no-footer">
                                <div class="table-scrollable">
                                    <table class="table table-striped" id="TablaDetalle" role="grid" aria-describedby="sample_2_info">
                                        <thead id="columnas">
                                        </thead>
                                        <tbody id="filas">
                                        </tbody>
                                        <tfoot id="foot"></tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function () {
            var date = new Date();
            var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
            var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            document.getElementsByName('from')[0].value = primerDia.toLocaleDateString();
            document.getElementsByName('to')[0].value = ultimoDia.toLocaleDateString();
            cargaDatos(primerDia.toLocaleDateString(), ultimoDia.toLocaleDateString());
           // setTimeout(function () { document.getElementById("pantalla").className = "page-header-fixed page-sidebar-closed-hide-logo page-sidebar-closed-hide-logo page-sidebar-closed"; }, 1000);
        });
        
    </script>
</asp:Content>
