

var canvas;
var ctx;
var idFrame;
var start = false;
var pBullets = [];
var enemies = [];
var astroids = [];
var fuels = [];
var totalEnemy = 0;
var totalAstroid = 0;
var totalFuel = 0;
var counterSecond = 0;
var second = 0;
var minute = 0;
var hour = 0;
var background = new Image();
var background2 = new Image();
var logo = new Image();
var plus = new Image();
var minus = new Image();
var sound = new Image();
var sound_down = new Image();
var play = new Image();
var pause = new Image();
var fuel = new Image();
var controller = new Image();
var fuelPoint = 20;
var time = "00:00:00";
var bspeed = 0;
var player;
var planet;
var score = 0;
var bgSound;
var shootSound;
var destroySound;

	


window.onload = function(){
	
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	player = new Player();
	planet = new Planet()
	bgSound = new Audio("sounds/background.mp3");
	bgSound.play();
	shootSound = new Audio("sounds/shoot.mp3");
	destroySound = new Audio("sounds/destroyed.mp3");



	background.src = "images/background.jpg";
	background2.src = "images/background.jpg";
	logo.src = "images/logo.png";
	plus.src = "images/plus.png";
	minus.src = "images/minus.png";
	sound.src = "images/sound.png",
	sound_down.src = "images/sound-down.png";
	play.src = "images/play.png";
	pause.src = "images/pause.png";
	//timer.src = "images/timer.png";
	fuel.src = "images/fuel.png";
	controller.src = "images/controller.png";
	
	background.onload = function(){
		ctx.drawImage(background, 0, 0);
		ctx.drawImage(background2, 0 - canvas.width, 0);
		ctx.fillStyle = "#096643"; //#090043
		ctx.fillRect(0, 0,  canvas.width, 40);
		ctx.fillStyle = "white"; 
		ctx.font = "25px Arial";
		ctx.fillText("Font",140,28);
		ctx.fillText(time, 460, 28);
		ctx.fillText(fuelPoint, 600, 28);
		ctx.fillText("Score:", 650, 28);
		ctx.fillText(score, 725, 28);
		ctx.drawImage(controller, 1090, 500, 100, 100);
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
	// timer.onload = function() {
	// 	ctx.drawImage(timer, 470, 5, 30, 30);
	// }
	fuel.onload = function() {
		ctx.drawImage(fuel, 570, 5, 30, 30);	
	}

	

	document.addEventListener('keydown', keyPressed);
	// document.addEventListener('keyup', keyUp);
	

	

	//draw();

	//setInterval(update, 1000/fps);
	//canvas.addEventListener('mousemove', function(e){
		// var mousePos = calculateMousePos(e);
		// paddle1Y = mousePos.y - paddleHeight/2;
	//});
	canvas.addEventListener('mousedown', clicked, false);
	canvas.addEventListener('mousemove', pad, true);
	canvas.addEventListener('mouseover', pad, true);
	//$("#game").mouseover(pad);
	//$("#game").hover(function(e){pad(e);});

//};


// function update() {
	
}
// $("#game").mouseover(function(e){
// 	pad(e);
// });

function draw() {
	//console.log(start);
	if(!start) return;
	counterSecond++;
	if(counterSecond == 60) {
		second++;
		counterSecond = 0;
		fuelPoint -= 1;
	}
	if(second === 60) {
		minute++;
		second = 0;
	}
	if(minute === 60) {
		hour++
		minute = 0;
	}
	time = hour + ":" + minute + ":" + second;
	if(fuelPoint > 40)
			fuelPoint = 40;

	if ($('#game:hover').length != 0) {
    	// $("#game").trigger("hover");
    	// $("#game").trigger("mouseover");
    	// $("#game").trigger("mousemove");
    	//$("#game").trigger("click");
    	//event = $.Event("mouseover");
    	//x = canvas.dispatchEvent(new Event('mouseover'));
    	//console.log("e:"+x);
    	//pad($(this).event);
    	 var e = jQuery.Event( "hover" );
    	 pad(e);
	}
	if($("#right:hover").length != 0) {
		//console.log("right");
		player.x += (player.speed/2); 
	}
	if($("#left:hover").length != 0) {
		//console.log("right");
		player.x -= player.speed/2; 
	}
	if($("#up:hover").length != 0) {
		//console.log("right");
		player.y -= player.speed/2; 
	}
	if($("#down:hover").length != 0) {
		//console.log("right");
		player.y += player.speed/2; 
	}
	

	ctx.fillStyle = "#096643";
	ctx.clearRect(460, 0, 400, 40);
	ctx.fillRect(460, 0, 400, 40);
	ctx.fillStyle = "white";
	ctx.fillText(time, 460, 28);
	ctx.fillText(fuelPoint, 600, 28);
	ctx.drawImage(fuel, 570, 5, 30, 30);
	ctx.fillText("Score:", 650, 28);
	ctx.fillText(score, 725, 28);
	
	//clearing the canvas
	ctx.clearRect(0, 40, canvas.width, canvas.height);

	ctx.drawImage(background, bspeed, 40);
	ctx.drawImage(background2, bspeed + canvas.width, 40);
	ctx.drawImage(logo, 0, 0, 120, 80);
	ctx.drawImage(controller, 1090, 500, 100, 100);
	
	bspeed -= 0.5;
	planet.update();

	// if x coordinate exceeds the width, reset it to 0.
	if(bspeed < -canvas.width) bspeed = 0;
	//if(saturnSpeed < -150) saturnSpeed = canvas.width;

	// // call draw() again when a new frame needs to be drawn
	player.draw();
	// //console.log('ib:'+player.inBounds());
	pBullets.forEach(function(bullet) {
		bullet.update();
		bullet.draw();
	});

	pBullets = pBullets.filter(function(bullet) {
		return bullet.active;
	});

	if(Math.random() < 0.14 && totalEnemy <= 7) {
		enemies.push(new Enemy());
		totalEnemy++;
	}
	  
	enemies.forEach(function(enemy) {
		enemy.update();
		enemy.draw();
	});

	enemies = enemies.filter(function(enemy) {
		//console.log(enemy.active);
		return enemy.active;
	});

	if(Math.random() < 0.1 && totalAstroid <= 3) {
		astroids.push(new Astroid());
		totalAstroid++;
	}

	astroids.forEach(function(astroid) {
		astroid.update();
		astroid.draw();
	});

	astroids = astroids.filter(function(enemy) {
		//console.log(enemy.active);
		return enemy.active;
	});

	if(Math.random() < 0.1 && totalFuel <= 1) {
		fuels.push(new Fuel());
		totalFuel++;
	}

	fuels.forEach(function(fuel) {
		fuel.update();
		fuel.draw();
	});

	fuels = fuels.filter(function(fuel) {
		//console.log(enemy.active);
		return fuel.active;
	});

	//console.log(totalFuel);
	collisionOccurs();
	requestAnimationFrame(draw);
}


/// PLANETS ///

function Planet() {
	//planet = ['Mars' => [], 'Jupiter' => [], 'saturn' => []];
	this.mars = {x: 850, y: 50, width: 150, height: 150, speed: -2, deg: 1, rot: 0.2, img: new Image()};
	this.mars.img.src = "images/mars.png";
	this.jupiter = {x: 500, y: 250, width: 100, height: 100, speed: -1, deg: 1, rot: 0.5, img: new Image()};
	this.jupiter.img.src = "images/jupiter.png";
	this.saturn = {x: 900, y: 500, width: 70, height: 40, speed: -0.25, deg: 1, rot: 1, img: new Image()};
	this.saturn.img.src = "images/saturn.png";
}
Planet.prototype.update = function() {
	this.mars.x += this.mars.speed;
	this.mars.deg += this.mars.rot;
	this.jupiter.x += this.jupiter.speed;
	this.jupiter.deg += this.jupiter.rot;
	this.saturn.x += this.saturn.speed;
	this.saturn.deg += this.saturn.rot;

	if(this.mars.x < -this.mars.width)
		this.mars.x = canvas.width + this.mars.width;
	if(this.jupiter.x < -this.jupiter.width)
		this.jupiter.x = canvas.width + this.jupiter.width;
	if(this.saturn.x < -this.saturn.width)
		this.saturn.x = canvas.width + this.saturn.width;

	//ctx.drawImage(this.mars.img, this.mars.x, this.mars.y, this.mars.width, this.mars.height);
	//ctx.drawImage(this.jupiter.img, this.jupiter.x, this.jupiter.y, this.jupiter.width, this.jupiter.height);
	//ctx.drawImage(this.saturn.img, this.saturn.x, this.saturn.y, this.saturn.width, this.saturn.height);
	ctx.save();
	ctx.translate(this.mars.x + this.mars.width / 2, this.mars.y + this.mars.height / 2);
	ctx.rotate(this.mars.deg * Math.PI / 180);
	ctx.drawImage(this.mars.img, -this.mars.width / 2, -this.mars.height / 2, this.mars.width, this.mars.height);	
	ctx.restore();
	ctx.save();
	ctx.translate(this.jupiter.x + this.jupiter.width / 2, this.jupiter.y + this.jupiter.height / 2);
	ctx.rotate(this.jupiter.deg * Math.PI / 180);
	ctx.drawImage(this.jupiter.img, -this.jupiter.width / 2, -this.jupiter.height / 2, this.jupiter.width, this.jupiter.height);
	ctx.restore();
	ctx.save();
	ctx.translate(this.saturn.x + this.saturn.width / 2, this.saturn.y + this.saturn.height / 2);
	ctx.rotate(this.saturn.deg * Math.PI / 180);
	ctx.drawImage(this.saturn.img, -this.saturn.width / 2, -this.saturn.height / 2, this.saturn.width, this.saturn.height);
	ctx.restore();
}
/// END PLANETS

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
	this.speed = 4;
	temp = 1200 + Math.floor(300 * Math.random());
	temp = temp - (temp % this.speed);
	this.x = temp;
	this.y = 40 + Math.floor((canvas.height - 70) * Math.random()) ;
	this.width = 60;
	this.height = 40;
	this.img = new Image();
	this.img.src = "images/enemy.png";
	if(this.y > 600) console.log("XXX:"+yTemp);
}

