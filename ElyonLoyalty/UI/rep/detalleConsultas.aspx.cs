 
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Grapp.UI.rep
{
    public partial class detalleConsultas : System.Web.UI.Page
    { 
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                System.Web.Security.FormsIdentity id;
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    id = (System.Web.Security.FormsIdentity)HttpContext.Current.User.Identity;
                    lblUsuID.Text = id.Ticket.UserData;

                }
                else
                {
                    Response.Redirect("/UI/index.aspx");
                }

            }
        }

    }
}