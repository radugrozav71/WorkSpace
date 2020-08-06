function winner(result, luckyOne){
  if(luckyOne == 1){
    document.querySelector(".winner").innerHTML = "🎈 " + result;
  }
  else if(luckyOne == 2){
    document.querySelector(".winner").innerHTML = result + "🎈";
  } else if (luckyOne == 3){
    document.querySelector(".winner").innerHTML = result;
  }
}

function myRandomDice1(diceNumber){
  if(diceNumber == 1){
    document.querySelector(".dice .img1").setAttribute("src", "images/dice1.png");
  }
  if(diceNumber == 2){
    document.querySelector(".dice .img1").setAttribute("src", "images/dice2.png");
  }
  if(diceNumber == 3){
    document.querySelector(".dice .img1").setAttribute("src", "images/dice3.png");
  }
  if(diceNumber == 4){
    document.querySelector(".dice .img1").setAttribute("src", "images/dice4.png");
  }
  if(diceNumber == 5){
    document.querySelector(".dice .img1").setAttribute("src", "images/dice5.png");
  }
  if(diceNumber == 6){
    document.querySelector(".dice .img1").setAttribute("src", "images/dice6.png");
  }
}
function myRandomDice2(diceNumber){
  if(diceNumber == 1){
    document.querySelector(".dice .img2").setAttribute("src", "images/dice1.png");
  }
  if(diceNumber == 2){
    document.querySelector(".dice .img2").setAttribute("src", "images/dice2.png");
  }
  if(diceNumber == 3){
    document.querySelector(".dice .img2").setAttribute("src", "images/dice3.png");
  }
  if(diceNumber == 4){
    document.querySelector(".dice .img2").setAttribute("src", "images/dice4.png");
  }
  if(diceNumber == 5){
    document.querySelector(".dice .img2").setAttribute("src", "images/dice5.png");
  }
  if(diceNumber == 6){
    document.querySelector(".dice .img2").setAttribute("src", "images/dice6.png");
  }
}
function myRandom(){
  var rnd = Math.floor(Math.random() * 7);
  if(rnd == 0){
    rnd += 1;
  }
  return rnd;
}

  var rnd1 = myRandom();
  myRandomDice1(rnd1);
  var rnd2 = myRandom();
  myRandomDice2(rnd2);
  if(rnd1 > rnd2){
    winner("Player 1 Wins!", 1);
  } else if (rnd1 < rnd2){
    winner("Player 2 Wins!", 2);
  } else {
    winner("Draw", 3);
  }
