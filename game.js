var coloredButtons = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).on("keydown", function() {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        newSequence();
        gameStarted = true;
    }

})

function newSequence() {
    level++;
    $("#level-title").text("Level " + level);
    
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random() * 4)
    randomChosenColor = coloredButtons[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").on("click", function() {
    var userChosenColor =  $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animateFlash(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);


})

function playSound(soundName) {
    var audio = new Audio("sounds/" + soundName + ".mp3");
    audio.play();
}

function animateFlash(flashButton) {
    $("#" + flashButton).addClass("pressed");
    setTimeout(function() {
        $("#" + flashButton).removeClass("pressed");
    }, 100);
}

function checkAnswer(checkPatterns) {
    if (userClickedPattern[checkPatterns] === gamePattern[checkPatterns]) {
        console.log("Passed");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                newSequence();
            }, 1000)
        }
    } else {
        console.log("Wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 300);
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        startOver();
    }

}

function startOver() {
    gamePattern = [];
    gameStarted = false;
    level = 0;
}

