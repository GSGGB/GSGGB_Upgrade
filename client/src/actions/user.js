import React from "react";
import User from "../react-components/Admin/UsersAdmin/User";
import { addImage, deleteImage } from "../actions/image";

// Functions to help with user actions.

// A function to delete the user headshot.
const deleteImageHelper = async(user) => {
      const imageURL = "/.netlify/functions/api/imageDatabase/" + user.imageId;
      const imageRes = await fetch(imageURL);

      if (imageRes.status === 200) {
          const imageJSON = await imageRes.json();
          deleteImage(imageJSON.imageId);
      }
};


// Helper function for getAllUsers and addUser.
const addUserHelper = async(usersAdminComp, user) => {
    // Retrieve image cloudinary ID and URL.
    const imageURL = "/.netlify/functions/api/imageDatabase/" + user.imageId;

    const imageRes = await fetch(imageURL);

    if (imageRes.status === 200) {
        const imageJSON = await imageRes.json();

        const newUser = <User
                            usersAdminComp={usersAdminComp}
                            userId={user._id}
                            imageCloudinaryId={imageJSON.imageId}
                            imageURL={imageJSON.imageURL}
                            username={user.username}
                            accountType={user.accountType}
                            executivePosition={user.executivePosition}
                            deactivated={user.deactivated}
                        ></User>

        usersAdminComp.setState({
            users: (usersAdminComp.state.users).concat([newUser])
        })
    } else {
        alert("Could not get user");
    }
};


// A function to check if a user is logged in on the session cookie.
export const readCookie = () => {
    const url = "/.netlify/functions/api/userDatabase/check-session";

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

    const url = "/.netlify/functions/api/userDatabase/login";

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
    const url = "/.netlify/functions/api/userDatabase/logout";

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
    const url = "/.netlify/functions/api/userDatabase";

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
    const url = "/.netlify/functions/api/userDatabase/" + id;

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
                displayEditModal: true,
                imageId: json.imageId,
                firstName: json.firstName,
                lastName: json.lastName,
                email: json.email,
                username: json.username,
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
    // 1) Add headshot to cloudinary first.
    addImage(usersAdminComp, () => {
        // 2) Add user to MongoDB database.
        const url = "/.netlify/functions/api/userDatabase";

        const user = {
            imageId: usersAdminComp.state.imageId,
            firstName: usersAdminComp.state.userFirstName,
            lastName: usersAdminComp.state.userLastName,
            email: usersAdminComp.state.userEmail,
            username: usersAdminComp.state.userUsername,
            password: usersAdminComp.state.userPassword,
            accountType: usersAdminComp.state.userAccountType,
            executivePosition: usersAdminComp.state.userExecutivePosition,
            deactivated: false
        };

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
                    deleteImageHelper(user);
                }
            })
            .then(json => {
                addUserHelper(usersAdminComp, json);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                // Reset state variables.
                usersAdminComp.setState({
                    imageFile: "",
                    imageId: "",
                    userFirstName: "",
                    userLastName: "",
                    userEmail: "",
                    userUsername: "",
                    userPassword: "",
                    userAccountType: "",
                    userExecutivePosition: ""
                });
            });
    });
}


// Helper function for editUser.
const editUserHelper = (userComp, usersAdminComp, url, imageUpdated, imageCloudinaryId) => {
    const updatedUser = {
        imageId: userComp.state.imageId,
        firstName: userComp.state.firstName,
        lastName: userComp.state.lastName,
        email: userComp.state.email,
        username: userComp.state.username,
        password: userComp.state.confirmPassword,
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

                // Delete old image.
                if (imageUpdated === true){
                    deleteImage(imageCloudinaryId);
                }
            } else {
                alert("Could not update user");

                // Delete image just uploaded but not added to user due to mongoose model fail.
                if (imageUpdated === true){
                    deleteImageHelper(updatedUser);
                }
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllUsers(usersAdminComp);
        });
}


