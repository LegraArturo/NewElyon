 
using System;
using System.ComponentModel;
using System.Data;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ArezCrm.UI.Pivot
{
    public partial class LegraPivot : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                 
                System.Web.Security.FormsIdentity id;
                if (!HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    //Response.Redirect("/UI/VistasDefault/Login.aspx");
                }
            }
        }

    }
}