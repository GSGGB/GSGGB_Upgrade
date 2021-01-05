import React from "react";
import Announcement from "../react-components/HomePage/Announcement";

// Functions to help with announcements.

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
                alert("Could not get announcements");
            }
        })
        .then(json => {
            homepageComp.setState({announcements: []})
            for (let announcement of json.announcements) {
                const newAnnouncement = <Announcement
                                            homepageComp={homepageComp}
                                            announcementId={announcement._id}
                                            userId={announcement.userId}
                                            content={announcement.content}
                                            date={announcement.date}
                                        ></Announcement>
                homepageComp.setState({
                    announcements: [newAnnouncement].concat(homepageComp.state.announcements)
                })
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
                existingContent: json.content
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
        method: "post",
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
                return res.json();
            } else {
                alert("Could not add announcement");
            }
        })
        .then(json => {
            const newAnnouncement = <Announcement
                                        homepageComp={homepageComp}
                                        announcementId={json._id}
                                        userId={json.userId}
                                        content={json.content}
                                        date={json.date}
                                    ></Announcement>
            homepageComp.setState({
                announcements: [newAnnouncement].concat(homepageComp.state.announcements)
            })
        })
        .catch(error => {
            console.log(error);
        });
}


export const editAnnouncement = (announcementComp, homepageComp, id) => {
    const url = "/announcementDatabase/" + id;

    const updatedAnnouncement = {
        content: announcementComp.state.updatedContent
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
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not update announcement");
            }
        })

    getAllAnnouncements(homepageComp);
}


export const deleteAnnouncement = (homepageComp, id) => {
    const url = "/announcementDatabase/" + id;

    const request = new Request(url, {
        method: "delete",
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
                console.log("Successfully deleted announcement");
            } else {
                console.log("Failed to delete announcement");
            }
        })
        .catch(error => {
            console.log(error);
        });

    getAllAnnouncements(homepageComp);
}