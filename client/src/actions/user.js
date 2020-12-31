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
            if (json.username !== undefined) {
                sessionStorage.setItem("username", json.username)
                sessionStorage.setItem("accountType", json.accountType)
                sessionStorage.setItem("loggedIn", "true")

                loginError.style.display = "none";

                let path;
                if (json.accountType === "Editor") {
                    path = `/home`;
                }
                else if (json.accountType === "Administrator") {
                    path = `/home`; // Temporary.
                }

                console.log("Successfully logged in.")
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


// A function to send a GET request to logout the current user
export const logout = (headerComp) => {
    const url = "/userDatabase/logout";

    fetch(url)
        .then(res => {
            sessionStorage.setItem("username", "visitor")
            sessionStorage.setItem("accountType", "Visitor")
            sessionStorage.setItem("loggedIn", "false")
            console.log("Successfully logged out.")
            headerComp.props.history.push("/");
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to retrieve user account details including first name, last name, and executive position to include in announcement.
export const retrieveAccountDetails = (announcementComp, userId) => {
  const url = "/userDatabase/" + userId;

  fetch(url)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          } else {
              alert("Could not get user");
          }
      })
      .then(json => {
          announcementComp.setState({
              firstName: json.firstName,
              lastName: json.lastName,
              execPosition: json.execPosition
          })
      })
      .catch(error => {
          console.log(error);
      });
}
