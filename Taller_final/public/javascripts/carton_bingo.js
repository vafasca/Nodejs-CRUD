// 75 possible numbers
var usedNumbers = new Array(76);
var calledNumbers = new Array();
var goal = "line";
//


function init() {
    generateNewCard();
    //prueba();
}

const saveData = () => {
    const listB = new Array();
    const listI = new Array();
    const listN = new Array();
    const listG = new Array();
    const listO = new Array();
    //window.alert("Se esta ejecutando la prueba");
    fetch('http://localhost:9090/api/v1/playerBingo/62fc4da0278bd830f26a973a').then((data) => {
        var idPlayer;
        console.log(data);
        return data.json();
    }).then((completedata) => {
        // if (squareNum < 12) {
        //     // document.getElementById(currentSquare).value = completedata.data.cartonBingos[squareNum].cartBalota;
        //     // console.log("[ "+squareNum+"] "+completedata.data.cartonBingos[squareNum].cartBalota);
        // } else if (squareNum > 12) {
        //     squareNum = squareNum - 1;
        //     // document.getElementById(currentSquare).value = completedata.data.cartonBingos[squareNum].cartBalota;
        //     // console.log("[ "+squareNum+"] "+completedata.data.cartonBingos[squareNum].cartBalota);
        // }
        //PRUEBA UNA MAS
        //location.reload();
        for (var squareNum = 0; squareNum < 24; squareNum++) {
            //var currentSquare = "sq" + squareNum;

                //********************************/
                //FUNCIONANDO MEJOR
                //console.log(completedata.data);
                if (completedata.data.cartonBingos[squareNum].cartBalota <= 15) {
                    listB.push(completedata.data.cartonBingos[squareNum].cartBalota);
                    //listB[squareNum] = completedata.data.cartonBingos[squareNum].cartBalota;
                } else if (completedata.data.cartonBingos[squareNum].cartBalota >= 16 && completedata.data.cartonBingos[squareNum].cartBalota <= 30) {
                    listI.push(completedata.data.cartonBingos[squareNum].cartBalota);
                    //listI[squareNum] = completedata.data.cartonBingos[squareNum].cartBalota;
                } else if (completedata.data.cartonBingos[squareNum].cartBalota >= 31 && completedata.data.cartonBingos[squareNum].cartBalota <= 45) {
                    listN.push(completedata.data.cartonBingos[squareNum].cartBalota);
                    //listN[squareNum] = completedata.data.cartonBingos[squareNum].cartBalota;
                } else if (completedata.data.cartonBingos[squareNum].cartBalota >= 46 && completedata.data.cartonBingos[squareNum].cartBalota <= 60) {
                    listG.push(completedata.data.cartonBingos[squareNum].cartBalota);
                    //listG[squareNum] = completedata.data.cartonBingos[squareNum].cartBalota;
                } else if (completedata.data.cartonBingos[squareNum].cartBalota >= 61 && completedata.data.cartonBingos[squareNum].cartBalota <= 75) {
                    listO.push(completedata.data.cartonBingos[squareNum].cartBalota);
                    //listO[squareNum] = completedata.data.cartonBingos[squareNum].cartBalota;
                }


        }
        //location.reload();
        console.log(listB)
        console.log("TAMANIOOOOOOOOOOOOOOOOOOOO"+listB.length)
        loadCarton(listB, listI, listN, listG, listO);

    });
}

