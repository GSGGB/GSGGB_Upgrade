import React from "react";
import Research from "../react-components/HomePage/Research";

// Functions to help with research posts.

// Helper function for getAllResearchPosts and addResearchPost.
const addResearchPostHelper = async(homepageComp, researchPost, routeType) => {
    // Retrieve user details including username and full name.
    const url = "/userDatabase/" + researchPost.userId;

    const res = await fetch(url);

    if (res.status === 200) {
        const json = await res.json();

        const newResearchPost = <Research
                                    homepageComp={homepageComp}
                                    researchId={researchPost._id}
                                    username={json.username}
                                    fullName={json.firstName + " " + json.lastName}
                                    executivePosition={json.executivePosition}
                                    headshot={json.firstName + ".jpg"}
                                    url={researchPost.url}
                                ></Research>
        homepageComp.setState({
            researchPosts: [newResearchPost].concat(homepageComp.state.researchPosts)
        })

        if (routeType === "POST"){
            alert("Successfully added research post");
        }
    } else {
        alert("Could not get user");
    }
};

// A function to update the research post URL.
export const updateResearchURL = (comp, field) => {
    const value = field.value;
    const name = field.name;

    comp.setState({
        [name]: value
    });
};


// A function to get all research posts in the database.
export const getAllResearchPosts = (homepageComp) => {
    const url = "/researchDatabase";

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get all research posts");
            }
        })
        .then(async json => {
            homepageComp.setState({researchPosts: []})

            for (let researchPost of json.researchPosts) {
                await addResearchPostHelper(homepageComp, researchPost, "GET");
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// A function to get a specific research post by their id to update.
export const getResearchPostById = (researchComp, id) => {
    const url = "/researchDatabase/" + id;

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get research post");
            }
        })
        .then(json => {
            researchComp.setState({
                displayModal: true,
                url: json.url
            });
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to add a research post.
export const addResearchPost = (homepageComp) => {
    const researchPost = {
        url: homepageComp.state.researchURL
    };

    const url = "/researchDatabase";

    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(researchPost),
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
            } else {
                alert("Could not add research post");
            }
        })
        .then(json => {
            addResearchPostHelper(homepageComp, json, "POST");
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            // Reset state variable.
            homepageComp.setState({
                researchURL: ""
            });
        });
}

// A function to edit a research post.
export const editResearchPost = (researchComp, homepageComp, id) => {
    const url = "/researchDatabase/" + id;

    const updatedResearchPost = {
        url: researchComp.state.url
    }

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(updatedResearchPost),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                alert("Successfully updated research post");
            } else {
                alert("Could not update research post");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllResearchPosts(homepageComp);
        });
}

// A function to delete a research post.
export const deleteResearchPost = (homepageComp, id) => {
    const url = "/researchDatabase/" + id;

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
                alert("Successfully deleted research post");
            } else {
                alert("Failed to delete research post");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllResearchPosts(homepageComp);
        });
}
