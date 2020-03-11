var pos = 0;
var firstNum, secondNum, operationSelect, previousNum, previousOp, previousNumId;
var solutionNum1, solutionNum2, solutionNum3, solutionNum4;
var findNum;
var endBoolean = 0; //0 - Game Standby, 1 - Game Begin (No Solution), 2 - Game Begin (Done), 3 - Game Begin (Timeout)
var id;
var score = 0;
var index = 3;
var width = 100;
var solutionPosition = [];

var setupEventListeners = function() {
    document.addEventListener('dblclick', e => e.preventDefault());
    document.getElementById("clear-btn").addEventListener('click', clearAll);
    document.getElementById("submit-btn").addEventListener('click', endRound)
    document.getElementById("new-btn").addEventListener('click', newRound);
};

var setupGameElements = function() {
    endBoolean = 0;
    index = 3;
    pos = 0;

    document.addEventListener('click', ctrlSelect);

    createQuestion();

    var solutionNumbers = [solutionNum1, solutionNum2, solutionNum3, solutionNum4];
    var solutionBoxIndex = ["solution-1", "solution-2", "solution-3", "solution-4"];
    
    var i;

    for (i = 0; i < 4; i++) {
        var randomSolution = solutionNumbers[Math.floor(Math.random() * solutionNumbers.length)];
        var solutionIndex = solutionNumbers.indexOf(randomSolution);
        
        solutionNumbers.splice(solutionIndex, 1);

        var randomBox = solutionBoxIndex[Math.floor(Math.random() * solutionBoxIndex.length)];
        var boxIndex = solutionBoxIndex.indexOf(randomBox);
        
        solutionBoxIndex.splice(boxIndex, 1);

        document.getElementById(randomBox).textContent = randomSolution;

        randomBox = randomBox.replace('solution-', '');
        console.log(randomBox);

        solutionPosition[randomBox-1] = randomSolution;
        console.log(solutionPosition);
    }

    document.getElementById("target-number").textContent = findNum;

    console.log("All numbers successfully generated.");

    document.getElementById("submit-btn").textContent = "DONE";
    document.getElementById("submit-btn").style.backgroundColor = "#27ae60";
    document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #176538";
    document.getElementById("submit-btn").style.color = "#ffffff";
    document.getElementById("clear-btn").style.display = "flex";
    document.getElementById("new-btn").style.display = "none";

    startTimer();
}

var createQuestion = function() {
    findNum = Math.floor((Math.random() * 10) + 1);

    solutionNum1 = Math.floor((Math.random() * 10) + 1);
    console.log("Num1 generated.");

    solutionNum2 = Math.floor((Math.random() * 10) + 1);
    console.log("Num2 generated.");

    var firstMath = calculation(solutionNum1, solutionNum2, findNum, 0);
    
    solutionNum3 = Math.floor((Math.random() * 10) + 1);
    console.log("Num3 generated.");

    var secondMath = calculation(firstMath, solutionNum3, findNum, 0);

    solutionNum4 = Math.floor((Math.random() * 10) + 1);
    console.log("Num4 generated.");

    var lastMath = calculation(secondMath, solutionNum4, findNum, 1);

    var  numberArray = [1,2,3,4,5,6,7,8,9,10];

    while (!lastMath) {
        var numberIndex = numberArray.indexOf(solutionNum3);

        numberArray.splice(numberIndex, 1);
        
        if(numberArray.length == 0) {
            console.log("Num3 unable to satisfy equation. Rolling back to Num2.");
            var num2Array = [1,2,3,4,5,6,7,8,9,10];

            var num2Index = num2Array.indexOf(solutionNum2);

            num2Array.splice(num2Index, 1);

            solutionNum2 = num2Array[Math.floor((Math.random() * num2Array.length))];

            firstMath = calculation(solutionNum1, solutionNum2, findNum, 0);

            solutionNum3 = Math.floor((Math.random() * 10) + 1);

            secondMath = calculation(firstMath, solutionNum3, findNum, 0);
            
            solutionNum4 = Math.floor((Math.random() * 10) + 1);

            if(lastMath != findNum) {
                console.log("Reboot numberArray for Num3.");
                numberArray = [1,2,3,4,5,6,7,8,9,10];
            }

            lastMath = calculation(secondMath, solutionNum4, findNum, 1);
        }

        solutionNum3 = numberArray[Math.floor((Math.random() * numberArray.length))];

        secondMath = calculation(firstMath, solutionNum3, findNum, 0);

        solutionNum4 = Math.floor((Math.random() * 10) + 1);

        lastMath = calculation(secondMath, solutionNum4, findNum, 1);
    }
}

var startTimer = function() {
    var i = 0;

    if (i == 0) {
        i = 1;
        var elem = document.getElementById("progress-bar");
        id = setInterval(frame, 300);
        function frame() {
            if (width <= 0) {
            clearInterval(id);
            i = 0;
            endBoolean = 3;
            endRound();
            } else {
            width--;
            elem.style.width = width + "%";
            }
        }
    }
}

