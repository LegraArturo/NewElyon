using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace arezcrm.UI.Multilist
{
    public partial class MultiSelect : System.Web.UI.Page
    {
   
        
        protected void Page_Load(object sender, EventArgs e)
        {
           
        }

        protected void btnAceptar_Click(object sender, EventArgs e)
        {
            string smj = "";
            
            foreach (ListItem listItem in lblMultiSelect.Items)
            {
                if (listItem.Selected)
                {
                    var val = listItem.Value;
                    var txt = listItem.Text;
                    smj += val.ToString() + " ";
                }
            }
            lblSelected.Text = smj;
        }
     
    }
}