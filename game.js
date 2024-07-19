var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

//Starting game
var first = false;
var level = 0;

$(document).keypress(function() {
    if(!first) {
        $("#level-title").text("level " + level);
        nextSequence();
        first = true;
    }
});

$(".btn").on("click", function() {
    //get element by id using jquery
    var userChosenColour = $(this).attr("id");
    //push into array
    userClickedPattern.push(userChosenColour);
    //Check if color has been pushed
    animatePress(userChosenColour);
    playSound(userChosenColour);

    //Check if the order of colour is correct
    checkAnswer(userClickedPattern.length-1);//index start from 0, not 1
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    // Animation
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {
    var add = "sounds/" + name + ".mp3";
    var audio = new Audio(add);
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
        //....and whatever else you need to do
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success!");
        //Check if the new color of new round is okay(the final color is correct)
        //Call setTime out to use nextSequence() in 1 sec later
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }else {
        console.log("Wrong!");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    first = false;
}
