var iniSocket = function () {
    var nombre = getParameterByName("chatName");
    //var wsUri = "wss://localhost:44336/UI/Com/webSocketServer.ashx?chatName=Ezequiel";
    var wsUri = "wss://localhost:44336/UI/Com/webSocketServer.ashx?chatName=" + nombre;
    var websocket;
    var output;
    var idSesion;
    var btnSend;
    function init() {
        output = document.getElementById("converacion");
        btnSend = document.getElementById("send");
        message = document.getElementById("message");
        idSesion = Math.floor(Math.random() * (10000 - 1)) + 1;

        btnSend.addEventListener('click', function () {
            if (message.value !== null || message.value !== "") {
                doSend(message.value);
                message.value = null;
            }
        });

        message.addEventListener('keypress', function (e) {
            if (e.which === 13 && !e.shiftKey) {
                e.preventDefault();
                btnSend.click();
                return false;
            }

        });

        connect();
    }
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    function connect() {
        try {

            websocket = new WebSocket(wsUri);

            websocket.onopen = function (evt) { onOpen(evt); };
            websocket.onclose = function (evt) { onClose(evt); };
            websocket.onmessage = function (evt) { onMessage(evt); };
            websocket.onerror = function (evt) { onError(evt); };

        } catch (err) {
            writeToScreen('error' + err);
        }
    }

    function onOpen(evt) {
        writeToScreen("CONNECTADO");
    }

    function onClose(evt) {
        setTimeout(function () {
            init();
        }, 1000);
        writeToScreen("DISCONNECTED");
    }

    function onMessage(evt) {
        var text = "";
        var msg = JSON.parse(evt.data);
        var time = new Date(msg.date);
        var timeStr = time.toLocaleTimeString();
        switch (msg.type) {
            case "id":
                clientID = msg.id;
                //setUsername();
                break;
            case "username":
                text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
                break;
            case "message":
                text = '<div class="row message-body"><div class="col-sm-12 message-main-receiver">' +
                    '<div class="receiver"><div class="message-text">' +
                    msg.text + '</div><span class="message-time pull-right">' + timeStr +
                    '</span></div></div></div>';

                if (idSesion !== msg.id) {
                    text = '<div class="row message-body"><div class="col-sm-12 message-main-sender">' +
                        '<div class="sender"><div class="message-text">' +
                        msg.text + '</div><span class="message-time pull-right">' + timeStr +
                        '</span></div></div></div>';
                }
                break;
            case "rejectusername":
                text = "<b>Your username has been set to <em>" + msg.name + "</em> because the name you chose is in use.</b><br>"
                break;
            case "userlist":
                var ul = "";
                for (i = 0; i < msg.users.length; i++) {
                    ul += msg.users[i] + "<br>";
                }
                document.getElementById("userlistbox").innerHTML = ul;
                break;
        }

        writeToScreen(text);
    }
    function onError(evt) {
        writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    function doSend(message) {
        if (message !== "") {

            var msg = {
                type: "message",
                text: message,
                id: idSesion,//Id del usuario
                name: "Eze: " + idSesion,
                date: new Date()
            };

            if (websocket.readyState !== websocket.OPEN) {
                console.error("webSocket is not open: " + webSocket.readyState);
                return;
            }
            websocket.send(JSON.stringify(msg));
            console.log(JSON.stringify(msg));
        }
    }

    function writeToScreen(message) {
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message;
        output.appendChild(pre);
        converacion.scrollTop = converacion.scrollHeight;
    }

    return {
        init: function () {
            init();
        }
    };
}();

