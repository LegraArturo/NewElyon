using ElyonBLL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Security;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ArezCrmUI
{
    public partial class Login : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Session.Abandon();
                FormsAuthentication.SignOut();
                lblCantInt.InnerText = "0";
            }
        }
        
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static string autentication(string _inicioSesion, string _Pass, string _type)
        {
            DataTable dt = new DataTable();
            string passEncriptado = ProcesosBLL.encriptar(_Pass);
            try
            {

                using (var cnn = Conexion.SqlConnection())
                {
                    using (var da = new SqlDataAdapter("uspLogin", cnn))
                    {
                        da.SelectCommand.CommandType = CommandType.StoredProcedure;
                        da.SelectCommand.Parameters.Add("@usuInicioSesion", SqlDbType.VarChar).Value = _inicioSesion;
                        da.SelectCommand.Parameters.Add("@Pass", SqlDbType.VarChar).Value = passEncriptado;
                        da.SelectCommand.Parameters.Add("@Type", SqlDbType.VarChar).Value = _type;
                        da.SelectCommand.Parameters.Add("@hdb", SqlDbType.VarChar).Value = "wersd@Sdf34sD53902SDSDFmaso9w0weASDFsdl1515620sd3042SDFg=";
                        da.SelectCommand.Parameters.Add("@nombres", SqlDbType.VarChar).Value = "";
                        da.SelectCommand.Parameters.Add("@apellidos", SqlDbType.VarChar).Value = "";
                        da.SelectCommand.Parameters.Add("@email", SqlDbType.VarChar).Value = "";
                        da.SelectCommand.Parameters.Add("@tel", SqlDbType.VarChar).Value = "";
                        da.SelectCommand.Parameters.Add("@sucID", SqlDbType.VarChar).Value = "";
                        da.SelectCommand.Parameters.Add("@lineaID", SqlDbType.VarChar).Value = "";
                        da.Fill(dt);

                        if (dt.Rows.Count > 0)
                        {

                            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                            serializer.MaxJsonLength = int.MaxValue;
                            List<Dictionary<string, object>> Rows = new List<Dictionary<string, object>>();
                            Dictionary<string, object> row;
                            foreach (DataRow dr in dt.Rows)
                            {
                                row = new Dictionary<string, object>();
                                foreach (DataColumn col in dt.Columns)
                                {
                                    row.Add(col.ColumnName, dr[col]);
                                    if (col.ColumnName == "usuID")
                                        Autenticar(dr.ItemArray[0].ToString());
                                }

                                Rows.Add(row);
                            }
                            return serializer.Serialize(Rows);
                        }
                        else
                        {
                            return "[{resultado: 'No'}]";
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

       
        private static void Autenticar(string usuID)
        {
            FormsAuthenticationTicket tkt;
            String cook;
            HttpCookie ck;
            tkt = new FormsAuthenticationTicket(2, usuID, DateTime.Now, DateTime.Now.AddMinutes(30), false, usuID);
            cook = FormsAuthentication.Encrypt(tkt);
            ck = new HttpCookie(FormsAuthentication.FormsCookieName, cook);
            HttpContext.Current.Response.Cookies.Add(ck);
        }
        
    }
}