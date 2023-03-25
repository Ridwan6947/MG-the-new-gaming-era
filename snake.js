//This is the setting file for the game
var canvas1 = document.getElementById('canvas1');
var ctx = canvas1.getContext('2d');
var snakeSize = 10; 
var w = 350;
var h = 350;
var score = 0;
var snake;
var snakeSize = 10;
var food;
// Module Pattern
var drawModule = (function () { 

    var bodySnake = function(x, y) {
          //single square of snake
          ctx.fillStyle = 'darkgreen';
          ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
          //border color of snake
          ctx.strokeStyle = 'lightgreen';
          ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    }
  
    var cookie = function(x, y) {
          //colr of the cookie
          ctx.fillStyle = 'brown';
          ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
          //border color of the cookie
          ctx.fillStyle = 'brown';
          ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
    }
  
    var scoreText = function() {
      // Total score is the number of cookies the snake eats
      var total_score = "Score: " + score;
      ctx.fillStyle = 'blue';
      ctx.fillText(total_score, 145, h-5);
    }
    var draw_snake = function() {
        //Initial Length of snake is 8 squares
        var l = 7;
        snake = [];
        //the for loop pushes the 8 squares of the snake
        for (var i = l-1; i>=0; i--) {
            snake.push({x:0, y:i});
        }  
    }
    var createFood = function() {
        // size of the cookie is 1 square and this creates food at random places every time
          food = {
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
          }
    
          for (var i=0; i>snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;
          
            if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
              food.x = Math.floor((Math.random() * 30) + 1);
              food.y = Math.floor((Math.random() * 30) + 1);
            }
          }
      }
      var checkCollision = function(x, y, array) {
        //this checks for collision of the snake with it's body and if collided , the game restarts.
          for(var i = 0; i < array.length; i++) {
            if(array[i].x === x && array[i].y === y)
             return true;
          } 
          return false;
      }
      var paint = function(){
        //space where the snake is moving
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, w, h);
  
        //border of the space
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, w, h);
  
  
        //disable the START button while playing 
        btn.setAttribute('disabled', true);
  
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;
  
        if (direction == 'right') { 
          snakeX++; }
        else if (direction == 'left') { 
          snakeX--; }
        else if (direction == 'up') { 
          snakeY--; 
        } else if(direction == 'down') { 
          snakeY++; }
  
        if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || checkCollision(snakeX, snakeY, snake)) {
            //restart game
            btn.removeAttribute('disabled', true); //START button enable again
  
  
            ctx.clearRect(0,0,w,h);  //clean up the canvas
            gameloop = clearInterval(gameloop);
            return;          
          }
          
          if(snakeX == food.x && snakeY == food.y) {
            var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
            score ++;
            
            createFood(); //Create new food
          } else {
            var tail = snake.pop(); //pops out the last cell
            tail.x = snakeX; 
            tail.y = snakeY;
          }
          //The snake can now eat the food.
          snake.unshift(tail); //puts back the tail as the first cell
  
          for(var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
          } 
          
          cookie(food.x, food.y); 
          scoreText();
    }
    var init = function(){
        direction = 'down';
        draw_snake();
        createFood();
        gameloop = setInterval(paint, 80);
    }
  
  
      return {
        init : init
      };
  
  //close your module
      
  }());
  // self invoking function
  (function (window, document, drawModule, undefined) {

var btn = document.getElementById('btn');
btn.addEventListener("click", function(){ drawModule.init();});

  document.onkeydown = function(event) {

        keyCode = window.event.keyCode; 
        keyCode = event.keyCode;

        switch(keyCode) {
        
        case 37: 
          if (direction != 'right') {
            direction = 'left';
          }
          console.log('left'); 
          break;

        case 39:
          if (direction != 'left') {
          direction = 'right';
          console.log('right');
          }
          break;

        case 38:
          if (direction != 'down') {
          direction = 'up';
          console.log('up');
          }
          break;

        case 40:
          if (direction != 'up') {
          direction = 'down';
          console.log('down');
          }
          break;
          }
      }


})(window, document, drawModule);