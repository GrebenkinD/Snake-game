const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const gameBackground = new Image();
gameBackground.src = "img/background.png";
const gameFood = new Image();
gameFood.src = "img/food.png";

let box = 26;

let score = 0;

let food = {
	x: Math.floor((Math.random()*16 + 2)) * box,
	y: Math.floor((Math.random()*16 + 2)) * box
}

let snake = [];
snake[0] = {
	x: box * 10,
	y: box * 9
}

document.addEventListener("keydown", direction);

let dir;
function direction(event){
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail(head, arr){
	for(let i=0; i<arr.length; i++){
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

function drawScreen(){
	ctx.drawImage(gameBackground, 0, 0);

	ctx.drawImage(gameFood, food.x, food.y);

	for(let i=0; i<snake.length; i++){
		ctx.fillStyle = i == 0? "#7A71E2" : "rgb(202, 180, 233)";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "#7A71E2";
	ctx.font = "44px Ranchers";
	ctx.fillText(score, box * 2.5, box * 1.6);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y){
		score++;
		food = {
			x: Math.floor((Math.random()*16 + 2)) * box,
			y: Math.floor((Math.random()*16 + 2)) * box
		}
	} else{
		snake.pop();
	}

	if(snakeX < box*2 || snakeX > box*18 || snakeY < box*2 || snakeY > box*17){
		clearInterval(game);
	}

	if(dir == "left") snakeX -=box;
	if(dir == "right") snakeX +=box;
	if(dir == "up") snakeY -=box;
	if(dir == "down") snakeY +=box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}
 let game = setInterval(drawScreen, 100);