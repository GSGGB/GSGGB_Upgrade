// A function to update a resume file to add to cloudinary.
export const updateResumeFile = (comp, field) => {
    comp.setState({
        resumeFile: field.files[0]
    })
};

// A function to send a POST request with a new resume.
export const addResume = (comp, callback) => {
    let resume = comp.state.resumeFile;
    let resumeData = new FormData();
    resumeData.append("resume", resume);

    // the URL for the request
    const url = "/.netlify/functions/api/resumeDatabase";

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "POST",
        body: resumeData
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Resume upload failed");
            }
        })
        .then(json => {
            comp.setState({
                resumeId: json._id
            }, () => {
                alert("Resume upload successful")
                callback();
            })
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a DELETE request with a resume PUBLIC id (id on cloudinary).
export const deleteResume = (id) => {
    const url = "/.netlify/functions/api/resumeDatabase/" + id;

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
                alert("Resume deletion successful");
            } else {
                alert("Resume deletion failed");
            }
        })
        .catch(error => {
            console.log(error);
        });
};