const loadCarton = (listB, listI, listN, listG, listO) => {
    //PARA B
    document.getElementById("sq0").value = listB[0];
    document.getElementById("sq5").value = listB[1];
    document.getElementById("sq10").value = listB[2];
    document.getElementById("sq15").value = listB[3];
    document.getElementById("sq20").value = listB[4];
    //PARA I
    document.getElementById("sq1").value = listI[0];
    document.getElementById("sq6").value = listI[1];
    document.getElementById("sq11").value = listI[2];
    document.getElementById("sq16").value = listI[3];
    document.getElementById("sq21").value = listI[4];
    //PARA N
    document.getElementById("sq2").value = listN[0];
    document.getElementById("sq7").value = listN[1];
    //document.getElementById("sq12").value = listN[2];
    document.getElementById("sq17").value = listN[2];
    document.getElementById("sq22").value = listN[3];
    //PARA G
    document.getElementById("sq3").value = listG[0];
    document.getElementById("sq8").value = listG[1];
    document.getElementById("sq13").value = listG[2];
    document.getElementById("sq18").value = listG[3];
    document.getElementById("sq23").value = listG[4];
    //PARA O
    document.getElementById("sq4").value = listO[0];
    document.getElementById("sq9").value = listO[1];
    document.getElementById("sq14").value = listO[2];
    document.getElementById("sq19").value = listO[3];
    document.getElementById("sq24").value = listO[4];
}


const saveBalotas = (newNumber) => {
    console.log("ENTRANDO A LA BD: " + newNumber);
    fetch("http://localhost:9090/api/v1/cartonBingo",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                cartBalota: newNumber
            })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) });
}

function generateNewCard() {
    // set all elements in usedNumbers array as false
    resetUsedNumbers();
    // loops 24 times because there are 24 squares (not including free square)
    for (var i = 0; i < 25; i++) {
        if (i == 12) // skip free square
            continue;
        // generates a number for each square
        generateSquare(i);
    }
    saveData();
}
function generateSquare(squareNum) {
    var currentSquare = "sq" + squareNum;
    // array of column numbers
    var baseNumbers = new Array(0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4);
    // generates random number for each square (depends on column)
    var newNumber = (baseNumbers[squareNum] * 15) + generateNewNum();

    // loop makes sure there are no duplicates
    while (usedNumbers[newNumber] == true) {
        newNumber = (baseNumbers[squareNum] * 15) + generateNewNum();
    }
    // sets the used number in the array as true so no duplicates
    usedNumbers[newNumber] = true;
    //
    //mando la balota a la bd
    console.log("square num: " + squareNum);
    console.log("NUMERO A GUARDAR: " + newNumber);
    // sets the current square to the new number
    saveBalotas(newNumber);
    //document.getElementById(currentSquare).value = newNumber;
    console.log("numero que muestra en el value" + newNumber);
    //saveBalotas(newNumber);
}
function generateNewNum() {
    // generates a random numbers between 1 and 15
    var numeror = Math.floor((Math.random() * 15) + 1);
    return numeror
}
function resetUsedNumbers() {
    // sets all elements of the usedNumbers array to false (resets the array)
    for (var i = 0; i < usedNumbers.length; i++) {
        usedNumbers[i] = false;
    }
}

// when clicked, generates a new random card
// function generateAnotherCard() {
//     resetUsedNumbers();
//     generateNewCard();
//     resetSquareColours();
// }

// resets all squares except FREE to white
function resetSquareColours() {
    for (var i = 0; i < 25; i++) {
        if (i == 12)
            continue;
        var currentSquare = document.getElementById("sq" + i);
        currentSquare.style.backgroundColor = "#ffffff";
    }
    return;
}

function markSquare(square) {
    var currentSquare = document.getElementById(square);
    if (currentSquare.style.backgroundColor == "lightblue")
        currentSquare.style.backgroundColor = "#ffffff";
    else
        currentSquare.style.backgroundColor = "lightblue";
    return;
}

function callNumber() {
    var rand = Math.floor(Math.random() * 75) + 1; // random number between 1 and 75
    // if the number is in the array (already been called)
    if (calledNumbers.includes(rand))
        callNumber();
    else {
        calledNumbers.push(rand);
        if (rand >= 1 && rand <= 15)
            document.getElementById("currentCall").innerHTML = 'B' + rand;
        else if (rand >= 16 && rand <= 30)
            document.getElementById("currentCall").innerHTML = 'I' + rand;
        else if (rand >= 31 && rand <= 45)
            document.getElementById("currentCall").innerHTML = 'N' + rand;
        else if (rand >= 46 && rand <= 60)
            document.getElementById("currentCall").innerHTML = 'G' + rand;
        else
            document.getElementById("currentCall").innerHTML = 'O' + rand;
        document.getElementById("calledNums").innerHTML = calledNumbers;
    }
}

