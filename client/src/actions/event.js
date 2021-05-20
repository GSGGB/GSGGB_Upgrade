import React from "react";
import Event from "../react-components/Events/Event";
import { addImage, deleteImage } from "../actions/image";

// Functions to help with events.

// A function to get the uploaded image file.
export const updateImageFile = (comp, field) => {
    comp.setState({
        imageFile: field.files[0]
    })
}

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
                alert("Could not get events");
            }
        })
        .then(json => {
            eventsComp.setState({gEvents: []})
            for (let gEvent of json.gEvents) {
                const newEvent = <Event
                                    eventsComp={eventsComp}
                                    eventId={gEvent._id}
                                    userId={gEvent.userId}
                                    imageId={gEvent.imageId}
                                    content={gEvent.content}
                                    date={gEvent.date}
                                  ></Event>
                eventsComp.setState({
                    gEvents: [newEvent].concat(eventsComp.state.gEvents)
                })
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
                    return res.json();
                } else {
                    alert("Could not add event");
                }
            })
            .then(json => {
                const newEvent = <Event
                                    eventsComp={eventsComp}
                                    eventId={json._id}
                                    userId={json.userId}
                                    imageId={json.imageId}
                                    content={json.content}
                                    date={json.date}
                                ></Event>
                eventsComp.setState({
                    gEvents: [newEvent].concat(eventsComp.state.gEvents)
                })
            })
            .catch(error => {
                console.log(error);
            });
    });
}


// A function to edit a single event.
export const editEvent = (singleEventComp, eventsComp, id) => {
    let newImageId;

    // 1) Check whether editor/administrator wants to update image.
    // If so, delete current image in cloudinary.
    if (singleEventComp.state.imageCheckbox){
        // Delete poster/image in cloudinary.
        deleteImage(singleEventComp.state.existingImageId);
        // Add new poster/image to cloudinary.
        addImage(singleEventComp);

        newImageId = singleEventComp.imageId;
    }else {
        newImageId = singleEventComp.existingImageId;
    }

    // 2) Edit event in MongoDB database.
    const url = "/eventDatabase/" + id;

    const updatedEvent = {
        imageId: newImageId,
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
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not update event");
            }
        })

    getAllEvents(eventsComp);
}


// A function to delete a single event.
export const deleteEvent = (eventsComp, imageId, eventId) => {
    // 1) Delete poster/image in cloudinary first.
    deleteImage(imageId);

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
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                console.log("Successfully deleted event");
            } else {
                console.log("Failed to delete event");
            }
        })
        .catch(error => {
            console.log(error);
        });

    getAllEvents(eventsComp);
}