var endRound = function() {
    if(endBoolean == 0) {
        setupEventListeners();
        setupGameElements();
        endBoolean = 2;
    } else if(endBoolean == 2) {
        console.log("Game End - Done");
        clearInterval(id);
        // console.log("The index is: " + index);

        if(index == 0) {
            var ans1 = document.getElementById("solution-1").textContent;
            var ans2 = document.getElementById("solution-2").textContent;
            var ans3 = document.getElementById("solution-3").textContent;
            var ans4 = document.getElementById("solution-4").textContent;

            if(ans1 == findNum || ans2 == findNum || ans3 == findNum || ans4 == findNum) {
                score++;
                width += 20;
                document.getElementById("progress-bar").style.width = width + "%";
                // console.log("Score is: " + score);
                document.getElementById("score-number").textContent = "Score: " + score;
                document.getElementById("submit-btn").textContent = "CORRECT";
                document.getElementById("submit-btn").style.backgroundColor = "#27ae60";
                document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #176538";
                document.getElementById("submit-btn").style.color = "#ffffff";
                document.getElementById("new-btn").style.display = "block";
                document.getElementById("clear-btn").style.display = "none";
            } else {
                document.getElementById("score-number").textContent = "Score: " + score;
                document.getElementById("submit-btn").textContent = "WRONG";
                document.getElementById("submit-btn").style.backgroundColor = "#E63946";
                document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #9C031E";
                document.getElementById("submit-btn").style.color = "#ffffff";
                document.getElementById("new-btn").style.display = "block";
                document.getElementById("clear-btn").style.display = "none";
            }
        } else {
            document.getElementById("score-number").textContent = "Score: " + score;
            document.getElementById("submit-btn").textContent = "WRONG";
            document.getElementById("submit-btn").style.backgroundColor = "#E63946";
            document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #9C031E";
            document.getElementById("submit-btn").style.color = "#ffffff";
            document.getElementById("new-btn").style.display = "block";
            document.getElementById("clear-btn").style.display = "none";
        }

        document.getElementById("solution-1").style.backgroundColor = "#457B9D";
        document.getElementById("solution-2").style.backgroundColor = "#457B9D";
        document.getElementById("solution-3").style.backgroundColor = "#457B9D";
        document.getElementById("solution-4").style.backgroundColor = "#457B9D";

        document.getElementById("clear-btn").removeEventListener('click', clearAll);
        document.getElementById("submit-btn").removeEventListener('click', endRound);

        document.removeEventListener('click', ctrlSelect);
    } else if(endBoolean == 3) {
        console.log("Game End - Time's Up");
        clearInterval(id);
        document.getElementById("score-number").textContent = "Final Score: " + score;
        document.getElementById("submit-btn").textContent = "GAME OVER";
        document.getElementById("clear-btn").style.display = "none";
        document.getElementById("submit-btn").style.backgroundColor = "#2c3e50";
        document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #242424";
        document.getElementById("submit-btn").style.color = "#ffffff";

        document.getElementById("solution-1").style.backgroundColor = "#457B9D";
        document.getElementById("solution-2").style.backgroundColor = "#457B9D";
        document.getElementById("solution-3").style.backgroundColor = "#457B9D";
        document.getElementById("solution-4").style.backgroundColor = "#457B9D";

        document.removeEventListener('click', ctrlSelect);
        document.getElementById("clear-btn").removeEventListener('click', clearAll);
        document.getElementById("submit-btn").removeEventListener('click', endRound);
        document.getElementById("new-btn").removeEventListener('click', newRound);

        document.getElementById("new-btn").addEventListener('click', newGame);
        document.getElementById("new-btn").textContent = "NEW GAME";
        document.getElementById("new-btn").style.display = "block";
    }
}

function newGame() {
    score = 0;
    width = 100;
    document.getElementById("new-btn").removeEventListener('click', newGame);
    document.getElementById("score-number").textContent = "Score: " + score;
    setupEventListeners();
    setupGameElements();
    endBoolean = 2;
}

var newRound = function() {
    setupEventListeners();
    setupGameElements();
    endBoolean = 2;
}

