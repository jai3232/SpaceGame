
$(document).ready(function(){
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
		var background2 = new Image();
		var logo = new Image();
		var plus = new Image();
		var minus = new Image();
		var sound = new Image();
		var sound_down = new Image();
		var play = new Image();
		var pause = new Image();
		var timer = new Image();
		var fuel = new Image();
		var fuel_icon = new Image();
		var mars = new Image();
		var jupiter = new Image();
		var saturn = new Image();

		background.src = "images/background.jpg";
		background2.src = "images/background.jpg";
		logo.src = "images/logo.png";
		plus.src = "images/plus.png";
		minus.src = "images/minus.png";
		sound.src = "images/sound.png",
		sound_down.src = "images/sound-down.png";
		play.src = "images/play.png";
		pause.src = "images/pause.png";
		timer.src = "images/timer.png";
		fuel.src = "images/fuel.png";
		fuel_icon.src = "images/fuel-icon.png";
		mars.src = "images/mars.png";
		jupiter.src = "images/jupiter.png";
		saturn.src = "images/saturn.png";


		background.onload = function(){
			ctx.drawImage(background, 0, 0);
			ctx.drawImage(background2, 0 - canvas.width, 0);
			ctx.fillStyle = "#096643"; //#090043
			ctx.fillRect(0, 0,  canvas.width, 40);
			ctx.fillStyle = "white"; 
			ctx.font = "25px Arial";
			ctx.fillText("Font",140,28);
			
		}
		logo.onload = function() {
			ctx.drawImage(logo, 0, 0, 120, 80);
		}
		plus.onload = function() {
			ctx.drawImage(plus, 200, 5, 30, 30);
		}
		minus.onload = function() {
			ctx.drawImage(minus, 240, 5, 30, 30);
		}
		sound.onload = function() {
			ctx.drawImage(sound, 310, 5, 25, 25);
		}
		sound_down.onload = function() {
			ctx.drawImage(sound_down, 340, 5, 28, 28);
		}
		play.onload = function() {
			ctx.drawImage(play, 390, 5, 30, 30);
		}
		pause.onload = function() {
			ctx.drawImage(pause, 420, 5, 30, 30);
		}
		timer.onload = function() {
			ctx.drawImage(timer, 470, 5, 30, 30);
		}
		fuel.onload = function() {
			ctx.drawImage(fuel, 530, 5, 30, 30);	
		}
		fuel_icon.onload = function() {
			ctx.drawImage(fuel_icon, 700, 200, 50, 50);
		}
		// mars.onload = function() {
		// 	ctx.drawImage(mars, 750, 50, 150, 150);
		// }
		// jupiter.onload = function() {
		// 	//ctx.drawImage(jupiter,530, 150, 100, 100);	
		// }

		var bspeed = 0;
		var jupiterSpeed = 500;
		var marsSpeed = 750;
		var saturnSpeed = 880;

		function draw() {

			//clearing the canvas
			ctx.clearRect(0, 40, canvas.width, canvas.height);
			ctx.drawImage(background, bspeed, 40);
			ctx.drawImage(background2, bspeed + canvas.width, 40);
			ctx.drawImage(logo, 0, 0, 120, 80);
			ctx.drawImage(jupiter, jupiterSpeed, 250, 100, 100);	
			ctx.drawImage(mars, marsSpeed, 50, 150, 150);
			ctx.drawImage(saturn, saturnSpeed, 500, 100, 60);
			//ctx.drawImage(mars, 800, 200, 50, 50);

			// drawing a black circle
			ctx.beginPath();
			ctx.arc(bspeed + canvas.width, 100, 25, 0, 2*Math.PI);
			ctx.fillStyle = "white";
			ctx.fill();

			// incrementing the x coordinate by one on each frame
			bspeed -= 0.5;
			jupiterSpeed -= 1;
			marsSpeed -= 0.25;
			saturnSpeed -= 2;

			// if x coordinate exceeds the width, reset it to 0.
			if(bspeed < -canvas.width) bspeed = 0;
			if(jupiterSpeed < -100) jupiterSpeed = canvas.width;
			if(marsSpeed < -150) marsSpeed = canvas.width;
			if(saturnSpeed < -150) saturnSpeed = canvas.width;

			// // call draw() again when a new frame needs to be drawn
			requestAnimationFrame(draw);
		}

		draw();

		setInterval(update, 1000/fps);
		canvas.addEventListener('mousemove', function(e){
			// var mousePos = calculateMousePos(e);
			// paddle1Y = mousePos.y - paddleHeight/2;
		});
		canvas.addEventListener('mousedown', clicked, false);

	};
});

function update() {
	
}


function clicked(e) {
	var canvas = document.getElementById("game");
	var rect = canvas.getBoundingClientRect();
	x = e.clientX - rect.left;
	y = e.clientY - rect.top;
	if(x >= 200 && x <=230 && y >= 5 && y <= 30)
		alert("+");
	//console.log("X:"+x+" y:"+y);
}

function Button(canvas, image, x, y, w, h) {
	setTextColor = function(tColor) {
		this.textColor = tColor;
		this.draw();
	}

	setColor = function(color) {
		this.color = color;
		this.draw();
	}

	this.setText = function(txt) {
		this.text = txt;
		this.width = (w > 10*this.text.length)? w : 10*this.text.length;
		this.draw();
	}

	this.clear = function(){
		this.ctx.fillStyle = "White";
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
		this.ctx.fillStyle = this.color;

	};

	this.draw = function() {
		this.clear();
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		//ctx.fillRect(x, y, this.width, this.height);
		// this.ctx.fillStyle = this.textColor;
		// this.ctx.font="14px Georgia";
		// this.ctx.fillText(this.text, this.x + this.width/2 - this.text.length*3 - 7, this.y + this.height/2 + 3);
	}

	this.canvas = canvas;
	this.image = image;
	this.ctx = this.canvas.getContext("2d");
	this.x = x;
	this.y = y;
	this.text = "click Me";
	this.width = w;//(w > 10*this.text.length)? w : 10*this.text.length;
	this.height = h;//(this.height > 40)? this.height : 40;
	this.textColor = "Black";
	this.color = "Black";
	this.draw();
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