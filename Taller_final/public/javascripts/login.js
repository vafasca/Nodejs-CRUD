
document.addEventListener("submit", async e => {
    e.preventDefault();
    fetch('http://localhost:4000/api/v1/users').then((data) => {
        var idPlayer;
        return data.json();
    }).then((completedata) => {
        var status = false;
        for (let index = 0; index < completedata.data.length; index++) {
            if ((e.target.userName.value == completedata.data[index].userName) & (e.target.userPassword.value === completedata.data[index].userPassword)) {
                status = true;
                idPlayer = completedata.data[index]._id;
                localStorage.setItem('id', completedata.data[index]._id);

            }
        }
        if (status == true) {
            window.alert('Welcome');
            getBalota(idPlayer).then(response => {
                window.alert("tiene: "+response.data.cartonBingos.length);
                if (response.data.cartonBingos.length == 0) {
                    window.alert("entro al if");
                    generateNewCard(idPlayer);
                }
            });
            setTimeout(() => {
                window.location.replace(`http://localhost:4000/api/v1/room/${idPlayer}`);
            }, 1500);
            //window.location = (`http://localhost:4000/api/v1/room/${idPlayer}`);//aqui agregar link de la sala creada
        } else {
            window.alert('User / Password incorrect');
            window.location.replace('http://localhost:4000/api/v1/login');
        }
    });
});

function getBalota(idPlayer) {
    console.log("HOLA"+localStorage.getItem('id'));
    return fetch(`http://localhost:9090/api/v1/playerBingo/${idPlayer}`,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
}

function generateNewCard(idPlayer) {
    // B
    let listB = new Array();
    let newNumber = 0;
    for (var i = 0; i < 5;) {// i=1
        let count = 0;
        newNumber = Math.round(Math.random()*(15-1)+parseInt(1));
        if (listB.length == 0) {
            listB.push(newNumber);
            saveBalotas(newNumber);
            i++;
        }else{
                do {
                    count = 0;
                    newNumber = Math.round(Math.random()*(15-1)+parseInt(1));
                    for (let index = 0; index <= listB.length; index++) {
                        if (listB[index] == newNumber) {
                            count++;
                        }
                    }
                } while (count >= 1);
                if (count == 0) {
                    listB.push(newNumber);
                    saveBalotas(newNumber);
                    i++;
                }
            }
        }

    //I
    let listI = new Array();
    for (var i = 0; i < 5;) {
        let count = 0;
        newNumber = Math.round(Math.random()*(30-16)+parseInt(16));
        if (listI.length == 0) {    
            listI.push(newNumber);
            saveBalotas(newNumber);
            i++;
        }else{
                do {
                    count = 0;
                    newNumber = Math.round(Math.random()*(30-16)+parseInt(16));
                    for (let index = 0; index <= listI.length; index++) {
                        if (listI[index] == newNumber) {
                            count++;
                        }
                    }
                } while (count >= 1);
                if (count == 0) {
                    listI.push(newNumber);
                    saveBalotas(newNumber);
                    i++;
                }
            }
    }
    //N
    let listN = new Array();
    for (var i = 0; i < 4;) {
        let count = 0;
        newNumber = Math.round(Math.random()*(45-31)+parseInt(31));
        if (listN.length == 0) {
            listN.push(newNumber);
            saveBalotas(newNumber);
            i++;
        }else{
                do {
                    count = 0;
                    newNumber = Math.round(Math.random()*(45-31)+parseInt(31));
                    for (let index = 0; index <= listN.length; index++) {
                        if (listN[index] == newNumber) {
                            count++;
                        }
                    }
                } while (count >= 1);
                if (count == 0) {
                    listN.push(newNumber);
                    saveBalotas(newNumber);
                    i++;
                }
            }
    }
    //G
    let listG = new Array();
    for (var i = 0; i < 5;) {
        let count = 0;
        newNumber = Math.round(Math.random()*(60-46)+parseInt(46));
        if (listG.length == 0) {
            listG.push(newNumber);
            saveBalotas(newNumber);
            i++;
        }else{
                do {
                    count = 0;
                    newNumber = Math.round(Math.random()*(60-46)+parseInt(46));
                    for (let index = 0; index <= listG.length; index++) {
                        if (listG[index] == newNumber) {
                            count++;
                        }
                    }
                } while (count >= 1);
                if (count == 0) {
                    listG.push(newNumber);
                    saveBalotas(newNumber);
                    i++;
                }
            }
    }
    //O
    let listO = new Array();
    for (var i = 0; i < 5;) {
        let count = 0;
        newNumber = Math.round(Math.random()*(75-61)+parseInt(61));
        if (listO.length == 0) {
            listO.push(newNumber);
            saveBalotas(newNumber);
            i++;
        }else{
                do {
                    count = 0;
                    newNumber = Math.round(Math.random()*(75-61)+parseInt(61));
                    for (let index = 0; index <= listO.length; index++) {
                        if (listO[index] == newNumber) {
                            count++;
                        }
                    }
                } while (count >= 1);
                if (count == 0) {
                    listO.push(newNumber);
                    saveBalotas(newNumber);
                    i++;
                }
            }
    }
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