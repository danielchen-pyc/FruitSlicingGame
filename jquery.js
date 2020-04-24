var playing = false;
var score;
var trialsLeft;
var fruits = ['apple.png', 'banana.png', 'pineapple.png', 'watermelon.png',
              'tomato.png', 'berry.png', 'grape.png', 'orange.png']
var randomStep;
var action;

$(function(){
  $("#startReset").click(function(){
    if (playing){
      location.reload();
    } else {
      playing = true;
      $("#counter").show();
      score = 0;
      $("#scoreVal").html(score);
      $("#startReset").html("Reset")
      trialsLeft = 3;
      addHeart();
      startAction();
    }
  });

  $("#fruit1").mouseover(function() {
    score++;
    $("#scoreVal").html(score);
    var random = Math.round(Math.random() * 3) + 1;
    document.getElementById("sliceSound" + random).play();
    clearInterval(action);
    $("#fruit1").hide("explode");
    setTimeout(startAction, 500);
  });


  function startAction() {
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({'left': Math.random() * 540, 'top': -65});
    randomStep = Math.round(Math.random() * 5) + 1;
    action = setInterval(function(){
      $("#fruit1").css({'top': $("#fruit1").position().top + randomStep});
      if ($("#fruit1").position().top > $("#window").height() + 20) {
        trialsLeft--;
        addHeart();
        if (trialsLeft > 0) {
          $("#fruit1").show();
          chooseFruit();
          $("#fruit1").css({'left': Math.random() * 540, 'top': -65});
          randomStep = Math.round(Math.random() * 4) + 1;
        } else {
          $("#counter").empty();
          playing = false;
          stopAction();
          window.alert("You lose! Your score is " + score);
          $("#startReset").html("Start");
          $("#counter").hide();
        }

      }
    }, 10);
  }

  function chooseFruit() {
    var randomNum = Math.floor(Math.random() * 8);
    $("#fruit1").attr("src", "images/" + fruits[randomNum]);
  }

  function addHeart() {
    $("#counter").empty();
    for (i = 0; i < trialsLeft; i++) {
      $("#counter").append("<img class='heart' src='images/heart.png'>")
    }
  }

  function stopAction() {
    $("#fruit1").hide();
    clearInterval(action);
  }

});
