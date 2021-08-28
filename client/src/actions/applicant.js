import React from "react";
import Applicant from "../react-components/Admin/ApplicationsAdmin/Applicant";
import { addResume, deleteResume } from "../actions/resume";

// Functions to help with potential applicants.

// A function to update contents of applicant form.
export const updateApplicantForm = (comp, field) => {
    const value = field.value;
    const name = field.name;

    comp.setState({
        [name]: value
    });
};


// A function to delete an applicant's resume.
const deleteResumeHelper = async(applicant) => {
      const resumeURL = "/resumeDatabase/" + applicant.resumeId;
      const resumeRes = await fetch(resumeURL);

      if (resumeRes.status === 200) {
          const resumeJSON = await resumeRes.json();
          deleteResume(resumeJSON.resumeId);
      }
};


// Helper function for getAllApplicants and sendApplication.
const addApplicantHelper = async(applicationsAdminComp, applicant) => {
    // Retrieve resume cloudinary ID and URL.
    const resumeURL = "/resumeDatabase/" + applicant.resumeId;

    const resumeRes = await fetch(resumeURL);

    if (resumeRes.status === 200) {
        const resumeJSON = await resumeRes.json();

        const newApplicant = <Applicant
                                  applicantId={applicant._id}
                                  resumeCloudinaryId={resumeJSON.resumeId}
                                  resumeURL={resumeJSON.resumeURL}
                                  fullName={applicant.fullName}
                                  email={applicant.email}
                                  year={applicant.year}
                                  program={applicant.program}
                                  fridays={applicant.fridays}
                                  position={applicant.position}
                                  otherPositions={applicant.otherPositions}
                                  statement={applicant.statement}
                                  viewed={applicant.viewed}
                              ></Applicant>

        // Add to appropriate array depending on interested team.
        if (applicant.team === "Affairs"){
            applicationsAdminComp.setState({
                affairsApplicants: (applicationsAdminComp.state.affairsApplicants).concat([newApplicant])
            })
        } else if (applicant.team === "Conference Committee"){
            applicationsAdminComp.setState({
                conferenceApplicants: (applicationsAdminComp.state.conferenceApplicants).concat([newApplicant])
            })
        } else if (applicant.team === "Events"){
            applicationsAdminComp.setState({
                eventsApplicants: (applicationsAdminComp.state.eventsApplicants).concat([newApplicant])
            })
        } else if (applicant.team === "Marketing"){
            applicationsAdminComp.setState({
                marketingApplicants: (applicationsAdminComp.state.marketingApplicants).concat([newApplicant])
            })
        } else if (applicant.team === "Mentorship"){
            applicationsAdminComp.setState({
                mentorshipApplicants: (applicationsAdminComp.state.mentorshipApplicants).concat([newApplicant])
            })
        } else if (applicant.team === "Tech & Innovations"){
            applicationsAdminComp.setState({
                techApplicants: (applicationsAdminComp.state.techApplicants).concat([newApplicant])
            })
        }

    } else {
        alert("Could not retrieve resume");
    }
};


// A function to get all applicants in the database.
export const getAllApplicants = (applicationsAdminComp) => {
    const url = "/applicantDatabase";

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get all applicants");
            }
        })
        .then(async json => {
            applicationsAdminComp.setState({
                affairsApplicants: [],
                conferenceApplicants: [],
                eventsApplicants: [],
                marketingApplicants: [],
                mentorshipApplicants: [],
                techApplicants: []
            })

            for (let applicant of json.applicants) {
                await addApplicantHelper(applicationsAdminComp, applicant);
            }
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to get a specific applicant by their id to update.
export const getApplicantById = (applicationsAdminComp, id) => {
    const url = "/applicantDatabase/" + id;

    // Since this is a GET request, simply call fetch on the URL.
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // Return a promise that resolves with the JSON body.
                return res.json();
            } else {
                alert("Could not get applicant");
            }
        })
        .then(json => {
            // Get existing applicant details.
            applicationsAdminComp.setState({
                resumeId: json.resumeId,
                fullName: json.applicantfullName,
                email: json.applicantEmail,
                year: json.applicantYear,
                program: json.applicantProgram,
                fridays: json.applicantFridays,
                team: json.applicantTeam,
                position: json.applicantPosition,
                otherPositions: json.applicantOtherPositions,
                statement: json.applicantStatement,
                viewed: json.viewed
            });
        })
        .catch(error => {
            console.log(error);
        });
}


