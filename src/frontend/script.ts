// script.js
const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", submitForm);

function submitForm(e: Event): void {  //We get form element from the DOM and add a submit event to it
    e.preventDefault();  // to prevent the default action that the browser would take when a form is submitted, which would normally be redirecting to the value of the action attribute

    // Getting bookmark-name, files, and description element from the DOM 
    const name = document.getElementById("bookmark-name") as HTMLInputElement;
    const files = document.getElementById("files") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLTextAreaElement;

    // Creating formData
    const formData = new FormData();

    // Appending name and description input
    formData.append("bookmark-name", name.value);
    formData.append("description", description.value);

    // Dynamically appending the multiple files we selected to the formData
    if (files.files) {
        for (let i = 0; i < files.files.length; i++) {
            formData.append(`files[${i}]`, files.files[i]); // appending the files with a unique key for each file:
        }
    }

    // Adding a post request to the route
    fetch("http://localhost:4000/upload_files", {
        method: 'POST',
        body: formData
    })
        .then((res) => {
            if (res.ok) {
                console.log("Files uploaded successfully", res);
            } else {
                console.log("Upload failed", res);
            }
        })
        .catch((err) => console.log("Error occured", err));
}