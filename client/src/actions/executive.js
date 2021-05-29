import React from "react";
import Executive from "../react-components/Team/Executive";
import { addImage, deleteImage } from "../actions/image";

// Functions to help with executives.

// Helper function for getAllExecutives and addExecutive.
const addExecutiveHelper = async(teamComp, executive) => {
    // Retrieve user details including username.
    const userURL = "/userDatabase/" + executive.userId;

    const userRes = await fetch(userURL);

    if (userRes.status === 200) {
        const userJSON = await userRes.json();

        // Retrieve image cloudinary ID and URL.
        const imageURL = "/imageDatabase/" + executive.imageId;

        const imageRes = await fetch(imageURL);

        let linkedin = "https://www.linkedin.com";
        if (executive.linkedin){
            linkedin = executive.linkedin;
        }

        let email = "info@gsggb.org";
        if (executive.email){
            email = executive.email;
        }

        if (imageRes.status === 200) {
            const imageJSON = await imageRes.json();

            const newExecutive = <Executive
                                      teamComp={teamComp}
                                      executiveId={executive._id}
                                      username={userJSON.username}
                                      imageCloudinaryId={imageJSON.imageId}
                                      imageURL={imageJSON.imageURL}
                                      firstName={executive.firstName}
                                      lastName={executive.lastName}
                                      team={executive.team}
                                      position={executive.position}
                                      biography={executive.biography}
                                      linkedin={linkedin}
                                      email={email}
                                ></Executive>

            // Add to appropriate array depending on team.
            if (executive.team === "Senior Staff"){
                teamComp.setState({
                    seniorStaffExecs: [newExecutive].concat(teamComp.state.seniorStaffExecs)
                })
            } else if (executive.team === "Conference Committee"){
                teamComp.setState({
                    conferenceExecs: [newExecutive].concat(teamComp.state.conferenceExecs)
                })
            } else if (executive.team === "Marketing"){
                teamComp.setState({
                    marketingExecs: [newExecutive].concat(teamComp.state.marketingExecs)
                })
            } else if (executive.team === "Affairs"){
                teamComp.setState({
                    affairsExecs: [newExecutive].concat(teamComp.state.affairsExecs)
                })
            } else if (executive.team === "Mentorship"){
                teamComp.setState({
                    mentorshipExecs: [newExecutive].concat(teamComp.state.mentorshipExecs)
                })
            } else if (executive.team === "Events"){
                teamComp.setState({
                    eventsExecs: [newExecutive].concat(teamComp.state.eventsExecs)
                })
            } else if (executive.team === "Tech & Innovations"){
                teamComp.setState({
                    techExecs: [newExecutive].concat(teamComp.state.techExecs)
                })
            } else if (executive.team === "JIGG"){
                teamComp.setState({
                    jiggExecs: [newExecutive].concat(teamComp.state.jiggExecs)
                })
            } else if (executive.team === "Alumni"){
                teamComp.setState({
                    alumniExecs: [newExecutive].concat(teamComp.state.alumniExecs)
                })
            }

        } else {
            alert("Could not get executive");
        }
    } else {
        alert("Could not get user");
    }
};

// A function to update contents of executive form.
export const updateExecutiveForm = (comp, field) => {
    const value = field.value;
    const name = field.name;

    comp.setState({
        [name]: value
    });
};


// A function to get all executives in the database.
export const getAllExecutives = (teamComp) => {
    const url = "/executiveDatabase";

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get all executives");
            }
        })
        .then(async json => {
            teamComp.setState({
                seniorStaffExecs: [],
                conferenceExecs: [],
                marketingExecs: [],
                affairsExecs: [],
                mentorshipExecs: [],
                eventsExecs: [],
                techExecs: [],
                jiggExecs: [],
                alumniExecs: []
            })

            for (let executive of json.allExecutives) {
                await addExecutiveHelper(teamComp, executive);
            }
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to get a specific executive by their id to update.
export const getExecutiveById = (executiveComp, id) => {
    const url = "/executiveDatabase/" + id;

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get executive");
            }
        })
        .then(json => {
            // Get existing executive details.
            executiveComp.setState({
                displayModal: true,
                imageId: json.imageId,
                firstName: json.firstName,
                lastName: json.lastName,
                team: json.team,
                position: json.position,
                biography: json.biography,
                linkedin: json.linkedin,
                email: json.email
            });
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to add a single executive.
export const addExecutive = (teamComp) => {
    // 1) Add poster/image to cloudinary first.
    addImage(teamComp, () => {
        // 2) Add executive to MongoDB database.
        const url = "/executiveDatabase";

        const executive = {
            imageId: teamComp.state.imageId,
            firstName: teamComp.state.execFirstName,
            lastName: teamComp.state.execLastName,
            team: teamComp.state.execTeam,
            position: teamComp.state.execPosition,
            biography: teamComp.state.execBiography,
            linkedin: teamComp.state.execLinkedin,
            email: teamComp.state.execEmail
        };

        const request = new Request(url, {
            method: "POST",
            body: JSON.stringify(executive),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });

        // Send the request with fetch()
        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    alert("Successfully added executive");
                    return res.json();
                } else {
                    alert("Could not add executive");
                }
            })
            .then(json => {
                addExecutiveHelper(teamComp, json);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                // Reset state variables.
                teamComp.setState({
                    imageFile: "",
                    imageId: "",
                    execFirstName: "",
                    execLastName: "",
                    execTeam: "Senior Staff",
                    execPosition: "",
                    execBiography: "",
                    execLinkedin: "",
                    execEmail: "",
                });
            });
    });
}


// Helper function for editExecutive.
const editExecutiveHelper = (executiveComp, teamComp, url) => {
    const updatedExecutive = {
        imageId: executiveComp.state.imageId,
        firstName: executiveComp.state.firstName,
        lastName: executiveComp.state.lastName,
        team: executiveComp.state.team,
        position: executiveComp.state.position,
        biography: executiveComp.state.biography,
        linkedin: executiveComp.state.linkedin,
        email: executiveComp.state.email
    }

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(updatedExecutive),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                alert("Successfully updated executive");
            } else {
                alert("Could not update executive");
            }
        })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        getAllExecutives(teamComp);
    });
}


// A function to edit a single executive.
export const editExecutive = (executiveComp, teamComp, imageCloudinaryId, id) => {
    const url = "/executiveDatabase/" + id;

    // 1) Check whether editor/administrator wants to update image.
    // If so, delete current image in cloudinary.
    if (document.querySelector("#exec-image-checkbox").checked){
        // Add new poster/image to cloudinary.
        addImage(executiveComp, () => {
            // 2) Edit executive in MongoDB database.
            editExecutiveHelper(executiveComp, teamComp, url)

            // Delete poster/image in cloudinary.
            deleteImage(imageCloudinaryId);
        });
    } else {
        // Edit executive in MongoDB database without modifying image.
        editExecutiveHelper(executiveComp, teamComp, url)
    }
}


// A function to delete a single executive.
export const deleteExecutive = (teamComp, imageCloudinaryId, executiveId) => {
    // 1) Delete poster/image in cloudinary.
    deleteImage(imageCloudinaryId);

    // 2) Remove executive from MongoDB database.
    const url = "/executiveDatabase/" + executiveId;

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
                alert("Successfully deleted executive");
            } else {
                alert("Failed to delete executive");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllExecutives(teamComp);
        });
}
