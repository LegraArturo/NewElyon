using ElyonBLL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace ArezCrm.UI.Pivot
{
    /// <summary>
    /// Descripción breve de PivotWS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class PivotWS : System.Web.Services.WebService
    {

        System.Web.Security.FormsIdentity id;
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getDatosQueryFirst(string _cID, string _type)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "PivotData";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspPivotData", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = usuID;
                            da.SelectCommand.Parameters.Add("@cID", SqlDbType.VarChar).Value = _cID;
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
        public string uspPivotAdd(string _regID, string _type, string _nombre, string _desc, string _orden, string _vID)
        {
            var ds = new DataSet("dataSet");
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspPivotAdd", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@regID", SqlDbType.VarChar).Value = _regID;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = usuID;
                            da.SelectCommand.Parameters.Add("@tipo", SqlDbType.VarChar).Value = _type;
                            da.SelectCommand.Parameters.Add("@nombre", SqlDbType.VarChar).Value = _nombre;
                            da.SelectCommand.Parameters.Add("@descripcion", SqlDbType.VarChar).Value = _desc;
                            da.SelectCommand.Parameters.Add("@orden", SqlDbType.VarChar).Value = _orden;
                            da.SelectCommand.Parameters.Add("@vID", SqlDbType.VarChar).Value = _vID;
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
        public string getDataViewList(string _type)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "PivotData";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspPivotAddView", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@vID", SqlDbType.Int).Value = 1;
                            da.SelectCommand.Parameters.Add("@tipo", SqlDbType.VarChar).Value = _type;
                            da.SelectCommand.Parameters.Add("@nombre", SqlDbType.VarChar).Value = "";
                            da.SelectCommand.Parameters.Add("@ctaID", SqlDbType.Int).Value = usuID;
                            da.SelectCommand.Parameters.Add("@query", SqlDbType.VarChar).Value = "";
                            da.SelectCommand.Parameters.Add("@filtraUsu", SqlDbType.VarChar).Value = "";
                            da.SelectCommand.Parameters.Add("@usuField", SqlDbType.VarChar).Value = "";
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
        public string getDatosQueryID(string _cID)
        {
            var ds = new DataSet("dataSet");
            ds.Namespace = "PivotData";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("uspPivotDataQuery", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@cID", SqlDbType.VarChar).Value = _cID;
                            da.SelectCommand.Parameters.Add("@usuID", SqlDbType.VarChar).Value = usuID;
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
