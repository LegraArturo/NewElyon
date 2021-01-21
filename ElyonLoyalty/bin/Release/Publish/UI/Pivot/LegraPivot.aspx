<%@ Page Language="C#" AutoEventWireup="true" Async="true" CodeBehind="LegraPivot.aspx.cs" Inherits="ArezCrm.UI.Pivot.LegraPivot" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="Pivot, Legra" />
    <meta name="googlebot" content="Index, Follow" />
    <meta name="image" content="../../Imagenes/logo.png" />
    <meta content="Crea los reportes que necesites con nuestra herramienta LEGRA Pivot!" name="description" />
    <meta http-equiv="Expires" content="0" />
    <meta http-equiv="Last-Modified" content="0" />
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate" />
    <meta http-equiv="Pragma" content="no-cache" />

    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
    <link href="../../assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="../../assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../../assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="../../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN THEME STYLES -->
    <link rel="stylesheet" type="text/css" href="../../assets/global/plugins/select2/select2.css" />
    <link href="../../assets/global/css/components-rounded.css" id="style_components" rel="stylesheet" type="text/css" />
    <link href="../../assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link href="../../assets/admin/layout4/css/layout.css" rel="stylesheet" type="text/css" />
    <link id="style_color" href="../../assets/admin/layout4/css/themes/light.css" rel="stylesheet" type="text/css" />
    <link href="../../assets/admin/layout4/css/custom.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="libs/dist/pivot.css?v=1" />
    <link rel="stylesheet" href="/assets/plugins/switch/static/stylesheets/bootstrap-switch.css" />
    <%-- TAblas --%>
    <link rel="stylesheet" href="datatables/media/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="datatables/media/css/buttons.dataTables.min.css" />
    <link rel="stylesheet" type="text/css" href="../../assets/global/plugins/bootstrap-editable/bootstrap-editable/css/bootstrap-editable.css" />
    <link rel="shortcut icon" type="image/icon" href="css/Legraisologo.png" />
    <title>LEGRA SRL | Auto-Reportes</title>
    <style>
        .fullscreens {
            z-index: 9999;
            width: 100%;
            height: 1400px;
            position: fixed;
            top: 0;
            background: #333333;
            left: 0;
        }
        .scrollers {

            width: 100%;
            height: 100%;
             
        }
    </style>
</head>

