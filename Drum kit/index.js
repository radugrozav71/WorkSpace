

var numberOfDrums = document.querySelectorAll(".drum").length;

for(var i = 0; i <= numberOfDrums; i++){
  document.querySelectorAll(".drum")[i].addEventListener("keydown", function(event){
      makeSound();
      buttonAnimation(event.key);
      console.log(event.key);
  });
}

function makeSound(){
  switch(event.keyCode){
    case 87:

    var audio = new Audio("sounds/tom-1.mp3");
    audio.play();
    break;

    case 65:

    var audio = new Audio("sounds/tom-2.mp3");
    audio.play();
    break;

    case 83:

    var audio = new Audio("sounds/tom-3.mp3");
    audio.play();
    break;

    case 68:

    var audio = new Audio("sounds/tom-4.mp3");
    audio.play();
    break;

    case 74:

    var audio = new Audio("sounds/snare.mp3");
    audio.play();
    break;

    case 75:

    var audio = new Audio("sounds/crash.mp3");
    audio.play();
    break;

    case 76:
    var audio = new Audio("sounds/kick-bass.mp3");
    audio.play();
    break;
  }
}

function buttonAnimation(currentKey){

  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function(){
    activeButton.classList.remove("pressed");
  }, 100);
}
