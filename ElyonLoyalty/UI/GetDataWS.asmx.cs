using ElyonBLL;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace ElyonLoyalty.UI
{

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class GetDataWS : System.Web.Services.WebService
    {
        System.Web.Security.FormsIdentity id;

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string CheckLogin()
        {
            if (HttpContext.Current.User.Identity.IsAuthenticated) // here check is vliad user
                return "[{resultado: 'SI'}]";
            else
                return "[{resultado: 'No'}]";

        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getMenuList(string _type, string _find)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "Search";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspGetMenuList", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = usuID;
                            da.SelectCommand.Parameters.Add("@type", SqlDbType.VarChar).Value = _type;
                            da.SelectCommand.Parameters.Add("@search", SqlDbType.VarChar).Value = _find;
                            da.Fill(ds);
                        }
                    }
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        string json = JsonConvert.SerializeObject(ds, Formatting.Indented);
                        return json;
                    }
                }
                return "[{resultado: 'No'}]";
            }
            catch (Exception ex)
            {
                return "[{resultado: 'No'}]";
            }
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getSolicitudesList(string _cID, string _type, string _nroFactura, string _fechaFactura, string _codID)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "SolicitudesData";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspGetCargaVentasList", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = usuID;
                            da.SelectCommand.Parameters.Add("@cID", SqlDbType.VarChar).Value = _cID;
                            da.SelectCommand.Parameters.Add("@type", SqlDbType.VarChar).Value = _type;
                            da.SelectCommand.Parameters.Add("@nroFactura", SqlDbType.VarChar).Value = _nroFactura;
                            da.SelectCommand.Parameters.Add("@fechaVta", SqlDbType.VarChar).Value = _fechaFactura;
                            da.SelectCommand.Parameters.Add("@codID", SqlDbType.VarChar).Value = _codID;
                            da.Fill(ds);
                        }
                    }
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        string json = JsonConvert.SerializeObject(ds, Formatting.Indented);
                        return json;
                    }
                }
                return "[{resultado: 'No'}]";
            }
            catch (Exception ex)
            {
                return "[{resultado: 'No'}]";
            }

        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getProductosList(string _cID, string _type, string _nroFactura, string _fechaFactura, string _codID)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "ProductosData";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspGetProductos", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = usuID;
                            da.SelectCommand.Parameters.Add("@cID", SqlDbType.VarChar).Value = _cID;
                            da.SelectCommand.Parameters.Add("@type", SqlDbType.VarChar).Value = _type;
                            da.SelectCommand.Parameters.Add("@nroFactura", SqlDbType.VarChar).Value = _nroFactura;
                            da.SelectCommand.Parameters.Add("@fechaVta", SqlDbType.VarChar).Value = _fechaFactura;
                            da.SelectCommand.Parameters.Add("@codID", SqlDbType.VarChar).Value = _codID;
                            da.Fill(ds);
                        }
                    }
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        string json = JsonConvert.SerializeObject(ds, Formatting.Indented);
                        return json;
                    }
                }
                return "[{resultado: 'No'}]";
            }
            catch (Exception ex)
            {
                return "[{resultado: 'No'}]";
            }

        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string setProductosList(string _cID, string _type, string _nombre, string _catID, string _marcaID, string _codArt, string _pts)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "SolicitudesData";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspGetProductos", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = usuID;
                            da.SelectCommand.Parameters.Add("@type", SqlDbType.VarChar).Value = _type;
                            da.SelectCommand.Parameters.Add("@cID", SqlDbType.VarChar).Value = _cID;
                            da.SelectCommand.Parameters.Add("@nombre", SqlDbType.VarChar).Value = _nombre;
                            da.SelectCommand.Parameters.Add("@catID", SqlDbType.VarChar).Value = _catID;
                            da.SelectCommand.Parameters.Add("@marcaID", SqlDbType.VarChar).Value = _marcaID;
                            da.SelectCommand.Parameters.Add("@codArt", SqlDbType.VarChar).Value = _codArt;
                            da.SelectCommand.Parameters.Add("@pts", SqlDbType.VarChar).Value = _pts;
                            da.Fill(ds);
                        }
                    }
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        string json = JsonConvert.SerializeObject(ds, Formatting.Indented);
                        return json;
                    }
                }
                return "[{resultado: 'No'}]";
            }
            catch (Exception ex)
            {
                return "[{resultado: 'No'}]";
            }

        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string setProductosSolList(string _cID, string _type, string _cant, string _pts)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "uspSetProductosList";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspSetProductosList", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@cID", SqlDbType.VarChar).Value = _cID;
                            da.SelectCommand.Parameters.Add("@type", SqlDbType.VarChar).Value = _type;
                            da.SelectCommand.Parameters.Add("@cant", SqlDbType.VarChar).Value = _cant;
                            da.SelectCommand.Parameters.Add("@pts", SqlDbType.VarChar).Value = _pts;
                            da.Fill(ds);
                        }
                    }
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        string json = JsonConvert.SerializeObject(ds, Formatting.Indented);
                        return json;
                    }
                }
                return "[{resultado: 'No'}]";
            }
            catch (Exception ex)
            {
                return "[{resultado: 'No'}]";
            }

        }


        /// Canjes
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string setProdCanjes(string _cID, string _type, string _nombre, string _Desc, string _MarcaID,
              string _catID, string _pts, string _costo, string _obs)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "ProductosCanje";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspGetProdCanjeList", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = usuID;
                            da.SelectCommand.Parameters.Add("@cID", SqlDbType.VarChar).Value = _cID;
                            da.SelectCommand.Parameters.Add("@type", SqlDbType.VarChar).Value = _type;
                            da.SelectCommand.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = _nombre;
                            da.SelectCommand.Parameters.Add("@Desc", SqlDbType.VarChar).Value = _Desc;
                            da.SelectCommand.Parameters.Add("@MarcaID", SqlDbType.VarChar).Value = _MarcaID;
                            da.SelectCommand.Parameters.Add("@CatID", SqlDbType.VarChar).Value = _catID;
                            da.SelectCommand.Parameters.Add("@Pts", SqlDbType.VarChar).Value = _pts;
                            da.SelectCommand.Parameters.Add("@Costo", SqlDbType.VarChar).Value = _costo;
                            da.SelectCommand.Parameters.Add("@Obs", SqlDbType.VarChar).Value = _obs;
                            da.Fill(ds);
                        }
                    }
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        string json = JsonConvert.SerializeObject(ds, Formatting.Indented);
                        return json;
                    }
                }
                return "[{resultado: 'No'}]";
            }
            catch (Exception ex)
            {
                return "[{resultado: 'No'}]";
            }

        }


        /// USUARIOS
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string setUsuarios(string _usuID, string _type, string _nombre, string _apellidos, string _sucID,
              string _email, string _tel, string _login)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "UsuariosList";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspSetUsuariosList", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = _usuID;
                            da.SelectCommand.Parameters.Add("@type", SqlDbType.VarChar).Value = _type;
                            da.SelectCommand.Parameters.Add("@Nombres", SqlDbType.VarChar).Value = _nombre;
                            da.SelectCommand.Parameters.Add("@Apellidos", SqlDbType.VarChar).Value = _apellidos;
                            da.SelectCommand.Parameters.Add("@sucID", SqlDbType.VarChar).Value = _sucID;
                            da.SelectCommand.Parameters.Add("@email", SqlDbType.VarChar).Value = _email;
                            da.SelectCommand.Parameters.Add("@tel", SqlDbType.VarChar).Value = _tel;
                            da.SelectCommand.Parameters.Add("@iniciosesion", SqlDbType.VarChar).Value = _login;
                            da.Fill(ds);
                        }
                    }
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        string json = JsonConvert.SerializeObject(ds, Formatting.Indented);
                        return json;
                    }
                }
                return "[{resultado: 'No'}]";
            }
            catch (Exception ex)
            {
                return "[{resultado: 'No'}]";
            }

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string setFoto(string _usuID, string _img)
        {
            string _imgString = guardaFotos(_img, _usuID);

            var ds = new DataSet("dataSet");
            ds.Namespace = "UsuariosList";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspSetUsuariosList", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = _usuID;
                            da.SelectCommand.Parameters.Add("@type", SqlDbType.VarChar).Value = "F";
                            da.SelectCommand.Parameters.Add("@Nombres", SqlDbType.VarChar).Value = _imgString;
                            da.SelectCommand.Parameters.Add("@Apellidos", SqlDbType.VarChar).Value = "";
                            da.SelectCommand.Parameters.Add("@sucID", SqlDbType.VarChar).Value = "";
                            da.SelectCommand.Parameters.Add("@email", SqlDbType.VarChar).Value = "";
                            da.SelectCommand.Parameters.Add("@tel", SqlDbType.VarChar).Value = "";
                            da.SelectCommand.Parameters.Add("@iniciosesion", SqlDbType.VarChar).Value = "";
                            da.Fill(ds);
                        }
                    }
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        string json = JsonConvert.SerializeObject(ds, Formatting.Indented);
                        return json;
                    }
                }
                return "[{resultado: 'No'}]";
            }
            catch (Exception ex)
            {
                return "[{resultado: 'No'}]";
            }

        }
        private string guardaFotos(string foto, string usuID)
        {
            ProcesosBLL conf = new ProcesosBLL();
            Random rnd = new Random();
            string myJSON = conf.getDocPath("U"); // esta es la ruta fisica

            var data = (JObject)JsonConvert.DeserializeObject(myJSON);
            var path = data["Table"][0]["fotoPerfil"].ToString();
            var pathVirtual = data["Table"][0]["fotoVirtual"].ToString();
            //path = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments); //este pongo para porbar

            var bytes = Convert.FromBase64String(foto.Replace("data:image/png;base64,", String.Empty).Replace("data:image/jpg;base64,", String.Empty).Replace("data:image/jpeg;base64,", String.Empty));

            var pathPic = usuID + "\\UserPict";
            var usuPath = Path.Combine(path, pathPic);
            ///Comprueba Directorio
            bool exists = System.IO.Directory.Exists(usuPath);
            if (!exists)
                System.IO.Directory.CreateDirectory(usuPath);

            string fileName = "fotoPerfil.PNG";
            string filename = Path.Combine(usuPath, fileName);

            if (!File.Exists(filename))
            {
                using (var stream = new MemoryStream(bytes))
                {
                    File.WriteAllBytes(filename, bytes);
                }
            }

            string rutaVirtual = Path.Combine(Path.Combine(pathVirtual, pathPic), fileName);
            return rutaVirtual;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string setPass(string _usuID, string _type, string _nombre, string _apellidos, string _sucID,
              string _email, string _tel, string _login)
        {
            string passEncriptado = ProcesosBLL.encriptar(_nombre);

            string rpt = setUsuarios(_usuID, _type, passEncriptado, "", "", "", "", "");

            return rpt;

        }


        /// DASHBOARD
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getDashboard(string _type, string _usuID)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "DashBoardList";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspDashBoard", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@type", SqlDbType.VarChar).Value = _type;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = _usuID;
                            da.Fill(ds);
                        }
                    }
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        string json = JsonConvert.SerializeObject(ds, Formatting.Indented);
                        return json;
                    }
                }
                return "[{resultado: 'No'}]";
            }
            catch (Exception ex)
            {
                return "[{resultado: 'No'}]";
            }

        }

    }
}