function lineBingo() {
    goal = "line";
    document.getElementById("bLine").style.backgroundColor = "#4286f4";
    document.getElementById("bLine").disabled = true;
    document.getElementById("bFull").disabled = true;
    document.getElementById("bFull").style.backgroundColor = "#grey";

}

function fullBingo() {
    goal = "full";
    document.getElementById("bFull").style.backgroundColor = "#4286f4";
    document.getElementById("bFull").disabled = true;
    document.getElementById("bLine").disabled = true;
    document.getElementById("bLine").style.backgroundColor = "#grey";
}

function checkForBingo() {
    if (goal == "line") {
        checkVerticalBingo();
        checkHorizontalBingo();
        checkDiagonalBingo();
        checkCornersBingo();
    }
    else {
        checkFullBingo();
    }
}

function checkVerticalBingo() {
    for (var i = 0; i < 5; i++) {
        var sq1 = document.getElementById('sq' + i);
        var sq2 = document.getElementById('sq' + (i + 5));
        var sq3 = document.getElementById('sq' + (i + 10));
        var sq4 = document.getElementById('sq' + (i + 15));
        var sq5 = document.getElementById('sq' + (i + 20));

        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkHorizontalBingo() {
    j = 0;
    for (var i = 0; i < 5; i++) {
        switch (i) {
            case 0:
                var sq1 = document.getElementById('sq' + i);
                var sq2 = document.getElementById('sq' + (i + 1));
                var sq3 = document.getElementById('sq' + (i + 2));
                var sq4 = document.getElementById('sq' + (i + 3));
                var sq5 = document.getElementById('sq' + (i + 4));
                break;
            case 1:
                var sq1 = document.getElementById('sq' + (i + 4));
                var sq2 = document.getElementById('sq' + (i + 5));
                var sq3 = document.getElementById('sq' + (i + 6));
                var sq4 = document.getElementById('sq' + (i + 7));
                var sq5 = document.getElementById('sq' + (i + 8));
                break;
            case 2:
                var sq1 = document.getElementById('sq' + (i + 8));
                var sq2 = document.getElementById('sq' + (i + 9));
                var sq3 = document.getElementById('sq' + (i + 10));
                var sq4 = document.getElementById('sq' + (i + 11));
                var sq5 = document.getElementById('sq' + (i + 12));
                break;
            case 3:
                var sq1 = document.getElementById('sq' + (i + 12));
                var sq2 = document.getElementById('sq' + (i + 13));
                var sq3 = document.getElementById('sq' + (i + 14));
                var sq4 = document.getElementById('sq' + (i + 15));
                var sq5 = document.getElementById('sq' + (i + 16));
                break;
            case 4:
                var sq1 = document.getElementById('sq' + (i + 16));
                var sq2 = document.getElementById('sq' + (i + 17));
                var sq3 = document.getElementById('sq' + (i + 18));
                var sq4 = document.getElementById('sq' + (i + 19));
                var sq5 = document.getElementById('sq' + (i + 20));
                break;
        }
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkDiagonalBingo() {
    for (var i = 0; i < 2; i++) {
        switch (i) {
            case 0:
                var sq1 = document.getElementById('sq' + 0);
                var sq2 = document.getElementById('sq' + 6);
                var sq3 = document.getElementById('sq' + 12);
                var sq4 = document.getElementById('sq' + 18);
                var sq5 = document.getElementById('sq' + 24);
                break;
            case 1:
                var sq1 = document.getElementById('sq' + 4);
                var sq2 = document.getElementById('sq' + 8);
                var sq3 = document.getElementById('sq' + 12);
                var sq4 = document.getElementById('sq' + 16);
                var sq5 = document.getElementById('sq' + 20);
                break;
        }
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkCornersBingo() {
    var sq1 = document.getElementById('sq' + 0);
    var sq2 = document.getElementById('sq' + 4);
    var sq3 = document.getElementById('sq' + 20);
    var sq4 = document.getElementById('sq' + 24);

    if (sq1.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq1.value)) &&
        sq2.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq2.value)) &&
        sq3.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq3.value)) &&
        sq4.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq4.value))) {
        youWinCorners(sq1, sq2, sq3, sq4);
        return;
    }
    else {
        document.getElementById("currentCall").innerHTML = "Not a valid bingo! Keep trying!";
        return;
    }
}

