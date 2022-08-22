// 75 possible numbers
var usedNumbers = new Array(76);
var calledNumbers = new Array();
var goal = "line";
//


function init() {
    //generateNewCard();
    setTimeout(() => {
        getData();
    }, 1500);
}

const reloadPage = () => {
    generateNewCard();
    init();
}

const getData = () => {
    const listB = new Array();
    const listI = new Array();
    const listN = new Array();
    const listG = new Array();
    const listO = new Array();
    //window.alert("Se esta ejecutando la prueba");
    fetch('http://localhost:9090/api/v1/playerBingo/6303cae23434532002f68d29').then((data) => {
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
    //getData();
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
// function resetSquareColours() {
//     for (var i = 0; i < 25; i++) {
//         if (i == 12)
//             continue;
//         var currentSquare = document.getElementById("sq" + i);
//         currentSquare.style.backgroundColor = "#ffffff";
//     }
//     return;
// }

// function markSquare(square) {
//     var currentSquare = document.getElementById(square);
//     if (currentSquare.style.backgroundColor == "lightblue")
//         currentSquare.style.backgroundColor = "#ffffff";
//     else
//         currentSquare.style.backgroundColor = "lightblue";
//     return;
// }

// function callNumber() {
//     var rand = Math.floor(Math.random() * 75) + 1; // random number between 1 and 75
//     // if the number is in the array (already been called)
//     if (calledNumbers.includes(rand))
//         callNumber();
//     else {
//         calledNumbers.push(rand);
//         if (rand >= 1 && rand <= 15)
//             document.getElementById("currentCall").innerHTML = 'B' + rand;
//         else if (rand >= 16 && rand <= 30)
//             document.getElementById("currentCall").innerHTML = 'I' + rand;
//         else if (rand >= 31 && rand <= 45)
//             document.getElementById("currentCall").innerHTML = 'N' + rand;
//         else if (rand >= 46 && rand <= 60)
//             document.getElementById("currentCall").innerHTML = 'G' + rand;
//         else
//             document.getElementById("currentCall").innerHTML = 'O' + rand;
//         document.getElementById("calledNums").innerHTML = calledNumbers;
//     }
// }
