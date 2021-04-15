const canvas = document.getElementById('my-canvas');
const pen = canvas.getContext('2d');
let food = null;

const W = 1200;
const H = 700;
const cs = 67;

const Snake = {
    length: 5,
    direction: "right",
    cells: [],
    createSnake: function(){
        for(let i=0;i<this.length;i++){
            this.cells.push({
                x:i,
                y:0
            })
        }
    },
    drawSnake: function(){
        for(let i=0;i<this.cells.length;i++){
            pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-2, cs-2);
        }
    },
    updateSnake: function(){
        let headX = this.cells[this.cells.length-1].x;
        let headY = this.cells[this.cells.length-1].y;
        let nextX = headX, nextY = headY;
        this.cells.shift();
        if(this.direction === "left"){
            nextX = headX - 1;
        }
        else if(this.direction === "up"){
            nextY = headY - 1;
        }
        else if(Snake.direction === "down"){
            nextY = headY + 1;
        }
        else{
            nextX = headX + 1;
        }
        this.cells.push({
            x:nextX,
            y:nextY
        })
    }
}

function getRandomFood(){
    let foodX = Math.floor(Math.random()*(W-cs)/cs);
    let foodY = Math.floor(Math.random()*(H-cs)/cs);
    return{
        x:foodX,
        y:foodY
    }
}

function init(){
    Snake.createSnake();
    food = getRandomFood();
    document.addEventListener('keydown', (e)=>{
        if(e.key === "ArrowLeft"){
            Snake.direction = "left";
        }
        else if(e.key === "ArrowUp"){
            Snake.direction = "up";
        }   
        else if(e.key === "ArrowDown"){
            Snake.direction = "down";
        }
        else{
            Snake.direction = "right";
        }
    })
}

function draw(){
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = 'yellow';
    Snake.drawSnake();
    pen.fillStyle = 'navy';
    pen.fillRect(food.x*cs, food.y*cs, cs, cs);
}

function update(){
    Snake.updateSnake();
}

function gameLoop(){
    draw();
    update();
}

init();
var id = setInterval(gameLoop, 150);