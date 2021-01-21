using Microsoft.Web.WebSockets;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Timers;
using System.Web.Script.Serialization;

namespace ElyonUI.UI.Com
{
    public class CentralWebSocket : WebSocketHandler
    {

        private static WebSocketCollection client = new WebSocketCollection();
        private string name;

        public override void OnOpen()
        {
            this.name = this.WebSocketContext.QueryString["chatName"] ?? "test";
            client.Add(this);
            SetTimer();
        }
        private System.Timers.Timer aTimer;
        private void SetTimer()
        {
            aTimer = new System.Timers.Timer(2000);
            aTimer.Elapsed += OnTimedEvent;
            aTimer.AutoReset = true;
            aTimer.Enabled = true;
        }
        private void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
            mjEstructura mj = new mjEstructura();
            mj.name = name;
            mj.type = "message";
            mj.text = "Hola AMigo: " + name;
            mj.id = "9248";
            mj.date = "2020-03-26T15:28:39.007Z";

            JavaScriptSerializer js = new JavaScriptSerializer();
            string jsonData = js.Serialize(mj);

           // client.Broadcast("HOLA estoy enviando cada 1 seg " + e.SignalTime);
            if (name == "Ezequiel")
                client.SingleOrDefault(r => ((CentralWebSocket)r).name == "Ezequiel").Send(jsonData);
            if (name == "Alberto")
                client.SingleOrDefault(r => ((CentralWebSocket)r).name == "Alberto").Send(jsonData);
        }

        public override void OnMessage(string message)
        {
            client.Broadcast(message);
        }
        public override void OnClose()
        {
            client.Remove(this);
            client.Broadcast(string.Format("{0} has gone away", name));

            if (aTimer != null)
            {
                aTimer.Stop();
                aTimer.Dispose();
            }
        }

        public class mjEstructura
        {
            public string type { get; set; }
            public string text { get; set; }
            public string id { get; set; }
            public string name { get; set; }
            public string date { get; set; }
        }
    }
}