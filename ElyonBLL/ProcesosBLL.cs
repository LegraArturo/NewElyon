
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace ElyonBLL
{

    public class ProcesosBLL
    {
        string key = "ABCDEFG546ASDFlas4546654def852846opqrstSDFuvwxyz";
       
        public static string encriptar(string laCadena)
        {
            SHA1CryptoServiceProvider elProveedor = new SHA1CryptoServiceProvider();
            byte[] vectoBytes = System.Text.Encoding.UTF8.GetBytes(laCadena);
            byte[] inArray = elProveedor.ComputeHash(vectoBytes);
            elProveedor.Clear();
            return Convert.ToBase64String(inArray);
        }
         
        public DataTable importarTxt(string FilePath)
        {
            DataTable dt = new DataTable("Datos");
            string[] columns = null;

            var lines = File.ReadAllLines(FilePath);

            if (lines.Count() > 0)
            {
                columns = lines[0].Split(new char[] { ';' });

                foreach (var column in columns)
                {
                    dt.Columns.Add(column);
                }
            }

            for (int i = 1; i < lines.Count(); i++)
            {
                DataRow dr = dt.NewRow();
                string[] values = lines[i].Split(new char[] { ';' });

                for (int j = 0; j < values.Count() && j < columns.Count(); j++)
                {
                    dr[j] = values[j];
                }
                dt.Rows.Add(dr);
            }
            return dt;
        }
        public string encriptaLlave(string cadena)
        {
            byte[] keyArray;
            byte[] Arreglo_a_Cifrar =
            UTF8Encoding.UTF8.GetBytes(cadena);

            MD5CryptoServiceProvider hashmd5 =
            new MD5CryptoServiceProvider();
            keyArray = hashmd5.ComputeHash(
            UTF8Encoding.UTF8.GetBytes(key));

            hashmd5.Clear();

            TripleDESCryptoServiceProvider tdes =
            new TripleDESCryptoServiceProvider();

            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform =
            tdes.CreateEncryptor();

            byte[] ArrayResultado =
            cTransform.TransformFinalBlock(Arreglo_a_Cifrar,
            0, Arreglo_a_Cifrar.Length);

            tdes.Clear();

            return Convert.ToBase64String(ArrayResultado,
                   0, ArrayResultado.Length);

        }
        public string desencriptaLlave(string clave)
        {
            byte[] keyArray;
            byte[] Array_a_Descifrar =
            Convert.FromBase64String(clave);

            MD5CryptoServiceProvider hashmd5 =
            new MD5CryptoServiceProvider();

            keyArray = hashmd5.ComputeHash(
            UTF8Encoding.UTF8.GetBytes(key));

            hashmd5.Clear();

            TripleDESCryptoServiceProvider tdes =
            new TripleDESCryptoServiceProvider();

            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform =
             tdes.CreateDecryptor();

            byte[] resultArray =
            cTransform.TransformFinalBlock(Array_a_Descifrar,
            0, Array_a_Descifrar.Length);

            tdes.Clear();
            return UTF8Encoding.UTF8.GetString(resultArray);
        }
        public bool creaDirectorio(string ruta)
        {
            bool existeArchivo = Directory.Exists(ruta);
            try
            {
                if (!existeArchivo)
                {
                    System.IO.Directory.CreateDirectory(ruta);
                    return true;
                }
                else
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public string getDocPath(string _type)
        {
            System.Web.Security.FormsIdentity id;
            var ds = new DataSet("dataSet");
            ds.Namespace = "getConfData";
            try
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    int usuID = Convert.ToInt32(id.Ticket.UserData);

                    using (var cnn = Conexion.SqlConnection())
                    {
                        using (var da = new SqlDataAdapter("getConfData", cnn))
                        {
                            da.SelectCommand.CommandType = CommandType.StoredProcedure;
                            da.SelectCommand.Parameters.Add("@type", SqlDbType.VarChar).Value = _type;
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
