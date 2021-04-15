const canvas = document.getElementById('my-canvas');
const pen = canvas.getContext('2d');

pen.fillStyle = 'yellow';
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
        this.cells.shift();
        let nextX = headX+1;
        let nextY = headY;
        this.cells.push({
            x: nextX,
            y:nextY
        })
    }
}

function init(){
    Snake.createSnake();
}

function draw(){
    pen.clearRect(0, 0, W, H);
    Snake.drawSnake();
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