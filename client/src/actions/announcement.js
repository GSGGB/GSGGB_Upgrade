import React from "react";
import Announcement from "../react-components/HomePage/Announcement";

// Functions to help with announcements.

// Helper function for getAllAnnouncements and addAnnouncement.
const addAnnouncementHelper = async(homepageComp, announcement) => {
    // Retrieve user details including username and full name.
    const url = "/userDatabase/" + announcement.userId;

    const res = await fetch(url);

    if (res.status === 200) {
        const json = await res.json();

        const newAnnouncement = <Announcement
                                    homepageComp={homepageComp}
                                    announcementId={announcement._id}
                                    username={json.username}
                                    fullName={json.firstName + " " + json.lastName}
                                    executivePosition={json.executivePosition}
                                    headshot={json.firstName + ".jpg"}
                                    content={announcement.content}
                                    date={announcement.date}
                                ></Announcement>
        homepageComp.setState({
            announcements: [newAnnouncement].concat(homepageComp.state.announcements)
        })
    } else {
        alert("Could not get user");
    }
};

// A function to update announcement content.
export const updateAnnouncementContent = (comp, field) => {
    const value = field.value;
    const name = field.name;

    comp.setState({
        [name]: value
    });
};

// A function to get all announcements in the database.
export const getAllAnnouncements = (homepageComp) => {
    const url = "/announcementDatabase";

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get all announcements");
            }
        })
        .then(async json => {
            homepageComp.setState({announcements: []})

            for (let announcement of json.announcements) {
                await addAnnouncementHelper(homepageComp, announcement);
            }
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to get a specific announcement by their id to update.
export const getAnnouncementById = (announcementComp, id) => {
    const url = "/announcementDatabase/" + id;

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get announcement");
            }
        })
        .then(json => {
            announcementComp.setState({
                displayModal: true,
                content: json.content
            });
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to add an announcement.
export const addAnnouncement = (homepageComp) => {
    const announcement = {
        content: homepageComp.state.announcementContent
    };

    const url = "/announcementDatabase";

    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(announcement),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                alert("Successfully added announcement");
                return res.json();
            } else {
                alert("Could not add announcement");
            }
        })
        .then(json => {
            addAnnouncementHelper(homepageComp, json);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            // Reset state variable.
            homepageComp.setState({
                announcementContent: ""
            });
        });
}


// A function to edit an announcement.
export const editAnnouncement = (announcementComp, homepageComp, id) => {
    const url = "/announcementDatabase/" + id;

    const updatedAnnouncement = {
        content: announcementComp.state.content
    }

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(updatedAnnouncement),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                alert("Successfully updated announcement");
            } else {
                alert("Could not update announcement");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllAnnouncements(homepageComp);
        });
}


// A function to delete an announcement.
export const deleteAnnouncement = (homepageComp, id) => {
    const url = "/announcementDatabase/" + id;

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
                alert("Successfully deleted announcement");
            } else {
                alert("Failed to delete announcement");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllAnnouncements(homepageComp);
        });
}
