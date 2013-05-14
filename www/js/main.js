//All you js code goe here!


//ejs up script
$(document).ready(function() {
	if($(".ejsCheck").html() !== "") {
		$(".ejsStatus").css("color", "green");
		$(".ejsStatus").html("ejs is up");
	}

	$(document).on('mouseover', '.server-controlls', function() {
    	$(this).addClass("icon-white");
	});
	$(document).on('mouseout', '.server-controlls', function() {
	    $(this).removeClass("icon-white");
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
			$(".serversTable").append("<tr><td><i class='icon-folder-open'></i> "+filename+"</td><td>A description</td><td>stopped</td><td data-server-name="+filename+"><i class='icon-play server-controlls server-start'></i> <i class='icon-stop server-controlls server-stop'></i> <i class='icon-refresh server-controlls server-refresh'></i></td></tr>");
		}
	});
});

$(document).on('click', '.server-controlls', function() {
    var thisServer = $(this).parents("td").attr("data-server-name");
    if($(this).hasClass("server-start")) {
    	socket.emit("start", thisServer);
    }
    if($(this).hasClass("server-stop")) {
    	socket.emit("stop", thisServer);
    }
    if($(this).hasClass("server-refresh")) {
    	socket.emit("refresh", thisServer);
    }
});

