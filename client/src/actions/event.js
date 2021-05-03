import React from "react";
import Event from "../react-components/Events/Event";

// Functions to help with events.

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
            for (let gEvent of json.events) {
                const newEvent = <Event
                                    eventsComp={eventsComp}
                                    eventId={gEvent._id}
                                    userId={gEvent.userId}
                                    imageURL={gEvent.imageURL}
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
            singleEventComp.setState({
                displayModal: true,
                existingImageURL: json.imageURL,
                existingContent: json.content
            });
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to add a single event.
export const addEvent = (eventsComp) => {
    const gEvent = {
        imageURL: eventsComp.state.eventImageURL,
        content: eventsComp.state.eventContent
    };

    const url = "/eventDatabase";

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
                                imageURL={json.imageURL}
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
}


// A function to edit a single event.
export const editEvent = (singleEventComp, eventsComp, id) => {
    const url = "/eventDatabase/" + id;

    const updatedEvent = {
        imageURL: singleEventComp.state.updatedImageURL,
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
export const deleteEvent = (eventsComp, id) => {
    const url = "/eventDatabase/" + id;

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
