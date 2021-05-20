// A function to send a POST request with a new image
export const addImage = (comp) => {
    let image = comp.state.imageFile;
    let imageData = new FormData();
    imageData.append("image", image);

    // the URL for the request
    const url = "/imageDatabase";

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
                alert("Image upload failed. Please try again.");
            }
        })
        .then(json => {
            console.log(json);
            comp.setState({
                imageId: json.imageId
            })
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to get a specific image by their id.
export const getImageById = (comp, id) => {
    // the URL for the request
    const url = "/imageDatabase/" + id;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get image.");
            }
        })
        .then(json => {
            comp.setState({
                imageURL: json.imageURL
            });
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to send a DELETE request with an image PUBLIC id (id on cloudinary)
export const deleteImage = (id) => {
  const url = "/imageDatabase/" + id;

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
              alert("Successfully deleted image.");
          } else {
              alert("Image deletion failed. Please try again.");
          }
      })
      .catch(error => {
          console.log(error);
      });
}
