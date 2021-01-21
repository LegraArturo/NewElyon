using ElyonUI.UI.Com;
using Microsoft.Web.WebSockets;
using System.Web;

namespace Elyon.UI.Com
{
    /// <summary>
    /// Descripción breve de webSocketServer
    /// </summary>
    public class webSocketServer : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            if (context.IsWebSocketRequest)
            {
                context.AcceptWebSocketRequest(new CentralWebSocket());
            }
            else
            {
                // throw new Exception ("This is bad now websocket");
                context.Response.ContentType = "text/plain";
                context.Response.Write("Web Socket Worket ok. LEGRA SRL");
                context.Response.End();
            }
        }

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
    }
}