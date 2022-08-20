    
    document.addEventListener("submit", async e => {
            e.preventDefault();
            fetch('http://localhost:4000/api/v1/users').then((data) => {
                // console.log((data));
                var idPlayer;
                return data.json();
            }).then((completedata) =>{
                var status = false;
                for (let index = 0; index < completedata.data.length; index++) {
                    if ((e.target.userName.value == completedata.data[index].userName) & (e.target.userPassword.value === completedata.data[index].userPassword)) {
                        status = true;
                        idPlayer = completedata.data[index]._id;
                        //console.log(idPlayer);
                    }   
                }
                if (status == true) {
                    createNewRoom();
                    window.alert('Welcome');
                    registerPlayer(idPlayer);
                    window.location.replace(`http://localhost:4000/api/v1/room/${idPlayer}`);//aqui agregar link de la sala creada
                }else{
                    window.alert('User / Password incorrect');
                    window.location.replace('http://localhost:4000/api/v1/login');
                }
            });
    });

    const  createNewRoom = () => {
        fetch("http://localhost:9090/api/v1/room",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST"
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) });
    }

    const  registerPlayer = (idUser) => {
        fetch("http://localhost:9090/api/v1/newPlayer",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({playMongoId: idUser}),
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) });
    }