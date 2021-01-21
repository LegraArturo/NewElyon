// tipo de mensajes: error, success, info, warning
document.write('<script src="/assets/global/plugins/bootstrap-toastr/toastr.min.js" type="text/javascript"></script>');
function showToast(titulo, mensaje, tipoMsg) {
     
    var i = -1,
    toastCount = 0,
    $toastlast,
    getMessage = function () {
        var msgs = ['Hello, some notification sample goes here',
            '<div><input class="form-control input-small" value="textbox"/>&nbsp;<a href="http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes" target="_blank">Check this out</a></div><div><button type="button" id="okBtn" class="btn blue">Close me</button><button type="button" id="surpriseBtn" class="btn default" style="margin: 0 8px 0 8px">Surprise me</button></div>',
            'Did you like this one ? :)',
            'Totally Awesome!!!',
            'Yeah, this is the Metronic!',
            'Explore the power of Metronic. Purchase it now!'
        ];
        i++;
        if (i === msgs.length) {
            i = 0;
        }
        return msgs[i];
    };
       
    var shortCutFunction = tipoMsg;
    var msg = '<div class="row"><div class="col-md-12">' + mensaje + '</div></div><div class="row"><div class="col-md-12 pull-right"><button type="button" id="surpriseBtn" onclick="toastr.clear();" class="btn default yellow-stripe pull-right">Leído</button></div></div>';
    var title = titulo || 'Mensaje';
    var $showDuration = "1000";
    var $hideDuration = "1000";
    var $timeOut = "3000";
    var $extendedTimeOut = "1000";
    var $showEasing = "swing";
    var $hideEasing = "linear";
    var $showMethod = "fadeIn";
    var $hideMethod = "fadeOut";
    var toastIndex = toastCount++;

    toastr.options = {
        closeButton: true,
        debug: false,
        positionClass: 'toast-top-center',
        onclick: null
    };
     
    toastr.options.showDuration = $showDuration;
    toastr.options.hideDuration = $hideDuration;
    toastr.options.timeOut = $timeOut;
    toastr.options.extendedTimeOut = $extendedTimeOut;
    toastr.options.showEasing = $showEasing;
    toastr.options.hideEasing = $hideEasing;
    toastr.options.showMethod = $showMethod;
    toastr.options.hideMethod = $hideMethod;


    if (!msg) {
        msg = getMessage();
    }
     $("#toastrOptions").text("Command: toastr[" + shortCutFunction + "](\"" + msg + (title ? "\", \"" + title : '') + "\")\n\ntoastr.options = " + JSON.stringify(toastr.options, null, 2));

    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;
 
    $('#clearlasttoast').click(function () {
        toastr.clear($toastlast);
    });
    
    setTimeout(function () { toastr.remove(); }, $timeOut);
    if ($toast.find('#okBtn').length) {
        $toast.delegate('#okBtn', 'click', function () {
            alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
            $toast.remove();
        });
    }
    
}
function LimpiarToast() {
    toastr.remove();
}