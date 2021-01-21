<%@ Page Title="" Language="C#" MasterPageFile="~/Medicapp.Master" AutoEventWireup="true" CodeBehind="dashboard.aspx.cs" Inherits="Grapp.UI.rep.dashboard" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <script src="/assets/global/plugins/jquery.min.js" type="text/javascript"></script>

    <script src="/assets/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="/assets/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="/assets/js/DataTablesLegra.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

    <div class="page-content">
        <asp:Label runat="server" Visible="false" ID="lblUsuID" Text="1"></asp:Label>
        <div class="page-toolbar">
            <div id="dashboard-report-ranges" class="pull-right tooltips btn btn-fit-height grey-salt" data-placement="top" data-original-title="Cambia el rango de fechas">
                <i class="icon-calendar"></i>&nbsp; <span class="thin uppercase visible-lg-inline-block"></span>&nbsp; <i class="fa fa-angle-down"></i>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row" style="margin-top: 45px;">
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="dashboard-stat red-intense">
                        <div class="visual">
                            <i class="fa fa-bar-chart-o"></i>
                        </div>
                        <div class="details">
                            <div class="number" id="pnl1Monto">
                                0M$
                            </div>
                            <div class="desc">
                                Total Consultas
                            </div>
                        </div>
                        <a class="more" href="/UI/rep/detalleConsultas.aspx">Ver Detalles <i class="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="dashboard-stat blue-madison">
                        <div class="visual">
                            <i class="fa fa-money"></i>
                        </div>
                        <div class="details">
                            <div class="number" id="pnl2Monto">
                                0
                            </div>
                            <div class="desc">
                                Monto Cubierto
                            </div>
                        </div>
                        <a class="more" href="/UI/rep/detalleConsultas.aspx">Ver Detalles <i class="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="dashboard-stat purple-plum">
                        <div class="visual">
                            <i class="fa fa-arrow-circle-o-up"></i>
                        </div>
                        <div class="details">
                            <div class="number" id="pnl4Monto">
                                +0%
                            </div>
                            <div class="desc">
                                Total Consultas Proyectado
                            </div>
                        </div>
                        <a class="more" href="/UI/rep/detalleConsultas.aspx">Ver Detalles <i class="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div class="dashboard-stat green-haze">
                        <div class="visual">
                            <i class="fa fa-arrow-circle-o-up"></i>
                        </div>
                        <div class="details">
                            <div class="number" id="pnl3Monto">
                                0
                            </div>
                            <div class="desc">
                                Monto Cubierto Proyectado
                            </div>
                        </div>
                        <a class="more" href="/UI/rep/detalleConsultas.aspx">Ver Detalles <i class="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <!-- BEGIN PORTLET-->
                    <div class="portlet solid bordered grey-cararra">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-bar-chart"></i>Visitas por Mes
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="site_statistics_loading" style="display: none;">
                                <img src="../../assets/admin/layout/img/loading.gif" alt="loading" />
                            </div>
                            <div id="site_statistics_content" class="display-none" style="display: block;">
                                <div id="site_statistics" class="chart" style="padding: 0px; position: relative;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END PORTLET-->
                </div>
                <div class="col-md-6 col-sm-6">
                    <!-- BEGIN PORTLET-->
                    <div class="portlet solid grey-cararra bordered">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-money"></i>Evolutivo de Ingresos Estimados
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="site_activities_loading" style="display: none;">
                                <img src="../../assets/admin/layout/img/loading.gif" alt="loading" />
                            </div>
                            <div id="site_activities_content" class="display-none" style="display: block;">
                                <div id="site_activities" style="height: 300px; padding: 0px; position: relative;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END PORTLET-->
                </div>
            </div>
        </div>
    </div>
    <script src="/assets/js/LegraDashboard.js" type="text/javascript"></script>
    <script>
        jQuery(document).ready(function () {
            var date = new Date();
            var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
            var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            cargaDatosBloques(primerDia.toLocaleDateString(), ultimoDia.toLocaleDateString());
            document.getElementById("pnlPantallaCompleta").click();
        });

    </script>
</asp:Content>