function checkFullBingo() {
    var j = 0;
    var flag = false;
    for (var i = 0; i < 5; i++) {
        var sq1 = document.getElementById('sq' + j);
        j++;
        var sq2 = document.getElementById('sq' + j);
        j++;
        var sq3 = document.getElementById('sq' + j);
        j++;
        var sq4 = document.getElementById('sq' + j);
        j++;
        var sq5 = document.getElementById('sq' + j);
        j++;

        if (sq1.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq1.value)) &&
            sq2.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq2.value)) &&
            sq3.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq3.value)) &&
            sq4.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq4.value)) &&
            sq5.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq5.value))) {
            flag = true;
        }
        else if (sq1.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq1.value)) &&
            sq2.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq2.value)) &&
            sq3.value == "FREE" &&
            sq4.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq4.value)) &&
            sq5.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq5.value))) {
            flag = true;
        }
        else {
            flag = false;
            break;
        }
    }
    if (flag == true) {
        youWinFullBingo();
    }
    else {
        document.getElementById("currentCall").innerHTML = "Not a valid bingo! Keep trying!";
        return;
    }
}

function checkLines(sq1, sq2, sq3, sq4, sq5) {
    if (sq1.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq1.value)) &&
        sq2.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq2.value)) &&
        sq3.value == "FREE" &&
        sq4.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq4.value)) &&
        sq5.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq5.value))) {
        youWin(sq1, sq2, sq3, sq4, sq5);
        return;
    }
    else if (sq1.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq1.value)) &&
        sq2.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq2.value)) &&
        sq3.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq3.value)) &&
        sq4.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq4.value)) &&
        sq5.style.backgroundColor == "lightblue" && calledNumbers.includes(parseInt(sq5.value))) {
        youWin(sq1, sq2, sq3, sq4, sq5);
        return;
    }
    else {
        document.getElementById("currentCall").innerHTML = "Not a valid bingo! Keep trying!";
        return;
    }
}

function youWin(sq1, sq2, sq3, sq4, sq5) {
    sq1.style.backgroundColor = "yellow";
    sq2.style.backgroundColor = "yellow";
    sq3.style.backgroundColor = "yellow";
    sq4.style.backgroundColor = "yellow";
    sq5.style.backgroundColor = "yellow";
    document.getElementById("bCall").disabled = true;
    document.getElementById("bBingo").disabled = true;
    document.getElementById("currentCall").innerHTML = "BINGO!";
    alert("BINGO! You win!");
    throw new Error("Not an error! Just finishes any execution of the game!");
}

function youWinCorners(sq1, sq2, sq3, sq4) {
    sq1.style.backgroundColor = "yellow";
    sq2.style.backgroundColor = "yellow";
    sq3.style.backgroundColor = "yellow";
    sq4.style.backgroundColor = "yellow";
    document.getElementById("bCall").disabled = true;
    document.getElementById("bBingo").disabled = true;
    document.getElementById("currentCall").innerHTML = "BINGO!";
    alert("BINGO! You win!");
    throw new Error("Not an error! Just finishes any execution of the game!");
}

function youWinFullBingo() {
    document.getElementById("bCall").disabled = true;
    document.getElementById("bBingo").disabled = true;
    document.getElementById("currentCall").innerHTML = "BINGO!";
    alert("BINGO! You win!");
    throw new Error("Not an error! Just finishes any execution of the game!");
}

