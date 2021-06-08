// Functions to help with user actions.

// A function to check if a user is logged in on the session cookie.
export const readCookie = () => {
    const url = "/userDatabase/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.username) {
                sessionStorage.setItem("username", json.username)
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


// A function to redirect back to homepage.
export const returnToHomePage = (loginComp) => {
    let path = `/home`;
    loginComp.props.history.push(path);
};


// A function to send a POST request with the user to be logged in.
export const login = (loginComp) => {
    const loginError = document.querySelector("#login-error");
    loginError.style.display = "none";
    const deactivatedError = document.querySelector("#account-deactivated-error");
    deactivatedError.style.display = "none";

    const url = "/userDatabase/login";

    const request = new Request(url, {
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
            // 1) Check user account credentials.
            if (json !== undefined && json.username !== undefined) {
                // 2) Check if account has been deactivated.
                if (json.deactivated === false){
                    sessionStorage.setItem("username", json.username)
                    sessionStorage.setItem("accountType", json.accountType)
                    sessionStorage.setItem("loggedIn", "true")

                    loginError.style.display = "none";
                    deactivatedError.style.display = "none";
                    loginComp.props.history.push("/home");
                } else{
                    setTimeout(function () {
                        deactivatedError.style.display = "block";
                    }, 500);
                }
            } else{
                setTimeout(function () {
                    loginError.style.display = "block";
                }, 500);
            }
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to send a GET request to logout the current user
export const logout = (headerComp) => {
    const url = "/userDatabase/logout";

    fetch(url)
        .then(res => {
            sessionStorage.setItem("username", "visitor")
            sessionStorage.setItem("accountType", "Visitor")
            sessionStorage.setItem("loggedIn", "false")
            headerComp.props.history.push("/");
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to get all users in the database.
export const getAllUsers = (usersAdminComp) => {
    const url = "/userDatabase";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get all users");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            this.setState({ rows: [] })
            for (let user of json.users) {
                usersAdminComp.addRow(user._id, user.username, user.accountType)
            }
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to get a specific user by their id to update.
export const getUserById = (usersAdminComp, id) => {
    const url = "/userDatabase/" + id;

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get user");
            }
        })
        .then(json => {
            // Get existing user details.
            usersAdminComp.setState({
                displayModal: true,
                firstName: json.firstName,
                lastName: json.lastName,
                email: json.email,
                username: json.username,
                password: json.password,
                accountType: json.accountType,
                executivePosition: json.executivePosition,
                deactivated: json.deactivated
            });
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to edit a user.
export const editUser = (usersAdminComp, id) => {
    const url = "/userDatabase/" + id;

    const updatedUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        accountType: this.state.accountType,
        executivePosition: this.state.executivePosition,
        deactivated: this.state.deactivated
    }

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                alert("Successfully updated user");
            } else {
                alert("Could not update user");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllUsers(usersAdminComp);
        });
}


// A function to delete a user.
export const deleteUser = (usersAdminComp, id) => {
    const url = "/userDatabase/" + id;

    const request = new Request(url, {
        method: "DELETE",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                alert("Successfully deleted user");
            } else {
                alert("Failed to delete user");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllUsers(usersAdminComp);
        });
}