// A function to store a potential applicant's information to the database.
export const sendApplication = (getInvolvedComp) => {
    // 1) Add resume to cloudinary first.
    addResume(getInvolvedComp, () => {
        // 2) Add application to MongoDB database.
        const url = "/applicantDatabase";

        const applicant = {
            resumeId: getInvolvedComp.state.resumeId,
            fullName: getInvolvedComp.state.applicantFullName,
            email: getInvolvedComp.state.applicantEmail,
            year: getInvolvedComp.state.applicantYear,
            program: getInvolvedComp.state.applicantProgram,
            fridays: getInvolvedComp.state.applicantFridays,
            team: getInvolvedComp.state.applicantTeam,
            position: getInvolvedComp.state.applicantPosition,
            otherPositions: getInvolvedComp.state.applicantOtherPositions,
            statement: getInvolvedComp.state.applicantStatement,
            viewed: false
        };

        const request = new Request(url, {
            method: "POST",
            body: JSON.stringify(applicant),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });

        // Send the request with fetch()
        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    alert("Successfully sent application.");
                } else {
                    alert("Could not send application. Please try again.");
                    deleteResumeHelper(applicant);
                }
            })
            .catch(error => {
                console.log(error);
            })
    });
};


// A function to delete an application.
export const deleteApplication = async(applicationsAdminComp, imageCloudinaryId, applicantId) => {
    // 1) Delete resume in cloudinary.
    deleteResume(imageCloudinaryId);

    // 2) Remove application from MongoDB database.
    const url = "/applicantDatabase/" + applicantId;

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
                alert("Successfully deleted application");
            } else {
                alert("Failed to delete application");
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            getAllApplicants(applicationsAdminComp);
        });
}


// A function to specify confirmed viewing of application.
export const viewConfirmed = async(applicationsAdminComp, id) => {
    const url = "/applicantDatabase/" + id;

    const applicantRes = await fetch(url);

    if (applicantRes.status === 200) {
        // Return a promise that resolves with the JSON body.
        const json = await applicantRes.json();

        const confirmedApplicant = {
            resumeId: json.resumeId,
            fullName: json.applicantfullName,
            email: json.applicantEmail,
            year: json.applicantYear,
            program: json.applicantProgram,
            fridays: json.applicantFridays,
            team: json.applicantTeam,
            position: json.applicantPosition,
            otherPositions: json.applicantOtherPositions,
            statement: json.applicantStatement,
            viewed: true
        }

        const request = new Request(url, {
            method: "PATCH",
            body: JSON.stringify(confirmedApplicant),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })


        const confirmedApplicantRes = await fetch(request);

        if (confirmedApplicantRes.status === 200) {
            alert("Successfully confirmed viewing of applicant");
        } else {
            alert("Could not confirm viewing of applicant");
        }
    } else {
        alert("Could not find applicant");
    }

    getAllApplicants(applicationsAdminComp);
}


// A function to specify unconfirmed viewing of application.
export const viewUnconfirmed = async(applicationsAdminComp, id) => {
    const url = "/applicantDatabase/" + id;

    const applicantRes = await fetch(url);

    if (applicantRes.status === 200) {
        // Return a promise that resolves with the JSON body.
        const json = await applicantRes.json();

        const unconfirmedApplicant = {
            resumeId: json.resumeId,
            fullName: json.applicantfullName,
            email: json.applicantEmail,
            year: json.applicantYear,
            program: json.applicantProgram,
            fridays: json.applicantFridays,
            team: json.applicantTeam,
            position: json.applicantPosition,
            otherPositions: json.applicantOtherPositions,
            statement: json.applicantStatement,
            viewed: false
        }

        const request = new Request(url, {
            method: "PATCH",
            body: JSON.stringify(unconfirmedApplicant),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })


        const unconfirmedApplicantRes = await fetch(request);

        if (unconfirmedApplicantRes.status === 200) {
            alert("Successfully unconfirmed viewing of applicant");
        } else {
            alert("Could not unconfirm viewing of applicant");
        }
    } else {
        alert("Could not find applicant");
    }

    getAllApplicants(applicationsAdminComp);
}
