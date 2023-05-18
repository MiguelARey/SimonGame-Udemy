let buttonColors = ["red","yellow","blue","green"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

for(let i=1;i<3;i++){
        let div = $(`<div id=div-${i}></div>`);
        $("body").append(div)
}

let redBox = $(`<div id="red"></div>`);
let greenBox = $(`<div id="green"></div>`);
let yellowBox = $(`<div id="yellow"></div>`);
let blueBox = $(`<div id="blue"></div>`);



$("#div-1").append(greenBox);
$("#div-1").append(redBox);
$("#div-2").append(yellowBox);
$("#div-2").append(blueBox);
$("div div").attr("class","button");


$("body").prepend($("<h1></h1>"));
$("h1").text("Press a KEY to Start");
$("h1").attr("id","level-title");

$(document).keypress(function(){
    if(!started){
        $("#level-title").text(`Level${level}`);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);

    let randomNumb = Math.floor(Math.random()*4);
    let randomColor = buttonColors[randomNumb];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(name){
    let audio = new Audio(`/sounds/${name}.mp3`);
    audio.play();
}


$(".button").click(function(){
    let btnClicked = $(this).attr("id");
    userPattern.push(btnClicked);
    animation(btnClicked);
    playSound(btnClicked);
    checkAnswer(userPattern.length-1);
    // if(userPattern[0]===gamePattern[0]){
    //     $("body").css("background-color","green");
    //     setTimeout(() => {
    //         $("body").css("background-color","#2F0F5D");  
    //     }, 300);
    //     $("h1").text("Level 2");
    //     console.log(gamePattern);
    // }else{
    //     $("body").css("background-color","red");
    //     setTimeout(() => {
    //         $("body").css("background-color","#2F0F5D");  
    //     }, 300); 
    // }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userPattern[currentLevel]){
        console.log("He ffking did it")
        if(gamePattern.length === userPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("Mal, mal, muy mal!");
        playSound("Wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Press a KEY to Start");
        startOver();
    }
}

console.log(gamePattern);
console.log(userPattern);

function animation(current){
    $(`#${current}`).addClass("pressed")
    setTimeout(() => {
        $(`#${current}`).removeClass("pressed")  
    }, 150);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}








