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
                    window.alert('User created successfully');
                    window.location.replace("http://localhost:4000/api/v1/login");
                });
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
