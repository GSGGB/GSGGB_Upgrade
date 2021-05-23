import React from "react";
import Event from "../react-components/Events/Event";
import { addImage, deleteImage } from "../actions/image";

// Functions to help with events.

// Helper function for getAllEvents and addEvent.
const addEventHelper = async(eventsComp, gEvent) => {
    // Retrieve user details including username and full name.
    const userURL = "/userDatabase/" + gEvent.userId;

    const userRes = await fetch(userURL);

    if (userRes.status === 200) {
        const userJSON = await userRes.json();

        // Retrieve image cloudinary ID and URL.
        const imageURL = "/imageDatabase/" + gEvent.imageId;

        const imageRes = await fetch(imageURL);

        if (imageRes.status === 200) {
            const imageJSON = await imageRes.json();

            const newEvent = <Event
                                eventsComp={eventsComp}
                                eventId={gEvent._id}
                                username={userJSON.username}
                                fullName={userJSON.firstName + " " + userJSON.lastName}
                                execPosition={userJSON.execPosition}
                                headshot={userJSON.firstName + ".jpg"}
                                imageCloudinaryId={imageJSON.imageId}
                                imageURL={imageJSON.imageURL}
                                content={gEvent.content}
                                date={gEvent.date}
                              ></Event>
            eventsComp.setState({
                gEvents: [newEvent].concat(eventsComp.state.gEvents)
            })
        } else {
            alert("Could not get image");
        }
    } else {
        alert("Could not get user");
    }
};

// A function to update event content.
export const updateEventContent = (comp, field) => {
    const value = field.value;
    const name = field.name;

    comp.setState({
        [name]: value
    });
};


// A function to get all events in the database.
export const getAllEvents = (eventsComp) => {
    const url = "/eventDatabase";

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get all events");
            }
        })
        .then(async json => {
            eventsComp.setState({gEvents: []})

            for (let gEvent of json.gEvents) {
                await addEventHelper(eventsComp, gEvent);
            }
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to get a specific event by their id to update.
export const getEventById = (singleEventComp, id) => {
    const url = "/eventDatabase/" + id;

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get event");
            }
        })
        .then(json => {
            // Get existing image ID and content.
            singleEventComp.setState({
                displayModal: true,
                existingImageId: json.imageId,
                existingContent: json.content
            });
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to add a single event.
export const addEvent = (eventsComp) => {
    // 1) Add poster/image to cloudinary first.
    addImage(eventsComp, () => {
        // 2) Add event to MongoDB database.
        const url = "/eventDatabase";

        const gEvent = {
            imageId: eventsComp.state.imageId,
            content: eventsComp.state.eventContent
        };

        const request = new Request(url, {
            method: "POST",
            body: JSON.stringify(gEvent),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });

        // Send the request with fetch()
        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    alert("Successfully added event");
                    return res.json();
                } else {
                    alert("Could not add event");
                }
            })
            .then(json => {
                addEventHelper(eventsComp, json);
            })
            .catch(error => {
                console.log(error);
            });
    });
}


// A function to edit a single event.
export const editEvent = (singleEventComp, eventsComp, imageCloudinaryId, id) => {
    const url = "/eventDatabase/" + id;

    // 1) Check whether editor/administrator wants to update image.
    // If so, delete current image in cloudinary.
    if (document.querySelector("#eventImageCheckbox").checked){
        // Delete poster/image in cloudinary.
        deleteImage(imageCloudinaryId);
        // Add new poster/image to cloudinary.
        addImage(singleEventComp, () => {
            // 2) Edit event in MongoDB database.
            const updatedEvent = {
                imageId: singleEventComp.state.imageId,
                content: singleEventComp.state.updatedContent
            }

            const request = new Request(url, {
                method: "PATCH",
                body: JSON.stringify(updatedEvent),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })

            fetch(request)
                .then(res => {
                    if (res.status === 200) {
                        alert("Successfully updated event");
                    } else {
                        alert("Could not update event");
                    }
                })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                getAllEvents(eventsComp);
            });
        });
    } else {
        // 2) Edit event in MongoDB database.
        const updatedEvent = {
            imageId: singleEventComp.state.existingImageId,
            content: singleEventComp.state.updatedContent
        }

        const request = new Request(url, {
            method: "PATCH",
            body: JSON.stringify(updatedEvent),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })

        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    alert("Successfully updated event");
                } else {
                    alert("Could not update event");
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                getAllEvents(eventsComp);
            });
    }
}


// A function to delete a single event.
export const deleteEvent = (eventsComp, imageCloudinaryId, eventId) => {
    // 1) Delete poster/image in cloudinary.
    deleteImage(imageCloudinaryId);

    // 2) Remove event from MongoDB database.
    const url = "/eventDatabase/" + eventId;

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
                alert("Successfully deleted event");
            } else {
                alert("Failed to delete event");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllEvents(eventsComp);
        });
}
