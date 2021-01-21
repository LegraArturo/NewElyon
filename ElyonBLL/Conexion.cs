using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ElyonBLL
{
    public static class Conexion
    {
        public static SqlConnection SqlConnection()
        {
            var cnn = new SqlConnection(ConnectionStringSQL);
            cnn.Open();
            return cnn;
        }
        public static string ConnectionStringSQL
        {
            get
            {
                return System.Configuration.ConfigurationManager.ConnectionStrings["Elyon_crmConnectionString"].ConnectionString;
            }
        }
    }
}