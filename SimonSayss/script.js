var i = 0;
var lvl = 1;
var start = true;
var stop = true;
var pressedButton;
var colorStack = [];
var inputColors = [];
var randomNumber=Math.floor(Math.random() * 4);
const colorsArray = ["green", "red", "yellow", "blue"];

$("body").keypress(function(){

  if(start){
    nextSequence(colorsArray[randomNumber], );
    colorStack.push(colorsArray[randomNumber]);
    $("h1").text("Level " + lvl);

    start = false;
  }
  createGame();
});

$(".btn").click(function(){
  pressedButton = $(this).attr("id");
  flashBang(pressedButton);

  inputColors.push(pressedButton);
  if(inputColors[i] == colorStack[i]){
    boxSound(pressedButton);
    i++;
    if(i == colorStack.length){
      restartGame();
      createGame();
      lvl++;
      $("h1").text("Level " + lvl);
    }
  }else{
    lvl = 1;
    gameOver();
  }
});

function createGame(){
  randomNumber=Math.floor(Math.random() * 4);
  setTimeout(function(){
    nextSequence(colorsArray[randomNumber]);
  },400);
  colorStack.push(colorsArray[randomNumber]);
}

function restartGame(){
  i = 0;
  start = true;
  stop = true;
  pressedButton = null;
  inputColors = [];
  randomNumber=Math.floor(Math.random() * 4);
}
function gameOver(){
  colorStack = [];
  inputColors = [];
  start = true;

  var audio = new Audio("sounds/wrong.mp3");
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 400);
  audio.play();

}

function boxSound(boxColor){
  var audio = new Audio("sounds/" + boxColor +".mp3");
  audio.play();
}

function nextSequence(colorsArray){
  setTimeout(function(){
    $("#" + colorsArray).fadeOut(100);
    $("#" + colorsArray).fadeIn(100);
    boxSound(colorsArray);
  }, 400);
}

function flashBang(culoarea){
  $("." + culoarea).addClass("pressed");

  setTimeout(function(){
    $("." + culoarea).removeClass("pressed");
  }, 200);
}
