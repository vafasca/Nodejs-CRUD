
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
            window.location = (`http://localhost:4000/api/v1/room/${idPlayer}`);//aqui agregar link de la sala creada
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