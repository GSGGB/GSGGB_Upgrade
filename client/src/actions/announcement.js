import React from "react";
import Announcement from "../react-components/HomePage/Announcement";

// Functions to help with announcements.

// A function to update announcement or research content.
export const updateContent = (homepageComp, field) => {
    const value = field.value;
    const name = field.name;

    homepageComp.setState({
        [name]: value
    });
};


// A function to retrieve all announcements in the database.
export const getAnnouncements = (homepageComp) => {
    // the URL for the request
    const url = "/announcementDatabase";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get announcements");
            }
        })
        .then(json => {
            console.log(json)
            homepageComp.setState({announcements: []})
            for (let announcement of json.announcements) {
                const newAnnouncement = <Announcement
                                            userId={announcement.userId}
                                            announcementContent={announcement.content}
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

    // Since this is a GET request, simply call fetch on the URL
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
                                        userId={json.userId}
                                        announcementContent={json.content}
                                    ></Announcement>
            homepageComp.setState({
                announcements: [newAnnouncement].concat(homepageComp.state.announcements)
            })
        })
        .catch(error => {
            console.log(error);
        });
}
