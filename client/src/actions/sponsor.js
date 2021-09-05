import React from "react";
import Sponsor from "../react-components/Sponsors/Sponsor";
import { addImage, deleteImage } from "../actions/image";

// Functions to help with sponsors.

// A function to update contents of sponsor form.
export const updateSponsorForm = (comp, field) => {
    const value = field.value;
    const name = field.name;

    comp.setState({
        [name]: value
    });
};


// A function to delete the sponsor logo.
const deleteImageHelper = async(sponsor) => {
      const imageURL = "/api/imageDatabase/" + sponsor.imageId;
      const imageRes = await fetch(imageURL);

      if (imageRes.status === 200) {
          const imageJSON = await imageRes.json();
          deleteImage(imageJSON.imageId);
      }
};


// Helper function for getAllSponsors and addSponsor.
const addSponsorHelper = async(sponsorsComp, sponsor) => {
    // Retrieve user details including username.
    const userURL = "/api/userDatabase/" + sponsor.userId;

    const userRes = await fetch(userURL);

    if (userRes.status === 200) {
        const userJSON = await userRes.json();

        // Retrieve image cloudinary ID and URL.
        const imageURL = "/api/imageDatabase/" + sponsor.imageId;

        const imageRes = await fetch(imageURL);

        if (imageRes.status === 200) {
            const imageJSON = await imageRes.json();

            const newSponsor = <Sponsor
                                    sponsorsComp={sponsorsComp}
                                    sponsorId={sponsor._id}
                                    username={userJSON.username}
                                    imageCloudinaryId={imageJSON.imageId}
                                    imageURL={imageJSON.imageURL}
                                    type={sponsor.type}
                                    name={sponsor.name}
                                    link={sponsor.link}
                                    date={sponsor.date}
                                    width={sponsor.width}
                                    height={sponsor.height}
                                    marginLeft={sponsor.marginLeft}
                                    marginRight={sponsor.marginRight}
                                    marginTop={sponsor.marginTop}
                                    marginBottom={sponsor.marginBottom}
                                ></Sponsor>

            // Add to appropriate array depending on team.
            if (sponsor.type === "Platinum"){
                sponsorsComp.setState({
                    platinumSponsors: (sponsorsComp.state.platinumSponsors).concat([newSponsor])
                })
            } else if (sponsor.type === "Gold"){
                sponsorsComp.setState({
                    goldSponsors: (sponsorsComp.state.goldSponsors).concat([newSponsor])
                })
            } else if (sponsor.type === "Silver"){
                sponsorsComp.setState({
                    silverSponsors: (sponsorsComp.state.silverSponsors).concat([newSponsor])
                })
            } else if (sponsor.type === "Bronze"){
                sponsorsComp.setState({
                    bronzeSponsors: (sponsorsComp.state.bronzeSponsors).concat([newSponsor])
                })
            } else if (sponsor.type === "Partner"){
                sponsorsComp.setState({
                    partners: (sponsorsComp.state.partners).concat([newSponsor])
                })
            } else if (sponsor.type === "Special"){
                sponsorsComp.setState({
                    special: (sponsorsComp.state.special).concat([newSponsor])
                })
            }

        } else {
            alert("Could not get image");
        }
    } else {
        alert("Could not get user");
    }
};


