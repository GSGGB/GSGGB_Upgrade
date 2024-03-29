// A function to get the uploaded image file.
export const updateImageFile = (comp, field) => {
    comp.setState({
        imageFile: field.files[0]
    })
};

// A function to send a POST request with a new image.
export const addImage = (comp, callback) => {
    let image = comp.state.imageFile;
    let imageData = new FormData();
    imageData.append("image", image);

    // the URL for the request
    const url = "/.netlify/functions/api/imageDatabase";

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "POST",
        body: imageData
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Image upload failed");
            }
        })
        .then(json => {
            comp.setState({
                imageId: json._id
            }, () => {
                alert("Image upload successful")
                callback();
            })
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a DELETE request with an image PUBLIC id (id on cloudinary).
export const deleteImage = (id) => {
    const url = "/.netlify/functions/api/imageDatabase/" + id;

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
                alert("Image deletion successful");
            } else {
                alert("Image deletion failed");
            }
        })
        .catch(error => {
            console.log(error);
        });
};
