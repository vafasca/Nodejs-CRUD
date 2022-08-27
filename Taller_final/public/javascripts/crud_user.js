var form = document.querySelector('#crud_form');

const register = async () => {
    /**
     * Metod Post
     */
    document.addEventListener("submit", async e => {
        if (e.target === form) {
            e.preventDefault();
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        userName: e.target.userName.value,
                        userPassword: e.target.userPassword.value
                    }),
                },
                    res = await fetch(
                        "http://localhost:4000/api/v1/user",
                        options
                    ).then(res => {
                        res.json()
                    }).then(data => {
                        //
                        createNewRoom();
                        getvals().then(response => {
                            window.alert("tamanio del arreglo"+response.data.length);
                            for (let index = 0; index < response.data.length; index++) {
                                var idd = response.data[index]._id;
                                
                                localStorage.setItem('idMongo', idd);
                            }
                            var idPlayerMongo = localStorage.getItem('idMongo');
                            registerPlayer(idPlayerMongo);
                        });
                        window.alert('User created successfully');
                        //window.location.replace("http://localhost:4000/api/v1/login");
                    });
                //

            } catch (err) {
                let message = err.statusText || "Error";
                form.insertAdjacentHTML(
                    "afterend",
                    `<p><b>Error ${err.status}: ${message}</b></p>`
                );
            }
        }
    });
}

function getvals() {
    return fetch('http://localhost:4000/api/v1/users',
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

const registerPlayer = (idPlayerMongo) => {
    fetch("http://localhost:9090/api/v1/newPlayer",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ playMongoId: idPlayerMongo }),
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) });
}

const createNewRoom = () => {
    fetch("http://localhost:9090/api/v1/room",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST"
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) });
}