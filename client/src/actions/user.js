import React from "react";
import User from "../react-components/Admin/UsersAdmin/User";

// Functions to help with user actions.

// Helper function for getAllUsers and addUser.
const addUserHelper = async(usersAdminComp, user) => {
    const newUser = <User
                        usersAdminComp={usersAdminComp}
                        userId={user._id}
                        username={user.username}
                        accountType={user.accountType}
                        deactivated={user.deactivated}
                    ></User>

    usersAdminComp.setState({
        users: [newUser].concat(usersAdminComp.state.users)
    })
};


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


// A function to update user form.
export const updateUserForm = (comp, field) => {
    const value = field.value;
    const name = field.name;

    comp.setState({
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
        .then(async json => {
            usersAdminComp.setState({ users: [] })

            for (let user of json.users) {
                await addUserHelper(usersAdminComp, user);
            }
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to get a specific user by their id to update.
export const getUserById = (userComp, id) => {
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
            userComp.setState({
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


// A function to add a user.
export const addUser = (usersAdminComp) => {
    const user = {
        firstName: usersAdminComp.state.userFirstName,
        lastName: usersAdminComp.state.userLastName,
        email: usersAdminComp.state.userEmail,
        username: usersAdminComp.state.userUsername,
        password: usersAdminComp.state.userPassword,
        accountType: usersAdminComp.state.userAccountType,
        executivePosition: usersAdminComp.state.userExecutivePosition,
        deactivated: false
    };

    const url = "/userDatabase";

    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                alert("Successfully created user");
                return res.json();
            } else {
                alert("Could not create user");
            }
        })
        .then(async json => {
            await addUserHelper(usersAdminComp, json);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            // Reset state variables.
            usersAdminComp.setState({
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                password: "",
                accountType: "",
                executivePosition: "",
                deactivated: ""
            });
        });
}


// A function to edit a user.
export const editUser = (userComp, usersAdminComp, id) => {
    const url = "/userDatabase/" + id;

    const updatedUser = {
        firstName: userComp.state.firstName,
        lastName: userComp.state.lastName,
        email: userComp.state.email,
        username: userComp.state.username,
        password: userComp.state.password,
        accountType: userComp.state.accountType,
        executivePosition: userComp.state.executivePosition,
        deactivated: userComp.state.deactivated
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


// A function to deactivate a user.
export const deactivateUser = async(usersAdminComp, id) => {
    const url = "/userDatabase/" + id;

    const userRes = await fetch(url);

    if (userRes.status === 200) {
        // Return a promise that resolves with the JSON body.
        const json = await userRes.json();

        const deactivatedUser = {
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email,
            username: json.username,
            password: json.password,
            accountType: json.accountType,
            executivePosition: json.executivePosition,
            deactivated: true
        }

        const request = new Request(url, {
            method: "PATCH",
            body: JSON.stringify(deactivatedUser),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })


        const deactivatedUserRes = await fetch(request);

        if (deactivatedUserRes.status === 200) {
            alert("Successfully deactivated user");
        } else {
            alert("Could not deactivate user");
        }
    } else {
        alert("Could not get user");
    }

    getAllUsers(usersAdminComp);
}


// A function to reactivate a user.
export const reactivateUser = async(usersAdminComp, id) => {
    const url = "/userDatabase/" + id;

    const userRes = await fetch(url);

    if (userRes.status === 200) {
        // Return a promise that resolves with the JSON body.
        const json = await userRes.json();

        const reactivatedUser = {
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email,
            username: json.username,
            password: json.password,
            accountType: json.accountType,
            executivePosition: json.executivePosition,
            deactivated: false
        }

        const request = new Request(url, {
            method: "PATCH",
            body: JSON.stringify(reactivatedUser),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })


        const reactivatedUserRes = await fetch(request);

        if (reactivatedUserRes.status === 200) {
            alert("Successfully reactivated user");
        } else {
            alert("Could not reactivate user");
        }
    } else {
        alert("Could not get user");
    }

    getAllUsers(usersAdminComp);
}
