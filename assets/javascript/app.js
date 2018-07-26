var totalTime = 10;
var intervalId;
var optionArray = [
    ["Option11", "Option12", "Option13", "Option14"],
    ["Option21", "Option22", "Option23", "Option24"],
    ["Option31", "Option32", "Option33", "Option34"],
    ["Option41", "Option42", "Option43", "Option44"],
    ["Option51", "Option52", "Option53", "Option54"],
    ["Option61", "Option62", "Option63", "Option64"],
    ["Option71", "Option72", "Option73", "Option74"],
    ["Option81", "Option82", "Option83", "Option84"],
    ["Option91", "Option92", "Option93", "Option94"],
    ["Option01", "Option02", "Option03", "Option04"]
];

var correctAnswer = [
    "Option13",
    "Option22",
    "Option31",
    "Option43",
    "Option52",
    "Option64",
    "Option71",
    "Option82",
    "Option93",
    "Option02"
];

var userPick = [];

var correctAnswerCount = 0;
var inCorrectAnswerCount = 0;
var unAnsweredCount = 0;

$(document).ready(function () {
    $("#startbtn").click(function(){
        $("#startContainer").hide();
        $("#questionContainer").show();
        startTimer();
    })
    $("#questionContainer").hide();
    $("#resultContainer").hide();
    var startTime = timeconverter(totalTime);
    $("#display").text(startTime);
    
    initializeform();

    $("#doneBtn").click(function () {
        displayResult();
    });
});

function initializeform() {
    for (var i = 0; i < 10; i++) {
        var formNum = i + 1;
        var formId = "#form" + formNum;
        for (var j = 0; j < 4; j++) {
            var optionVal = optionArray[i][j];
            var opt = $(formId).children()[j];
            $(opt).attr("value", optionVal);
            console.log("opt: " + opt);
        }
    }

    for (var i = 0; i < 10; i++) {
        var formNumber = i + 1;
        var formId = "#form" + formNumber;
        onClickForm(formId, i);
        userPick[i] = undefined;
    }
}

function timeconverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

function startTimer() {
    intervalId = setInterval(decreaseTime, 1000);
}

function decreaseTime() {
    totalTime--;
    var currTime = timeconverter(totalTime);
    $("#display").text(currTime);

    if (totalTime == 0) {
        displayResult();
    }
}

function onClickForm(formId, formIndex) {
    $(formId).click(function () {
        var checkedVal = $(formId).children("input[name='optradio']:checked").val();
        userPick[formIndex] = checkedVal;
        console.log("checked val: " + checkedVal);
        console.log("userPick:" + userPick);
    });
}

function verifyAnswers() {
    for (var i = 0; i < 10; i++) {
        if (userPick[i] == undefined) {
            unAnsweredCount++;
        } else {
            if (userPick[i] == correctAnswer[i])
                correctAnswerCount++;
            else
                inCorrectAnswerCount++;
        }
    }
}

function displayResult() {
    clearInterval(intervalId);
    $("#questionContainer").hide();
    verifyAnswers();
    $("#resultContainer").show();
    $("#correctAnswer").text("Correct Answers: " + correctAnswerCount);
    $("#incorrectAnswer").text("Wrong Answers: " + inCorrectAnswerCount);
    $("#unAnswered").text("Unanswered: " + unAnsweredCount);
}