// A function to get all sponsors in the database.
export const getAllSponsors = (sponsorsComp) => {
    const url = "/api/sponsorDatabase";

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get all sponsors");
            }
        })
        .then(async json => {
            sponsorsComp.setState({
                platinumSponsors: [],
                goldSponsors: [],
                silverSponsors: [],
                bronzeSponsors: [],
                partners: [],
                special: []
            })

            for (let sponsor of json.allSponsors) {
                await addSponsorHelper(sponsorsComp, sponsor);
            }
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to get a specific sponsor by their id to update.
export const getSponsorById = (singleSponsorComp, id) => {
    const url = "/api/sponsorDatabase/" + id;

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get sponsor");
            }
        })
        .then(json => {
            // Get existing sponsor details.
            singleSponsorComp.setState({
                displayModal: true,
                imageId: json.imageId,
                type: json.type,
                name: json.name,
                link: json.link,
                width: json.width,
                height: json.height,
                marginLeft: json.marginLeft,
                marginRight: json.marginRight,
                marginTop: json.marginTop,
                marginBottom: json.marginBottom
            });
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to add a single sponsor.
export const addSponsor = (sponsorsComp) => {
    // 1) Add poster/image to cloudinary first.
    addImage(sponsorsComp, () => {
        // 2) Add sponsor to MongoDB database.
        const url = "/api/sponsorDatabase";

        const sponsor = {
            imageId: sponsorsComp.state.imageId,
            type: sponsorsComp.state.sponsorType,
            name: sponsorsComp.state.sponsorName,
            link: sponsorsComp.state.sponsorLink,
            width: sponsorsComp.state.logoWidth,
            height: sponsorsComp.state.logoHeight,
            marginLeft: sponsorsComp.state.logoMarginLeft,
            marginRight: sponsorsComp.state.logoMarginRight,
            marginTop: sponsorsComp.state.logoMarginTop,
            marginBottom: sponsorsComp.state.logoMarginBottom
        };

        const request = new Request(url, {
            method: "POST",
            body: JSON.stringify(sponsor),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });

        // Send the request with fetch()
        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    alert("Successfully added sponsor");
                    return res.json();
                } else {
                    alert("Could not add sponsor");
                    deleteImageHelper(sponsor);
                }
            })
            .then(json => {
                addSponsorHelper(sponsorsComp, json);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                // Reset state variables.
                sponsorsComp.setState({
                    imageFile: "",
                    imageId: "",
                    sponsorType: "Platinum", // Default option.
                    sponsorName: "",
                    sponsorLink: "",
                    logoWidth: 0,
                    logoHeight: 0,
                    logoMarginLeft: 0,
                    logoMarginRight: 0,
                    logoMarginTop: 0,
                    logoMarginBottom: 0
                });
            });
    });
}


// Helper function for editSponsor.
const editSponsorHelper = (singleSponsorComp, sponsorsComp, url, imageUpdated, imageCloudinaryId) => {
    const updatedSponsor = {
        imageId: singleSponsorComp.state.imageId,
        type: singleSponsorComp.state.type,
        name: singleSponsorComp.state.name,
        link: singleSponsorComp.state.link,
        width: singleSponsorComp.state.width,
        height: singleSponsorComp.state.height,
        marginLeft: singleSponsorComp.state.marginLeft,
        marginRight: singleSponsorComp.state.marginRight,
        marginTop: singleSponsorComp.state.marginTop,
        marginBottom: singleSponsorComp.state.marginBottom
    }

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(updatedSponsor),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                alert("Successfully updated sponsor");

                // Delete old image.
                if (imageUpdated === true){
                    deleteImage(imageCloudinaryId);
                }
            } else {
                alert("Could not update sponsor");

                // Delete image just uploaded but not added to sponsor due to mongoose model fail.
                if (imageUpdated === true){
                    deleteImageHelper(updatedSponsor);
                }
            }
        })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        getAllSponsors(sponsorsComp);
    });
}


// A function to edit a single sponsor.
export const editSponsor = (singleSponsorComp, sponsorsComp, imageCloudinaryId, sponsorId) => {
    const url = "/api/sponsorDatabase/" + sponsorId;

    // 1) Check whether editor/administrator wants to update image.
    // If so, delete current image in cloudinary.
    if (document.querySelector("#sponsor-image-checkbox").checked){
        // Add new poster/image to cloudinary.
        addImage(singleSponsorComp, () => {
            // 2) Edit sponsor in MongoDB database.
            editSponsorHelper(singleSponsorComp, sponsorsComp, url, true, imageCloudinaryId)
        });
    } else {
        // Edit sponsor in MongoDB database without modifying image.
        editSponsorHelper(singleSponsorComp, sponsorsComp, url, false, imageCloudinaryId)
    }
}


// A function to delete a single sponsor.
export const deleteSponsor = (sponsorsComp, imageCloudinaryId, sponsorId) => {
    // 1) Delete poster/image in cloudinary.
    deleteImage(imageCloudinaryId);

    // 2) Remove sponsor from MongoDB database.
    const url = "/api/sponsorDatabase/" + sponsorId;

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
                alert("Successfully deleted sponsor");
            } else {
                alert("Failed to delete sponsor");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllSponsors(sponsorsComp);
        });
}
