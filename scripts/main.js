var canvas;
var canvascontext;
var ballX = 50;
var ballY = 50;
var ballXSpeed = 5;
var ballYSpeed = 5;
var fps = 30;
var paddle1Y = 250;
var paddleHeight = 100;

window.onload = function(){
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	
	var background = new Image();
	var logo = new Image();

	background.src = "images/background.jpg";
	logo.src = "images/logo.png";

	background.onload = function(){
		ctx.drawImage(background, 0, 0);
		ctx.fillStyle = "#09004c";
		ctx.fillRect(0, 0,  canvas.width, 40);
		
	}
	logo.onload = function() {
		ctx.drawImage(logo, 0, 0);
	}

	setInterval(update, 1000/fps);
	canvas.addEventListener('mousemove', function(e){
		// var mousePos = calculateMousePos(e);
		// paddle1Y = mousePos.y - paddleHeight/2;
	});

};

function update() {
	
}

function calculateMousePos(e) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = e.clientX - rect.left - root.scrollLeft;
	var mouseY = e.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	}
}


function ballReset() {
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}