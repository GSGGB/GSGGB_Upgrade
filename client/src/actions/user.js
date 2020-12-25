// Functions to help with user actions.

// A function to check if a user is logged in on the session cookie.
export const readCookie = (app) => {
    const url = "/userDatabase/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to update login credentials.
export const updateLoginCredentials = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};


// A function to send a POST request with the user to be logged in.
export const login = (loginComp, app) => {
    const loginError = document.querySelector("#login-error");
    loginError.style.display = "none";

    // Create our request constructor with all the parameters we need
    const request = new Request("/userDatabase/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({
                  currentUser: json.currentUser,
                  accountType: json.accountType,
                  loggedIn: "true"
                });

                loginError.style.display = "none";

                let path;
                if (json.accountType === "Editor") {
                    path = `/home`;
                }
                else if (json.accountType === "Administrator") {
                    path = `/adminDashboard`;
                }
                loginComp.props.history.push(path);
            }
            else{
                setTimeout(function () {
                    loginError.style.display = "block";
                }, 500);
            }
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to redirect back to homepage.
export const returnToHomePage = (loginComp) => {
    let path = `/home`;
    loginComp.props.history.push(path);
};


// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = "/userDatabase/logout";

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
                accuntType: null
            });
        })
        .catch(error => {
            console.log(error);
        });
};