// A function to edit a user.
export const editUser = (userComp, usersAdminComp, imageCloudinaryId, userId) => {
    const url = "/.netlify/functions/api/userDatabase/" + userId;

    // 1) Check whether administrator wants to update image.
    // If so, delete current image in cloudinary.
    if (document.querySelector("#user-image-checkbox").checked){
        // Add new headshot to cloudinary.
        addImage(userComp, () => {
            // 2) Edit user in MongoDB database.
            editUserHelper(userComp, usersAdminComp, url, true, imageCloudinaryId)
        });
    } else {
        // Edit user in MongoDB database without modifying image.
        editUserHelper(userComp, usersAdminComp, url, false, imageCloudinaryId)
    }
}


// A function to delete a user.
export const deleteUser = async(userComp, usersAdminComp, imageCloudinaryId, userId) => {
    // 1) Remove executive from MongoDB database.
    const url = "/.netlify/functions/api/userDatabase/" + userId;

    const userRes = await fetch(url);

    if (userRes.status === 200) {
        // Return a promise that resolves with the JSON body.
        const json = await userRes.json();

        const deletedUser = {
            username: json.username,
            password: userComp.state.confirmPassword
        }

        const request = new Request(url, {
            method: "DELETE",
            body: JSON.stringify(deletedUser),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });


        const deletedUserRes = await fetch(request);

        if (deletedUserRes.status === 200) {
            alert("Successfully deleted user");

            // 2) If credentials are correct, delete their headshot in cloudinary.
            deleteImage(imageCloudinaryId);
        } else {
            alert("Failed to delete user. User may have already created content in a page.");
        }
    } else {
        alert("Could not find user");
    }

    getAllUsers(usersAdminComp);
}


// A function to update a user's password.
export const updateUserPassword = async(userComp, usersAdminComp, id) => {
    const getURL = "/.netlify/functions/api/userDatabase/" + id;

    const userRes = await fetch(getURL);

    if (userRes.status === 200) {
        // Return a promise that resolves with the JSON body.
        const json = await userRes.json();

        const patchURL = "/.netlify/functions/api/userDatabase/password/" + id;

        const updatedUser = {
            imageId: json.imageId,
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email,
            username: json.username,
            oldPassword: userComp.state.oldPassword,
            newPassword: userComp.state.newPassword,
            accountType: json.accountType,
            executivePosition: json.executivePosition,
            deactivated: json.deactivated
        }

        const request = new Request(patchURL, {
            method: "PATCH",
            body: JSON.stringify(updatedUser),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })

        const updatedUserRes = await fetch(request);

        if (updatedUserRes.status === 200) {
            alert("Successfully updated user password");
        } else {
            alert("Failed to update user password. Old password may be invalid.");
        }
    } else {
        alert("Could not find user");
    }

    getAllUsers(usersAdminComp);
}


// A function to deactivate a user.
export const deactivateUser = async(userComp, usersAdminComp, id) => {
    const url = "/.netlify/functions/api/userDatabase/" + id;

    const userRes = await fetch(url);

    if (userRes.status === 200) {
        // Return a promise that resolves with the JSON body.
        const json = await userRes.json();

        const deactivatedUser = {
            imageId: json.imageId,
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email,
            username: json.username,
            password: userComp.state.confirmPassword,
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
        alert("Could not find user");
    }

    getAllUsers(usersAdminComp);
}


// A function to reactivate a user.
export const reactivateUser = async(userComp, usersAdminComp, id) => {
    const url = "/.netlify/functions/api/userDatabase/" + id;

    const userRes = await fetch(url);

    if (userRes.status === 200) {
        // Return a promise that resolves with the JSON body.
        const json = await userRes.json();

        const reactivatedUser = {
            imageId: json.imageId,
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email,
            username: json.username,
            password: userComp.state.confirmPassword,
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
        alert("Could not find user");
    }

    getAllUsers(usersAdminComp);
}