Enemy.prototype.inBounds = function() {
  return this.x >= 0 && this.x <= canvas.width + 300 &&
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
  this.img.src = "images/enemy-hit.png";
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  this.active = false;
  //score += 10;
  totalEnemy--;
  destroySound.play();
  console.log("die");
  destroySound.play();
};

// END OF ENEMIES //

// AESTROID //

function Astroid() {
	this.active = true;
	this.speed = 3;
	temp = 1200 + Math.floor(200 * Math.random());
	temp = temp - (temp % this.speed);
	this.x = temp;
	this.y = 40 + Math.floor((canvas.height - 70) * Math.random()) ;
	this.width = 70;
	this.height = 70;
	this.img = new Image();
	this.img.src = Math.round(Math.random()) ? "images/aestroid_brown.png" : "images/aestroid_grey.png";
	this.hit = 0;
	
}

Astroid.prototype.inBounds = function() {
  return this.x >= 0 && this.x <= canvas.width + 200 &&
         this.y >= 0 && this.y <= canvas.height;  
};

Astroid.prototype.draw = function() {
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  //ctx.drawImage(this.img[1], this.x, this.y, this.width, this.height);
};

Astroid.prototype.update = function() {
	this.x -= this.speed;
	this.active = this.active && this.inBounds();
	if(this.x == -this.speed)
		totalAstroid--;
};

