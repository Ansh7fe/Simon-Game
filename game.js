let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"]

// console.log(randomChosenColor);
let gamePattern = [];
let level = 0;
let started = false;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text('Level' + " " + level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    aniamtePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text('Level' + " " + level);
    let randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);
    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern)

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            $("h1").text("Game Over ,Press any key to restart");
        }, 200)
        // console.log("wrong");
        playSound("wrong");
        $("h1").text("Level" + " " + level);
        startOver();

    }
}



function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
function aniamtePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}






