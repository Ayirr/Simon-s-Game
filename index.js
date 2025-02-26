var buttonColors = ["red","yellow","blue","green"];
var gamePattern=[];
var userClickedPattern = [];
var started = false;
var level = 0;


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("."+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    console.log(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}

$("body").keypress(function(){
    if(level===0){
        nextSequence();
        $("h1").text("Level "+level);
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("*").addClass("wrong");
        setTimeout(function(){
            $("*").removeClass("wrong");
        },200);
        $("h1").text("Game Over, press any key to restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
}
