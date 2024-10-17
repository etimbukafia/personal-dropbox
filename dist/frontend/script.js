const form = document.getElementById("form");
form.addEventListener("submit", submitForm);
function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById("bookmark-name");
    const files = document.getElementById("files");
    const description = document.getElementById("description");
    const formData = new FormData();
    formData.append("bookmark-name", name.value);
    formData.append("description", description.value);
    if (files.files) {
        for (let i = 0; i < files.files.length; i++) {
            formData.append(`files[${i}]`, files.files[i]);
        }
    }
    fetch("http://localhost:4000/upload_files", {
        method: 'POST',
        body: formData
    })
        .then((res) => {
        if (res.ok) {
            console.log("Files uploaded successfully", res);
        }
        else {
            console.log("Upload failed", res);
        }
    })
        .catch((err) => console.log("Error occured", err));
}
export {};
//# sourceMappingURL=script.js.map