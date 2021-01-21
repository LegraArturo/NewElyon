<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="ArezCrmUI.Login" %>

<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>LEGRA SRL | Login</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta name="keywords" content="puntos, legra srl, legra, loyalty, recompensas" />
    <meta name="googlebot" content="Index, Follow" />
    <meta name="image" content="../../Imagenes/logo.png" />
    <meta content="Todo esfuerzo tiene recompensas! ganas vos, ganamos todos! Elyon Loyalty" name="description" />
    <link href="/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/select2/select2.css" rel="stylesheet" type="text/css" />
    <link href="/assets/admin/pages/css/login-soft.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/components-rounded.css" id="style_components" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link href="/assets/admin/layout/css/layout.css" rel="stylesheet" type="text/css" />
    <link id="style_color" href="/assets/admin/layout/css/themes/default.css" rel="stylesheet" type="text/css" />
    <link href="/assets/admin/layout/css/custom.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" type="image/icon" href="../img/favicon.png" />
    
    <link rel="stylesheet" type="text/css" href="/assets/global/plugins/bootstrap-toastr/toastr.min.css" />
</head>
<body class="login">
    <div class="logo">
        <a href="#">
            <img width="220" src="../img/NewElyon.png" />
        </a>
    </div>
    <div class="menu-toggler sidebar-toggler">
    </div>
    <div class="content">
        <form class="login-form" runat="server" method="post">
            <h3 class="form-title">Ingresa al Sistema</h3>
            <div class="alert alert-danger display-hide">
                <button class="close" data-close="alert"></button>
                <span>Ingresa tu Usuario y Contraseña. </span>
                <asp:Label ID="lblUsuario" runat="server" Visible="False"></asp:Label>
            </div>
            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">Usuario</label>
                <div class="input-icon">
                    <i class="fa fa-user"></i>
                    <input class="form-control placeholder-no-fix" type="text" autocomplete="off" autofocus="autofocus"
                        placeholder="Usuario" id="txtUsuario"   name="username" />
                </div>
            </div>
            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">Password</label>
                <div class="input-icon">
                    <i class="fa fa-lock"></i>
                    <input class="form-control placeholder-no-fix" type="password"  
                        autocomplete="off" placeholder="Password" id="txtPass"   name="password" />
                </div>
            </div>
            <div class="form-actions">
                <div class="md-checkbox-list">
                    <div class="md-checkbox">
                        <input type="checkbox" id="checkbox11111" onchange="check();"  class="md-check">
                        <label for="checkbox11111">
                            <span class="inc"></span>
                            <span class="check"></span>
                            <span class="box"></span>
                            Recuerdame</label>
                    </div>
                </div>
                <span onclick="btnLogin();"  class="btn blue pull-right">Aceptar&nbsp;<i class='m-icon-swapright m-icon-white'></i></span>
                
            </div>
            <label runat="server" id="lblCantInt" style="display: none"></label>
        </form>
     
    </div>
    <div class="copyright">
        2020 &copy; LEGRA SRL. Todos los Derechos Reservados
    </div>
    <script src="/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/backstretch/jquery.backstretch.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="/assets/global/plugins/select2/select2.min.js"></script>
    <script src="/assets/global/scripts/metronic.js" type="text/javascript"></script>
    <script src="/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
    <script src="/assets/admin/pages/scripts/login-soft.js" type="text/javascript"></script>
    <script src="assets/local/Login.js?v=3"></script>
    <script src="assets/local/ToastMsg.js"></script>
    <script>
        jQuery(document).ready(function () {
            Metronic.init(); // init metronic core components
            Layout.init(); // init current layout
            getData(true);
            $.backstretch([
             "/assets/admin/pages/media/bg/1.jpg",
             "/assets/admin/pages/media/bg/2.jpg",
             "/assets/admin/pages/media/bg/3.jpg",
             "/assets/admin/pages/media/bg/4.jpg"
            ], {
                fade: 1000,
                duration: 3000
            }
         );
        });
        
    </script>
     
</body>
</html>