var ctrlSelect = function(event) {
    var targetElement = event.target || event.srcElement;

    if(targetElement.textContent == "") {
        return;
    }

    switch(pos) {
        case 0:
            if(targetElement.id.includes("solution")) {
                document.getElementById("clear-btn").style.display = "flex";
                document.getElementById("clear-btn").style.boxShadow = "0px 8px 0px 0px #1D3557";
                document.getElementById("submit-btn").textContent = "DONE";
                document.getElementById("submit-btn").style.backgroundColor = "#27ae60";
                document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #176538";
                document.getElementById("submit-btn").style.color = "#ffffff";
                firstNum = parseInt(targetElement.textContent);
                previousNum = targetElement;
                previousNumId = targetElement.id;
                targetElement.style.backgroundColor = "#274A60";
                console.log(firstNum + " is selected.")
                pos++;
                endBoolean = 2;
            }
            break;

        case 1:
            if(targetElement.id.includes("solution")) {
                if(previousNum == targetElement) {
                    firstNum = "";
                    previousNum = "";
                    previousNumId = "";
                    targetElement.style.backgroundColor = "#457B9D";
                    console.log("Number deselected");
                    pos--;
                } else {
                    firstNum = parseInt(targetElement.textContent);
                    if(previousNum !== "") {
                        previousNum.style.backgroundColor = "#457B9D";
                    }
                    previousNum = targetElement;
                    previousNumId = targetElement.id;
                    targetElement.style.backgroundColor = "#274A60";
                    console.log(firstNum + " is selected.")
                }

            } if(targetElement.id.includes("operation")) {
                operationSelect = targetElement.textContent;
                previousOp = targetElement;
                targetElement.style.backgroundColor = "#79B5B7";
                console.log(operationSelect + " is selected.")
                pos++;
            }
            break;

        case 2:
            if(targetElement.id.includes("solution") && targetElement.id != previousNumId) {
                secondNum = parseInt(targetElement.textContent);
                targetElement.textContent = (Math.round( calculateResult() * 10 ) / 10);
                index--;
                if(targetElement.textContent == 0) {
                    index--;
                    document.getElementById(targetElement.id).textContent = "";
                }
                document.getElementById(previousNumId).textContent = "";
                previousNum.style.backgroundColor = "#457B9D";
                previousOp.style.backgroundColor = "#A8DADC";
                pos = 0;
            } if(targetElement.id.includes("operation")) {
                if(previousOp == targetElement) {
                    previousOp = "";
                    targetElement.style.backgroundColor = "#A8DADC";
                    console.log("Operator deselected");
                    pos--;  
                } else {
                    operationSelect = targetElement.textContent;
                    if(previousOp !== "") {
                        previousOp.style.backgroundColor = "#A8DADC";
                    }
                    previousOp = targetElement;
                    targetElement.style.backgroundColor = "#79B5B7";
                    console.log(operationSelect + " is selected.")
                }
            }
    }
};

var clearAll = function() {
    firstNum = "";
    secondNum = "";
    operationSelect = "";
    previousNum = "";
    previousOp = "";
    previousNumId = "";
    pos = 0;
    endBoolean = 2;
    index = 3;

    document.getElementById("solution-1").style.backgroundColor = "#457B9D";
    document.getElementById("solution-2").style.backgroundColor = "#457B9D";
    document.getElementById("solution-3").style.backgroundColor = "#457B9D";
    document.getElementById("solution-4").style.backgroundColor = "#457B9D";

    document.getElementById("operation-1").style.backgroundColor = "#A8DADC";
    document.getElementById("operation-2").style.backgroundColor = "#A8DADC";
    document.getElementById("operation-3").style.backgroundColor = "#A8DADC";
    document.getElementById("operation-4").style.backgroundColor = "#A8DADC";

    var i;

    for(i = 0; i < solutionPosition.length; i++) {
        document.getElementById("solution-" + (i+1)).textContent = solutionPosition[i];
    }

    console.log("Clear all");
}

var calculateResult = function() {
    switch(operationSelect) {
        case "+":
            return firstNum + secondNum;
        
        case "-":
            return firstNum - secondNum;

        case "x":
            return firstNum * secondNum;

        case "/":
            return firstNum / secondNum;
    }
}

function init() {
    setupEventListeners();
    document.getElementById("clear-btn").style.display = "none";
    console.log('Game has started.');
}

function calculation(a, b, finalResult, last) {
var opArray = ['+', '-', '*', '/'];
var numberArray = [1,2,3,4,5,6,7,8,9,10];

var result = 0;

var math_it_up = {
    '+' : function(x,y) {return x + y},
    '-' : function(x,y) {return x - y},
    '*' : function(x,y) {return x * y},
    '/' : function(x,y) {return x / y}
};

if(last) {
    while(result != finalResult) {
        var randomOp = opArray[Math.floor(Math.random() * opArray.length)];

        result = math_it_up[randomOp](a, b);

        if(result != finalResult) {
            var index = opArray.indexOf(randomOp);

            opArray.splice(index, 1)

            if(opArray.length == 0) {
                opArray = ['+', '-', '*', '/'];

                var numberIndex = numberArray.indexOf(b);

                numberArray.splice(numberIndex, 1);

                b = numberArray[Math.floor(Math.random() * numberArray.length)];

                if(numberArray.length == 0) {
                    console.log("Num4 unable to satisfy equation. Rolling back to Num3.");
                    return 0;
                }
            }
        }
    }
} else {
    while(result == 0 || result < 0 || result % 1 != 0) {
        var randomOp = opArray[Math.floor(Math.random() * 4)];

        result = math_it_up[randomOp](a, b);
    }
}

return result;
}

init();