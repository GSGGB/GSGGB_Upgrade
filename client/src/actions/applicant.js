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
const addApplicantHelper = async(getInvolvedComp, applicant) => {
    // Retrieve resume cloudinary ID and URL.
    const resumeURL = "/resumeDatabase/" + applicant.resumeId;

    const resumeRes = await fetch(resumeURL);

    if (resumeRes.status === 200) {
        const resumeJSON = await resumeRes.json();

    } else {
        alert("Could not retrieve resume");
    }
};


// A function to store a potential applicant's information to the database.
export const sendApplication = (getInvolvedComp) => {
    // 1) Add resume to cloudinary first.
    addResume(getInvolvedComp, () => {
        // 2) Add application to MongoDB database.
        const url = "/applicantDatabase";

        const applicant = {
            resumeId: getInvolvedComp.state.resumeId,
            fullName: getInvolvedComp.state.applicantfullName,
            email: getInvolvedComp.state.applicantEmail,
            program: getInvolvedComp.state.applicantProgram,
            fridays: getInvolvedComp.state.applicantFridays,
            subteam: getInvolvedComp.state.applicantSubteam,
            position: getInvolvedComp.state.applicantPosition,
            otherPositions: getInvolvedComp.state.applicantOtherPositions,
            statement: getInvolvedComp.state.applicantStatement
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
                    return res.json();
                } else {
                    alert("Could not send application. Please try again.");
                    deleteResumeHelper(applicant);
                }
            })
            .then(json => {
                addApplicantHelper(getInvolvedComp, json);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                // Reset state variables.
                getInvolvedComp.setState({
                    resumeFile: "",
                    resumeId: "",
                    applicantFullName: "",
                    applicantEmail: "",
                    applicantYear: "Year 1",
                    applicantProgram: "",
                    applicantFridays: "No",
                    applicantSubteam: "Affairs",
                    applicantPosition: "",
                    applicantOtherPositions: "",
                    applicantStatement: ""
                });
            });
    });
};