<body class="page-header-fixed page-sidebar-closed-hide-logo page-full-width">
    <div class="page-header navbar navbar-fixed-top">
        <div class="page-header-inner">
            <div class="page-logo">
                <a>
                    <img src="/Img/newElyon.png" alt="logo" style="max-width: 130px;" class="logo-default" />
                </a>
                <div class="menu-toggler sidebar-toggler"></div>
            </div>
            <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"></a>
            <div class="page-top">
                <div class="top-menu">
                    <ul class="nav navbar-nav pull-right">
                        <li class="separator hide"></li>
                        <li class="dropdown dropdown-extended dropdown-tasks dropdown-dark">
                            <a href="#modalNewPvt" class="dropdown-toggle" data-hover="dropdown" data-toggle="modal" data-close-others="true">Nuevo Reporte
                            </a>
                        </li>
                        <li class="separator hide"></li>
                        <li class="dropdown dropdown-extended dropdown-tasks dropdown-dark" onclick="btnCambiaVista();">
                            <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                <i class="fa fa-th-large" id="iconPnl"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="clearfix">
    </div>
    <div class="page-container">
        <div class="page-sidebar-wrapper">
            <div class="page-sidebar navbar-collapse collapse">
                <ul class="page-sidebar-menu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="300">
                    <li class="start ">
                        <a href="index.html">
                            <i class="icon-home"></i>
                            <span class="title">Dashboard</span>
                        </a>
                    </li>

                </ul>
            </div>
        </div>

        <div class="page-content-wrapper">
            <div class="page-content">
                <div class="modal fade" id="modalNewPvt" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" id="closeNewPvt" data-dismiss="modal" aria-hidden="true"></button>
                                <h3 class="modal-title text-center font-green-haze">Crea tu propio Reporte</h3>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <h5>Nombre</h5>
                                                    <input id="txtNombre" runat="server" maxlength="50" placeholder="Ej: Ventas por sucursal..." class="select2 form-control" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <h5>Origen de Datos</h5>
                                                    <select id="ddlVista" required="required" class="form-control select2">
                                                        <option value="-1">Selecciona un Origen</option>
                                                    </select>
                                                    <div style="display: none">
                                                        <input id="lblVistaID" value="-1" runat="server" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <ul class="media-list">
                                            <li class="media">
                                                <div class="media-body">
                                                    <textarea id="txtDesc" maxlength="100" class="form-control todo-taskbody-taskdesc" rows="3" placeholder="Escribe una descripción..."></textarea>
                                                </div>
                                            </li>
                                        </ul>
                                        <button type="button" onclick="newPvt();" class="btn btn-circle green-haze btn-sm pull-right">Guarda el Reporte</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="modalEditTitle" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" id="closeEditTitle" data-dismiss="modal" aria-hidden="true"></button>
                                <h3 class="modal-title text-center font-green-haze">Edita los datos</h3>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <h5>Titulo del reporte</h5>
                                                    <input id="txtTitle" runat="server" maxlength="50" placeholder="Ej: Ventas por sucursal..." class="select2 form-control" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <h5>Descripcion</h5>
                                                    <input id="subTitle" runat="server" maxlength="50" placeholder="Ej: Ventas por sucursal..." class="select2 form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div id="btnTitle"></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="staticModal" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" id="closeStatic" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                <h4 class="modal-title">Descargando datos...</h4>
                            </div>
                            <div class="modal-body">
                                <p>
                                    Estamos descargando la informacion. 
                                </p>
                                <p>Esto puede demorar un poco</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="portlet light">

                    <div class="portlet-body">
                        <div class="row" id="sortable_portlets">

                            <div class="col-md-12 column sortable" style="display: none">
                                <div class="portlet portlet-sortable light bordered">
                                    <div class="portlet-title">
                                        <div class="caption font-green-sharp pencil">
                                            <i class="icon-speech font-green-sharp"></i>
                                            <span class="caption-subject bold uppercase ">Cv Carsa</span>
                                            <span class="caption-helper">todos los cv ingrados...</span>
                                        </div>
                                        <div class="tools">
                                            &nbsp;
                                            <a href="javascript:;" class="collapse" data-original-title="Comprime" title=""></a>
                                            <a href="javascript:;" style="color: gray" data-original-title="CSV" title="Descargar CSV"><i class="fa fa-cloud-download"></i></a>
                                            <a href="javascript:;" class="fullscreen" data-original-title="Pantalla Completa" title=""></a>
                                            <a href="javascript:;" class="remove" data-original-title="Eliminar" title=""></a>
                                        </div>

                                        <div class="actions">
                                            <div class="btn-group">
                                                <a style="margin-left: 15px; margin-right: 15px" class="btn btn-circle btn-default yellow-stripe" href="javascript:saveFormat();">
                                                    <i class="fa fa-save"></i>&nbsp;Guardar Formato&nbsp;
                                                </a>
                                                <a class="btn btn-circle btn-default " href="javascript:;" data-toggle="dropdown">
                                                    <i class="fa fa-filter"></i>&nbsp;Filtros&nbsp; <i class="fa fa-angle-down"></i>
                                                </a>
                                                <ul class="dropdown-menu pull-right">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pencil"></i>Edit </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-trash-o"></i>Delete </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-ban"></i>Ban </a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="i"></i>Make admin </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="btn-group">
                                                <a class="btn btn-circle btn-default " href="javascript:;" data-toggle="dropdown">
                                                    <i class="fa fa-bars"></i>&nbsp;Agrupar&nbsp; <i class="fa fa-angle-down"></i>
                                                </a>
                                                <ul class="dropdown-menu pull-right">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pencil"></i>Edit </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-trash-o"></i>Delete </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-ban"></i>Ban </a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="i"></i>Make admin </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="btn-group">
                                                <a class="btn btn-circle btn-default " href="javascript:;" data-toggle="dropdown">
                                                    <i class="fa fa-calendar"></i>&nbsp;Periodo de Tiempo&nbsp; <i class="fa fa-angle-down"></i>
                                                </a>
                                                <ul class="dropdown-menu pull-right">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pencil"></i>Edit </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-trash-o"></i>Delete </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-ban"></i>Ban </a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="i"></i>Make admin </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="portlet-body">
                                        <div class="scroller" style="height: 600px" data-rail-visible="1" data-rail-color="yellow" data-handle-color="#a1b2bd">
                                            <textarea id="config_json" style="width: 100%; height: 500px; display: none"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 column sortable" style="height: 600px; display: none">
                                <div class="portlet portlet-sortable light bordered">
                                    <div class="portlet-title">
                                        <div class="caption font-green-sharp">
                                            <i class="icon-speech font-green-sharp"></i>
                                            <span class="caption-subject bold uppercase">FUNNEL DE VENTAS</span>
                                            <span class="caption-helper">funel...</span>
                                        </div>
                                        <div class="tools">
                                            &nbsp;
                                            <a href="javascript:;" class="collapse" data-original-title="" title=""></a>
                                            <a href="javascript:;" class="fullscreen" data-original-title="" title=""></a>
                                        </div>

                                        <div class="actions">
                                            <div class="btn-group">
                                                <a class="btn btn-circle btn-default " href="javascript:;" data-toggle="dropdown">
                                                    <i class="fa fa-filter"></i>&nbsp;Filtros&nbsp; <i class="fa fa-angle-down"></i>
                                                </a>
                                                <ul class="dropdown-menu pull-right">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pencil"></i>Edit </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-trash-o"></i>Delete </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-ban"></i>Ban </a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="i"></i>Make admin </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="btn-group">
                                                <a class="btn btn-circle btn-default " href="javascript:;" data-toggle="dropdown">
                                                    <i class="fa fa-bars"></i>&nbsp;Agrupar&nbsp; <i class="fa fa-angle-down"></i>
                                                </a>
                                                <ul class="dropdown-menu pull-right">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pencil"></i>Edit </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-trash-o"></i>Delete </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-ban"></i>Ban </a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="i"></i>Make admin </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="btn-group">
                                                <a class="btn btn-circle btn-default " href="javascript:;" data-toggle="dropdown">
                                                    <i class="fa fa-calendar"></i>&nbsp;Periodo de Tiempo&nbsp; <i class="fa fa-angle-down"></i>
                                                </a>
                                                <ul class="dropdown-menu pull-right">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-pencil"></i>Edit </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-trash-o"></i>Delete </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="fa fa-ban"></i>Ban </a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <a href="javascript:;">
                                                            <i class="i"></i>Make admin </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="portlet-body">

                                        <div class="scroller" style="height: 400px" data-rail-visible="1" data-rail-color="yellow" data-handle-color="#a1b2bd">
                                            <div id="funnel"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="portlet portlet-sortable-empty">
                                </div>
                            </div>
                            <div id="pnlCargando"></div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- END CONTENT -->
    </div>

    <div class="page-footer">
        <div class="page-footer-inner">
            LEGRA Pivot es un producto de LEGRA SRL
        </div>
        <div class="scroll-to-top">
            <i class="icon-arrow-up"></i>
        </div>
    </div>
    <script src="../../assets/global/plugins/jquery.min.js" type="text/javascript"></script>
    <script src="../../assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>
    <!-- IMPORTANT! Load jquery-ui.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
    <script src="../../assets/global/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../../assets/global/plugins/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js" type="text/javascript"></script>
    <script src="../../assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../../assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../assets/global/plugins/select2/select2.min.js"></script>

    <script src="../../assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
    <script src="../../assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
    <script src="../../assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
    <!-- END CORE PLUGINS -->
    <script src="PivotLegra.js?v=2"></script>

    <!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="../../assets/global/scripts/metronic.js" type="text/javascript"></script>
    <script src="../../assets/admin/layout4/scripts/layout.js" type="text/javascript"></script>
    <script type="text/javascript" src="datatables/media/js/dataTables.min.js"></script>
    <script type="text/javascript" src="datatables/media/js/dataTables_buttons.min.js"></script>
    <script type="text/javascript" src="datatables/media/js/jszip.min.js"></script>
    <script type="text/javascript" src="datatables/media/js/buttons_flash.min.js"></script>
    <script type="text/javascript" src="datatables/media/js/pdfmake.min.js"></script>
    <script type="text/javascript" src="datatables/media/js/vfs_fonts.js"></script>
    <script type="text/javascript" src="datatables/media/js/buttons.html5.min.js"></script>
    <script type="text/javascript" src="datatables/media/js/buttons.print.min.js"></script>
    <script type="text/javascript" src="libs/dist/pivot.js"></script>
    <script type="text/javascript" src="libs/ext/d3.v3.min.js"></script>
    <script src="libs/dist/ploty-basic-latest.min.js"></script>
    <script type="text/javascript" src="libs/dist/plotly_renderers.js"></script>
    <script type="text/javascript" src="libs/ext/jsapi.js"></script>
    <script type="text/javascript" src="libs/dist/gchart_renderers.js"></script>
    <script type="text/javascript" src="libs/dist/export_renderers.js"></script>
    <script type="text/javascript" src="libs/dist/d3_renderers.js"></script>
    <script type="text/javascript" src="libs/ext/jquery.ui.touch-punch.min.js"></script>
    <script src="/assets/plugins/switch/static/js/bootstrap-switch.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min.js"></script>
    <script src="libs/d3-funnel.min.js"></script>
    <script src="libs/jquery.slimscroll.min.js"></script>
</body>
</html>
