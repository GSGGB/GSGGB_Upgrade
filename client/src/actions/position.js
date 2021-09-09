import React from "react";
import Position from "../react-components/Admin/PositionsAdmin/Position";

// Functions to help with position titles.

// A function to update contents of position form.
export const updatePositionForm = (comp, field) => {
    const value = field.value;
    const name = field.name;

    comp.setState({
        [name]: value
    });
};

// Exclusive function specifically to populate dropdowns in get involved page.
export const addPositionOptions = (getInvolvedComp) => {
    const url = "/.netlify/functions/api/positionDatabase";

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get all positions");
            }
        })
        .then(json => {
            getInvolvedComp.setState({
                affairsPositions: [],
                conferencePositions: [],
                eventsPositions: [],
                marketingPositions: [],
                mentorshipPositions: [],
                techPositions: [],
                jiggPositions: []
            })

            for (let position of json.positions) {
                // Add to appropriate array depending on corresponding team.
                if (position.team === "Affairs"){
                    getInvolvedComp.setState({
                        affairsPositions: [position.title].concat(getInvolvedComp.state.affairsPositions)
                    })
                } else if (position.team === "Conference Committee"){
                    getInvolvedComp.setState({
                        conferencePositions: [position.title].concat(getInvolvedComp.state.conferencePositions)
                    })
                } else if (position.team === "Events"){
                    getInvolvedComp.setState({
                        eventsPositions: [position.title].concat(getInvolvedComp.state.eventsPositions)
                    })
                } else if (position.team === "Marketing"){
                    getInvolvedComp.setState({
                        marketingPositions: [position.title].concat(getInvolvedComp.state.marketingPositions)
                    })
                } else if (position.team === "Mentorship"){
                    getInvolvedComp.setState({
                        mentorshipPositions: [position.title].concat(getInvolvedComp.state.mentorshipPositions)
                    })
                } else if (position.team === "Tech & Innovations"){
                    getInvolvedComp.setState({
                        techPositions: [position.title].concat(getInvolvedComp.state.techPositions)
                    })
                } else if (position.team === "JIGG"){
                    getInvolvedComp.setState({
                        jiggPositions: [position.title].concat(getInvolvedComp.state.jiggPositions)
                    })
                }
            }

            // Retrieve the date added of the most recent position title added.
            getInvolvedComp.setState({
                lastUpdated: (json.positions[(json.positions).length - 1]).dateAdded
            })

        })
        .catch(error => {
            console.log(error);
        });
}

// Helper function for getAllPositions and addPosition.
const addPositionHelper = (positionsAdminComp, position) => {
    const newPosition = <Position
                            positionsAdminComp={positionsAdminComp}
                            positionId={position._id}
                            team={position.team}
                            title={position.title}
                            dateAdded={position.dateAdded}
                        ></Position>

    // Add to appropriate array depending on corresponding team.
    if (position.team === "Affairs"){
        positionsAdminComp.setState({
            affairsPositions: [newPosition].concat(positionsAdminComp.state.affairsPositions)
        })
    } else if (position.team === "Conference Committee"){
        positionsAdminComp.setState({
            conferencePositions: [newPosition].concat(positionsAdminComp.state.conferencePositions)
        })
    } else if (position.team === "Events"){
        positionsAdminComp.setState({
            eventsPositions: [newPosition].concat(positionsAdminComp.state.eventsPositions)
        })
    } else if (position.team === "Marketing"){
        positionsAdminComp.setState({
            marketingPositions: [newPosition].concat(positionsAdminComp.state.marketingPositions)
        })
    } else if (position.team === "Mentorship"){
        positionsAdminComp.setState({
            mentorshipPositions: [newPosition].concat(positionsAdminComp.state.mentorshipPositions)
        })
    } else if (position.team === "Tech & Innovations"){
        positionsAdminComp.setState({
            techPositions: [newPosition].concat(positionsAdminComp.state.techPositions)
        })
    } else if (position.team === "JIGG"){
        positionsAdminComp.setState({
            jiggPositions: [newPosition].concat(positionsAdminComp.state.jiggPositions)
        })
    }
};

// A function to get all positions in the database.
export const getAllPositions = (positionsAdminComp) => {
    const url = "/.netlify/functions/api/positionDatabase";

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get all positions");
            }
        })
        .then(json => {
            positionsAdminComp.setState({
                affairsPositions: [],
                conferencePositions: [],
                eventsPositions: [],
                marketingPositions: [],
                mentorshipPositions: [],
                techPositions: [],
                jiggPositions: []
            })

            for (let position of json.positions) {
                addPositionHelper(positionsAdminComp, position);
            }
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to add a position.
export const addPosition = (positionsAdminComp) => {
    const position = {
        team: positionsAdminComp.state.positionTeam,
        title: positionsAdminComp.state.positionTitle
    };

    const url = "/.netlify/functions/api/positionDatabase";

    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(position),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                alert("Successfully added position");
                return res.json();
            } else {
                alert("Could not add position");
            }
        })
        .then(json => {
            addPositionHelper(positionsAdminComp, json);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            // Reset state variables.
            positionsAdminComp.setState({
                positionTeam: "Affairs",
                positionTitle: ""
            });
        });
}


// A function to delete a position.
export const deletePosition = (positionsAdminComp, id) => {
    const url = "/.netlify/functions/api/positionDatabase/" + id;

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
                alert("Successfully deleted position");
            } else {
                alert("Failed to delete position");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllPositions(positionsAdminComp);
        });
}
