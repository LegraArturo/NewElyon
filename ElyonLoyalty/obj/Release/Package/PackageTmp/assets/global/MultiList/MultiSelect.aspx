<%@ Page Title="" Language="C#" MasterPageFile="~/UI/Login/Blanco.Master" AutoEventWireup="true" CodeBehind="MultiSelect.aspx.cs" Inherits="arezcrm.UI.Multilist.MultiSelect" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="/ui/MultiList/bootstrap-chosen.css" rel="stylesheet" />
    <link rel="stylesheet" href="bootstrap.css" />
    <style>
        body {
            margin-bottom: 144px;
        }

        header {
            margin: 72px 0 36px;
        }

            header h1 {
                font-size: 54px;
            }
    </style>
    <script src="/UI/MultiList/Chosen.js"></script>
    <script src="/UI/MultiList/jquery.min.js"></script>
    <script>
        $(function () {
            $('.chosen-select').chosen();
            $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
        });
    </script>
    <div class="container">

        <div class="row" style="margin-top: 50px;">
            <div class="col-lg-4"></div>
            <div class="col-lg-4">
                <div class="panel panel-danger">
                    <div class="panel-heading">
                        <h4>Su Sesión Caducó
                        </h4>
                    </div>
                    <div class="panel-body">
                        <div class="tab-content">
                            <asp:Button ID="btnAceptar" runat="server" Text="Aceptar" CssClass="btn btn-lg center-block btn-danger" OnClick="btnAceptar_Click" />
                            
                            <asp:ListBox runat="server" ID="lblMultiSelect" data-placeholder="Choose a Country" class="chosen-select form-control" SelectionMode="multiple">
                               <asp:ListItem Value="Asuncion" Text="Asuncion"></asp:ListItem>
                                <asp:ListItem Value="Pedro Juan Caballero" Text="Pedro Juan Caballero"></asp:ListItem>
                                <asp:ListItem Value="Luque" Text="Luque"></asp:ListItem>
                                <asp:ListItem Value="San Lorenzo" Text="San Lorenzo"></asp:ListItem>
                                <asp:ListItem Value="Lambare" Text="Lambare"></asp:ListItem>
                            </asp:ListBox>
                        </div>
                    </div>
                    <asp:Label runat="server" ID="lblSelected" Text="Seleccionado" CssClass="label label-danger"></asp:Label>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
