import React from "react";
import Executive from "../react-components/Team/Executive";
import { addImage, deleteImage } from "../actions/image";

// Functions to help with executives.

// A function to update contents of executive form.
export const updateExecutiveForm = (comp, field) => {
    const value = field.value;
    const name = field.name;

    comp.setState({
        [name]: value
    });
};


// A function to delete the executive headshot.
const deleteImageHelper = async(executive) => {
      const imageURL = "/.netlify/functions/api/imageDatabase/" + executive.imageId;
      const imageRes = await fetch(imageURL);

      if (imageRes.status === 200) {
          const imageJSON = await imageRes.json();
          deleteImage(imageJSON.imageId);
      }
};


// Helper function for getAllExecutives and addExecutive.
const addExecutiveHelper = async(teamComp, executive) => {
    // Retrieve user details including username.
    const userURL = "/.netlify/functions/api/userDatabase/" + executive.userId;

    const userRes = await fetch(userURL);

    if (userRes.status === 200) {
        const userJSON = await userRes.json();

        // Retrieve image cloudinary ID and URL.
        const imageURL = "/.netlify/functions/api/imageDatabase/" + executive.imageId;

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
                    seniorStaffExecs: (teamComp.state.seniorStaffExecs).concat([newExecutive])
                })
            } else if (executive.team === "Conference Committee"){
                teamComp.setState({
                    conferenceExecs: (teamComp.state.conferenceExecs).concat([newExecutive])
                })
            } else if (executive.team === "Marketing"){
                teamComp.setState({
                    marketingExecs: (teamComp.state.marketingExecs).concat([newExecutive])
                })
            } else if (executive.team === "Affairs"){
                teamComp.setState({
                    affairsExecs: (teamComp.state.affairsExecs).concat([newExecutive])
                })
            } else if (executive.team === "Mentorship"){
                teamComp.setState({
                    mentorshipExecs: (teamComp.state.mentorshipExecs).concat([newExecutive])
                })
            } else if (executive.team === "Events"){
                teamComp.setState({
                    eventsExecs: (teamComp.state.eventsExecs).concat([newExecutive])
                })
            } else if (executive.team === "Tech & Innovations"){
                teamComp.setState({
                    techExecs: (teamComp.state.techExecs).concat([newExecutive])
                })
            } else if (executive.team === "Alumni"){
                teamComp.setState({
                    alumniExecs: (teamComp.state.alumniExecs).concat([newExecutive])
                })
            }

        } else {
            alert("Could not get headshot");
        }
    } else {
        alert("Could not get user");
    }
};


// A function to get all executives in the database.
export const getAllExecutives = (teamComp) => {
    const url = "/.netlify/functions/api/executiveDatabase";

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
    const url = "/.netlify/functions/api/executiveDatabase/" + id;

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
    // 1) Add headshot to cloudinary first.
    addImage(teamComp, () => {
        // 2) Add executive to MongoDB database.
        const url = "/.netlify/functions/api/executiveDatabase";

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
                    deleteImageHelper(executive);
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
const editExecutiveHelper = (executiveComp, teamComp, url, imageUpdated, imageCloudinaryId) => {
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

                // Delete old image.
                if (imageUpdated === true){
                    deleteImage(imageCloudinaryId);
                }
            } else {
                alert("Could not update executive");

                // Delete image just uploaded but not added to executive due to mongoose model fail.
                if (imageUpdated === true){
                    deleteImageHelper(updatedExecutive);
                }
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
export const editExecutive = (executiveComp, teamComp, imageCloudinaryId, executiveId) => {
    const url = "/.netlify/functions/api/executiveDatabase/" + executiveId;

    // 1) Check whether editor/administrator wants to update image.
    // If so, delete current image in cloudinary.
    if (document.querySelector("#exec-image-checkbox").checked){
        // Add new headshot to cloudinary.
        addImage(executiveComp, () => {
            // 2) Edit executive in MongoDB database.
            editExecutiveHelper(executiveComp, teamComp, url, true, imageCloudinaryId)
        });
    } else {
        // Edit executive in MongoDB database without modifying image.
        editExecutiveHelper(executiveComp, teamComp, url, false, imageCloudinaryId)
    }
}


// A function to delete a single executive.
export const deleteExecutive = (teamComp, imageCloudinaryId, executiveId) => {
    // 1) Delete headshot in cloudinary.
    deleteImage(imageCloudinaryId);

    // 2) Remove executive from MongoDB database.
    const url = "/.netlify/functions/api/executiveDatabase/" + executiveId;

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
