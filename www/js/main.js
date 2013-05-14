//All you js code goe here!


//ejs up script
$(document).ready(function() {
	if($(".ejsCheck").html() !== "") {
		$(".ejsStatus").css("color", "green");
		$(".ejsStatus").html("ejs is up");
	}

	$(".server-controlls").on("hover", function(e) {
	  if(e.type == "mouseenter") {
	    $(this).addClass("icon-white");
	  }
	  else if (e.type == "mouseleave") {
	    $(this).removeClass("icon-white");
	  }
	});


});

//socket.io code
var socket = io.connect('localhost');//connect to our server


socket.on('connectionMsg', function(data) {
	$(".socketConnectionStatus").css("color", "green");
	$(".socketConnectionMessage").html(data);
	$(".socketConnectionStatus").html("connected");
});

socket.on('disconnect', function () {//updates connection status
		$(".socketConnectionStatus").css("color", "red");
		$(".socketConnectionMessage").html("There is no connection to the server :(");
		$(".socketConnectionStatus").html("disconnected");
});

socket.on('modules', function(data) {
	$(".moduleList").html("");

	$(data).each(function() {
		var filename = this.substring(this.lastIndexOf("\\")+1);
		if(filename[0] !== ".") {
			$(".moduleList").append("<li><i class='icon-folder-open'></i> "+filename+"</li>");
			$(".serversTable").append("<tr><td><i class='icon-folder-open'></i> "+filename+"</td><td>A description</td><td>stopped</td><td><i class='icon-play server-controlls'></i> <i class='icon-stop server-controlls'></i> <i class='icon-refresh server-controlls'></i></td></tr>");
		}
	});

});