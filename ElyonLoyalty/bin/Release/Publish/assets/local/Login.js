function login(user, pass, type) {
	localStorage.setItem("user", user);
	localStorage.setItem("pass", pass);
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({
			_inicioSesion: user,
			_Pass: pass,
			_type: type
		}),
		url: "Login.aspx/autentication",
		dataType: "json",
		success: function (data) {
			if (data.d === "" || data.d === "[{resultado: 'No'}]") {
				return;
			}
			var miObjeto = data;
			var tipo = "";
			var nombres = "";
			try {
				if (data.d !== "[{resultado: 'No'}]") {
					for (var propiedad in miObjeto) {
						if (miObjeto.hasOwnProperty(propiedad)) {
							var datos = JSON.parse(miObjeto[propiedad]);
							datos.forEach(function (item) {
								var items = Object.keys(item);
								items.forEach(function (key) {
									if (key === "tipo")
										tipo = item[key];
									if (key === "usuID")
										localStorage.setItem("usuID", item[key]);
									if (key === "usuGrupoID")
										localStorage.setItem("usuGrupoID", item[key]);
									if (key === "nombres") {
										nombres = item[key];
										localStorage.setItem("nombres", item[key]);
									}
									if (key === "apellidos")
										localStorage.setItem("apellidos", item[key]);
									if (key === "foto")
										localStorage.setItem("foto", item[key]);
								});
							});
						}
					}
					if (tipo === "1")
						window.location.href = "/ui/index.html";
					else {
						showToast("Error de Sesion", nombres, "error");
						localStorage.setItem("nombres", "");
						localStorage.setItem("apellidos", "");
						localStorage.setItem("usuGrupoID", "");
						localStorage.setItem("foto", "");
						localStorage.setItem("user", "");
						localStorage.setItem("pass", "");
						localStorage.setItem("usuID", "");
						document.getElementById("txtPass").value = "";
					}

				}
			} catch (ex) {
				alert("Ups! surgio un problema al Loguerse: " + ex);
			}

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus);
		}
	});
}
function check() {
	var ck = document.getElementById("checkbox11111").checked;
	if (ck) {
		localStorage.setItem("user", document.getElementById("txtUsuario").value);
		localStorage.setItem("pass", document.getElementById("txtPass").value);
	} else {
		localStorage.setItem("user", "");
		localStorage.setItem("pass", "");
	}
}
function getData(type) {
	var user = localStorage.getItem("user");
	if (user !== "" && user !== null) {
		var pass = localStorage.getItem("pass");
		if (type) {
			document.getElementById("txtUsuario").value = user;
			document.getElementById("txtPass").value = pass;
			document.getElementById("txtPass").focus();
			document.getElementById("checkbox11111").checked = true;
		}

		login(user, pass, 'W');
	}
	if (!type)
		location.href = '/Login.aspx';
	else {
		document.getElementById("txtUsuario").value = "";
		document.getElementById("txtPass").value = "";
	}
}
function btnLogin() {
	var usu = document.getElementById("txtUsuario").value;
	var pass = document.getElementById("txtPass").value;

	if (pass === "" || pass === null || usu === "" || usu === null) {
		showToast("Faltan datos", "Debes cargar tu usuario y contraseña", "error");
	} else {
		login(usu, pass, 'W');
	}
}
