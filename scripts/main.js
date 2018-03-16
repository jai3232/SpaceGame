

var canvas;
var ctx;
var ballX = 50;
var ballY = 50;
var ballXSpeed = 5;
var ballYSpeed = 5;
var fps = 30;
var pBullets = [];
var enemies = [];
var astroids = [];
var totalEnemy = 0;

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
	var enemy = new Image();

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

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyUp);
	player = new Player();

	function draw() {

		//clearing the canvas
		ctx.clearRect(0, 40, canvas.width, canvas.height);

		ctx.drawImage(background, bspeed, 40);
		ctx.drawImage(background2, bspeed + canvas.width, 40);
		ctx.drawImage(logo, 0, 0, 120, 80);
		ctx.drawImage(jupiter, jupiterSpeed, 250, 100, 100);	
		ctx.drawImage(mars, marsSpeed, 50, 150, 150);
		ctx.drawImage(saturn, saturnSpeed, 500, 70, 40);

		// incrementing the x coordinate by one on each frame
		bspeed -= 0.5;
		jupiterSpeed -= 1;
		marsSpeed -= 0.25;
		saturnSpeed -= 3;

		// if x coordinate exceeds the width, reset it to 0.
		if(bspeed < -canvas.width) bspeed = 0;
		if(jupiterSpeed < -100) jupiterSpeed = canvas.width;
		if(marsSpeed < -150) marsSpeed = canvas.width;
		if(saturnSpeed < -150) saturnSpeed = canvas.width;

		// // call draw() again when a new frame needs to be drawn
		player.draw();
		//console.log('ib:'+player.inBounds());
		pBullets.forEach(function(bullet) {
			bullet.update();
			bullet.draw();
		});

		if(Math.random() < 0.14 && totalEnemy <= 7) {
			enemies.push(new Enemy());
			totalEnemy++;
		}
		  
		enemies.forEach(function(enemy) {
			enemy.update();
			enemy.draw();
		});

		requestAnimationFrame(draw);
	}

	draw();

	//setInterval(update, 1000/fps);
	//canvas.addEventListener('mousemove', function(e){
		// var mousePos = calculateMousePos(e);
		// paddle1Y = mousePos.y - paddleHeight/2;
	//});
	canvas.addEventListener('mousedown', clicked, false);

};


// function update() {
	
// }

///////PLAYER/////////

function Player() {
	this.x = canvas.width / 100;
	this.y = canvas.height / 2;
	this.img = new Image();
	this.img.src = "images/spaceship.png";
	this.speed = 15;
	this.width = 100;
	this.height = 50;
}

Player.prototype.inBounds = function() {
	return this.x >= 0 && this.x <= (canvas.width - player.width) &&
        this.y >= 0 && this.y <= canvas.height;
}

Player.prototype.draw = function() {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}
//////END PLAYER/////

////////BULLET/////
function Bullet(bullet) {
  this.active = true;
  this.color = "yellow";
  this.xVel = -bullet.vel;
  this.width = 2;
  this.height = 4;
  this.x = bullet.x;
  this.y = bullet.y;
}

Bullet.prototype.inBounds = function() {
  return this.x >= 0 && this.x <= canvas.width &&
        this.y >= 0 && this.y <= canvas.height;
};

Bullet.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Bullet.prototype.update = function() {
  this.x -= this.xVel;
  this.active = this.inBounds() && this.active;
};

Bullet.prototype.die = function() {
  this.active = false;
};
///END OF BULLET//

//ENEMIES///

function Enemy() {
	this.active = true;
	this.color = "red";
	this.speed = 4;
	temp = 1200 + Math.floor(300 * Math.random());
	temp = temp - (temp % this.speed);
	this.x = temp;
	this.y = 40 + canvas.height * Math.random();	
	this.width = 40;
	this.height = 30;
	this.img = new Image();
	this.img.src = "images/enemy.png";
}

Enemy.prototype.inBounds = function() {
  return this.x >= 0 && this.x <= canvas.width &&
         this.y >= 0 && this.y <= canvas.height;  
};

Enemy.prototype.draw = function() {
  //ctx.fillStyle = this.color;
  //ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Enemy.prototype.update = function() {
	this.x -= this.speed;
	this.active = this.active && this.inBounds();
	if(this.x == -this.speed)
		totalEnemy--;
	//console.log(temp);
};

Enemy.prototype.die = function() {
  this.active = false;
  score += 10;
};

// END OF ENEMIES //

function clicked(e) {
	var canvas = document.getElementById("game");
	var rect = canvas.getBoundingClientRect();
	x = e.clientX - rect.left;
	y = e.clientY - rect.top;
	if(x >= 200 && x <=230 && y >= 5 && y <= 30)
		alert("+");
	//console.log("X:"+x+" y:"+y);
}

function keyPressed(e) {
    switch(e.keyCode)
    {
        case 37:
            // Left Arrow key
            if(player.x > 0)
            	player.x -= player.speed;  
            console.log('Left:'+player.x);
            break;
        case 39:
            // Right Arrow key
            if(player.x < canvas.width - player.width)
            	player.x += player.speed;
            console.log('Right:'+player.x);
            break;
        case 38:
            // Up Arrow key
            if(player.y > 40)
            	player.y -= player.speed;
            //console.log('Up:'+spaceshipY);
            break;
        case 40:
            // Down Arrow key
            if(player.y < canvas.height - player.height)
            	player.y += player.speed;
            //console.log('Down:'+spaceshipY);
            break;
        case 32:
        	//pBullets.push(new Bullet({vel: 7, x: spaceshipX + spaceship.width / 4, y: spaceshipY + spaceship.height / 4}));
        	pBullets.push(new Bullet({vel: 7, x: player.x + player.width, y: player.y + player.height /  2}));
        	//console.log('Shoot');
        	break;

    }
}

function keyUp(e) {

}

// function calculateMousePos(e) {
// 	var rect = canvas.getBoundingClientRect();
// 	var root = document.documentElement;
// 	var mouseX = e.clientX - rect.left - root.scrollLeft;
// 	var mouseY = e.clientY - rect.top - root.scrollTop;
// 	return {
// 		x:mouseX,
// 		y:mouseY
// 	}
// }
