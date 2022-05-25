const game_board = document.querySelector("#game_board");
const context = game_board.getContext("2d");
const score_text = document.querySelector("#score_text");
const reset_btn = document.querySelector("#reset_btn");
const game_width = game_board.width;
const game_height = game_board.height;
const board_background = "white";
const snake_color = "lightgreen";
const snake_border = "black";
const food_color = "red";
const unit_size = 25;
let running = false;
let xVelocity = unit_size;
let yVelocity = 0;
let food_x;
let food_y;
let score = 0;
let snake = [
    {x:unit_size * 4, y:0},
    {x:unit_size * 3, y:0},
    {x:unit_size * 2, y:0},
    {x:unit_size, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
reset_btn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    score_text.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

function nextTick(){
    if(running){
        setTimeout(() =>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
};

function clearBoard(){
    context.fillStyle = board_background;
    context.fillRect(0, 0, game_width, game_height);
};

function createFood(){
    function randomFood(min, max){
        const random_number = Math.round((Math.random() * (max - min) + min) / unit_size) * unit_size;
        return random_number;
    }

    food_x = randomFood(0, game_width - unit_size);
    // console.log(food_x);
    food_y = randomFood(0, game_width - unit_size);
};

function drawFood(){
    context.fillStyle = food_color;
    context.fillRect(food_x, food_y, unit_size, unit_size);
};

function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};

    snake.unshift(head);
    // if food is eaten
    if(snake[0].x == food_x && snake[0].y == food_y){
        score += 1;
        score_text.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }

};

function drawSnake(){
    context.fillStyle = snake_color;
    context.strokeStyle = snake_border;
    
    snake.forEach(snakePart =>{
        context.fillRect(snakePart.x, snakePart.y, unit_size, unit_size);
        context.strokeRect(snakePart.x, snakePart.y, unit_size, unit_size);
    })
};

function changeDirection(event){
    const keyPressed = event.keyCode;
    // console.log(keyPressed);
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const going_up = (yVelocity == -unit_size);
    const going_down = (yVelocity == unit_size);
    const going_right = (xVelocity == unit_size);
    const going_left = (xVelocity == -unit_size);

    switch(true){

        case(keyPressed == LEFT && !going_right):
            xVelocity = -unit_size;
            yVelocity = 0;
            break;

        case(keyPressed == UP && !going_down):
            xVelocity = 0;
            yVelocity = -unit_size;
            break;

        case(keyPressed == RIGHT && !going_left):
            xVelocity = unit_size;
            yVelocity = 0;
            break;

        case(keyPressed == DOWN && !going_up):
            xVelocity = 0;
            yVelocity = unit_size;
            break;
    }
};

function checkGameOver(){
    switch(true){

        case(snake[0].x < 0):
            running = false;
            break;

        case(snake[0].x >= game_width):
            running = false;
            break;

        case(snake[0].y < 0):
            running = false;
            break;

        case(snake[0].y >= game_height):
            running = false;
            break;
    }

    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};

function displayGameOver(){
    context.font = "50px MV Boli";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("GAME OVER!",game_width / 2, game_height / 2);
    running = false;
};

function resetGame(){
    score = 0;
    xVelocity = unit_size;
    yVelocity = 0;
    snake = [
        {x:unit_size * 4, y:0},
        {x:unit_size * 3, y:0},
        {x:unit_size * 2, y:0},
        {x:unit_size, y:0},
        {x:0, y:0}
    ];
    gameStart();
};
