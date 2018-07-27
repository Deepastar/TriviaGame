var totalTime = 120; // The timer value
var intervalId; // Holds the interval object.

// Array containing all the Choices for each question.
var optionArray = [
    ["Polo", "Shooting", "Horse racing", "Snooker"],
    ["1968", "1967", "1958", "1922"],
    ["All of the below", "developed the telescope", "discovered four satellites of Jupiter", "discovered that the movement of pendulum produces a regular time measurement"],
    ["Canada", "West Africa", "Australia", "North America"],
    ["Silicon", "Graphite", "Charcoal", "Phosphorous"],
    ["1850s", "1930s", "1950s", "1880s"],
    ["Animation/movie file", "Image file", "Audio file", "MS Office document"],
    ["Stockholm", "Oslo", "Brussels", "Geneva"],
    ["New York", "Madrid", "Geneva", "Paris"],
    ["Moscow", "San Francisco", "London", "Paris"]
];

// Array containing the list of correct answer for each question.
var correctAnswer = [
    "Horse racing",
    "1967",
    "All of the below",
    "Australia",
    "Graphite",
    "1880s",
    "Animation/movie file",
    "Oslo",
    "Geneva",
    "San Francisco"
];

// Empty array to hold the answers selected by the user.
var userPick = [];

var correctAnswerCount = 0;
var inCorrectAnswerCount = 0;
var unAnsweredCount = 0;


$(document).ready(function () {
    //EventListener for when the user clicks the start button then load the question container and start the timer.
    $("#startbtn").click(function(){
        $("#startContainer").hide();
        $("#questionContainer").show();
        startTimer();
    })

    //On loading hide the questions container.
    $("#questionContainer").hide();
    //On Page loading hide the results container.
    $("#resultContainer").hide();
    //Get the remaining time in the format mm:ss
    var startTime = timeconverter(totalTime);
    //Display the time
    $("#display").text(startTime);
    
    //Initialize the option values in the questions.
    initializeform();

    //Event listener for when the DONE button is clicked.
    $("#doneBtn").click(function () {
        displayResult();
    });
});


/**
 * This function populates the values from the optionArray into
 * each form input's values as answer choices.
 */
function initializeform() {
    //Loop through each form from the html
    for (var i = 0; i < 10; i++) {
        var formNum = i + 1;
        var formId = "#form" + formNum;
        //Loop through each option in the array
        for (var j = 0; j < 4; j++) {
            var optionVal = optionArray[i][j];
            var opt = $(formId).children()[j];
            //The optionval as the value attribute of each input element.
            $(opt).attr("value", optionVal);
            console.log("opt: " + opt);
        }
    }

    //Loop through each form and create an eventlistener when an option is selected.
    for (var i = 0; i < 10; i++) {
        var formNumber = i + 1;
        var formId = "#form" + formNumber;
        onClickForm(formId, i);
        userPick[i] = undefined;
    }
}

/**
 * This functions takes number of seconds as Param 
 * and returns it in the format mm:ss
 */
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

/**
 * Starts the timer countdown.
 */
function startTimer() {
    intervalId = setInterval(decreaseTime, 1000);
}

/**
 * The count down function. This function is passed as parameter to the setInterval function.
 */
function decreaseTime() {
    totalTime--;
    var currTime = timeconverter(totalTime);
    $("#display").text(currTime);

    //When the time left is 0 display the results.
    if (totalTime == 0) {
        displayResult();
    }
}

/**
 * This function creates an eventlistener on the form
 * whose id is passed as parameter.
 */
function onClickForm(formId, formIndex) {
    $(formId).click(function () {
        //When the radio button is clicked then store the selected value in the userPick array.
        var checkedVal = $(formId).children("input[name='optradio']:checked").val();
        userPick[formIndex] = checkedVal;
        console.log("checked val: " + checkedVal);
        console.log("userPick:" + userPick);
    });
}

/**
 * This function is called at the end when the user clicks done or the timer runs out.
 * The function checks and user selected answers and the correct answers and populates the results.
 */
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

/**
 * This function displays the results in the result container.
 */
function displayResult() {
    //Clear the interval.
    clearInterval(intervalId);
    //Hide the questions container.
    $("#questionContainer").hide();
    //Verify the Answers.
    verifyAnswers();
    //display the result container.
    $("#resultContainer").show();
    $("#correctAnswer").text("Correct Answers: " + correctAnswerCount);
    $("#incorrectAnswer").text("Wrong Answers: " + inCorrectAnswerCount);
    $("#unAnswered").text("Unanswered: " + unAnsweredCount);
}