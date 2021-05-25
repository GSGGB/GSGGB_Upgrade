import React from "react";
import Event from "../react-components/Events/Event";
import { addImage, deleteImage } from "../actions/image";

// Functions to help with events.

// Helper function for getAllEvents and addEvent.
const addEventHelper = async(eventsComp, gEvent, dateToday) => {
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
                                imageCloudinaryId={imageJSON.imageId}
                                imageURL={imageJSON.imageURL}
                                imageOrientation={gEvent.imageOrientation}
                                type={gEvent.type}
                                title={gEvent.title}
                                date={gEvent.date}
                                startTime={gEvent.startTime}
                                endTime={gEvent.endTime}
                                location={gEvent.location}
                                content={gEvent.content}
                                fbEventLink={gEvent.fbEventLink}
                                eventbriteLink={gEvent.eventbriteLink}
                                zoomLink={gEvent.zoomLink}
                                lastUpdated={gEvent.lastUpdated}
                              ></Event>

            // Past event.
            if (new Date(gEvent.date) < dateToday){
                eventsComp.setState({
                    pastEvents: [newEvent].concat(eventsComp.state.pastEvents)
                })
            // Upcoming event.
            } else {
                eventsComp.setState({
                    upcomingEvents: [newEvent].concat(eventsComp.state.upcomingEvents)
                })
            }

        } else {
            alert("Could not get image");
        }
    } else {
        alert("Could not get user");
    }
};

// A function to update contents of event form.
export const updateEventForm = (comp, field) => {
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
            eventsComp.setState({ upcomingEvents: [] })
            eventsComp.setState({ pastEvents: [] })
            const dateToday = new Date();

            for (let gEvent of json.allEvents) {
                await addEventHelper(eventsComp, gEvent, dateToday);
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
            // Get existing event details.
            singleEventComp.setState({
                displayModal: true,
                imageId: json.imageId,
                imageOrientation: json.imageOrientation,
                type: json.type,
                title: json.title,
                date: json.date,
                startTime: json.startTime,
                endTime: json.endTime,
                location: json.location,
                content: json.content,
                fbEventLink: json.fbEventLink,
                eventbriteLink: json.eventbriteLink,
                zoomLink: json.zoomLink
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
            imageOrientation: eventsComp.state.eventImageOrientation,
            type: eventsComp.state.eventType,
            title: eventsComp.state.eventTitle,
            date: eventsComp.state.eventDate,
            startTime: eventsComp.state.eventStartTime,
            endTime: eventsComp.state.eventEndTime,
            location: eventsComp.state.eventLocation,
            content: eventsComp.state.eventContent,
            fbEventLink: eventsComp.state.fbEventLink,
            eventbriteLink: eventsComp.state.eventbriteLink,
            zoomLink: eventsComp.state.zoomLink
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
                const dateToday = new Date();
                addEventHelper(eventsComp, json, dateToday);
            })
            .catch(error => {
                console.log(error);
            });
    });
}


// Helper function for editEvent.
const editEventHelper = (singleEventComp, eventsComp, url) => {
    const updatedEvent = {
        imageId: singleEventComp.state.imageId,
        imageOrientation: singleEventComp.state.imageOrientation,
        type: singleEventComp.state.type,
        title: singleEventComp.state.title,
        date: singleEventComp.state.date,
        startTime: singleEventComp.state.startTime,
        endTime: singleEventComp.state.endTime,
        location: singleEventComp.state.location,
        content: singleEventComp.state.content,
        fbEventLink: singleEventComp.state.fbEventLink,
        eventbriteLink: singleEventComp.state.eventbriteLink,
        zoomLink: singleEventComp.state.zoomLink
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


// A function to edit a single event.
export const editEvent = (singleEventComp, eventsComp, imageCloudinaryId, id) => {
    const url = "/eventDatabase/" + id;

    // 1) Check whether editor/administrator wants to update image.
    // If so, delete current image in cloudinary.
    if (document.querySelector("#event-image-checkbox").checked){
        // Add new poster/image to cloudinary.
        addImage(singleEventComp, () => {
            // 2) Edit event in MongoDB database.
            editEventHelper(singleEventComp, eventsComp, url)

            // Delete poster/image in cloudinary.
            deleteImage(imageCloudinaryId);
        });
    } else {
        // Edit event in MongoDB database without modifying image.
        editEventHelper(singleEventComp, eventsComp, url)
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