Astroid.prototype.die = function() {
	this.hit++;
	if(this.hit == 2) {
		this.img.src = "images/aestroid_grey-hit.png";
  		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		this.active = false;
		//score += 10;
		totalAstroid--;
		this.hit = 0;
		destroySound.play();
		console.log("astroid destroyed!");
	}
	
};

// END OF AESTROID

// FUEL

function Fuel() {
	this.active = true;
	this.speed = 2;
	temp = 30 + Math.floor(30 * Math.random());
	temp = temp + (temp % this.speed);
	this.x = 40 + Math.floor((canvas.width - 70) * Math.random());
	this.y = temp;
	this.width = 50;
	this.height = 50;
	this.img = new Image();
	this.img.src = "images/fuel-icon.png";
	this.hit = 0;	
}

Fuel.prototype.inBounds = function() {
  return this.x >= 0 && this.x <= canvas.width &&
         this.y >= -100 && this.y <= canvas.height;  
};

Fuel.prototype.draw = function() {
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Fuel.prototype.update = function() {
	this.y += this.speed;
	this.active = this.active && this.inBounds();
	if(this.y == canvas.height + this.speed)
		totalFuel--;
};

Fuel.prototype.die = function() {
		this.active = false;
		totalFuel--;
};


/// END OF FUEL

//// COLLISION

function collisionCheck(a, b) {
	return a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y;
}

function collisionOccurs() {
	pBullets.forEach(function(bullet) {
		enemies.forEach(function(enemy) {
			if (collisionCheck(bullet, enemy)) {
				bullet.die();
				enemy.die();
			}
		});
	});

	pBullets.forEach(function(bullet) {
		astroids.forEach(function(astroid){
			if(collisionCheck(bullet, astroid)) {
				bullet.die();
				astroid.die();
			}
		});
	});

	enemies.forEach(function(enemy) {
		if(collisionCheck(enemy, player)) {
			// if(hit_delay === 0) {
			// 	enemy.die();
				//player.getHit();
			//}
		}
	});

	fuels.forEach(function(fuel){
		if(collisionCheck(fuel, player)) {
			fuel.die();
			fuelPoint += 20;
		}
	});
}

//// END OF COLLISION

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
            //console.log('Left:'+player.x);
            break;
        case 39:
            // Right Arrow key
            if(player.x < canvas.width - player.width)
            	player.x += player.speed;
            //console.log('Right:'+player.x);
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
        	shootSound.play();
        	//console.log('Shoot');
        	break;

    }
}

function pad(e) {
	console.log(e.clientX);
	var rect = canvas.getBoundingClientRect();
	x = e.clientX - rect.left;
	y = e.clientY - rect.top;
	if(x > 1151 && x < 1182 && y > 528 && y < 566)
		//console.log("right");
		player.x += player.speed;
	if(x > 1090 && x < 1121 && y > 528 && y < 566)
		//console.log("left");
		player.x -= player.speed;
	if(x > 1121 && x < 1152 && y > 500 && y < 536)
	 	//console.log("up");
	 	player.y -= player.speed;
	if(x > 1121 && x < 1152 && y > 570 && y < 595)
	 	//console.log("down");
	 	player.y += player.speed;
}

function keyUp(e) {

}

$("#start").click(function(){
	start = true;
	draw();
	$(this).blur();
	$("#instruction").hide(500);
});
draw();

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

