
var gamePattern = []

var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"]

var userClickedPattern = []

var started = false

$(document).keydown(function() {

    if (!started) {

        $("#level-title").text("Level " + level);

        nextSequence();

        started = true;

    }


})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        
        var wrong_aud = new Audio("sounds/wrong.mp3")
        wrong_aud.play()
        $("h1").text("Game Over, Press Any Key to Restart")

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)

        startOver()
    }

}

function nextSequence() {

    userClickedPattern = [];


    level++;

    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    playSound(randomChosenColour);

}

$("button").click(function() {


    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

})


function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    var colourID = $("#" + currentColour)

    colourID.addClass("pressed");

    setTimeout(function() {
        colourID.removeClass("pressed")
    }, 100)


}

function startOver(){

    level=0;

    gamePattern = [];

    started = false;
}



