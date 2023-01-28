// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

const output = document.querySelector(".output");
const fileInput = document.querySelector("#files");
const upload = document.querySelector("#upload");
const status = document.querySelector(".status");
const fileCountView = document.querySelectorAll(".file-count");
const formData = new FormData();

let fileCountNum = 0;

fileInput.addEventListener("change", () => {
  if (fileInput.files.length !== 0) {
    status.innerText = "";
  }
  for (const file of fileInput.files) {
    formData.append("files", file);
    output.innerText += `\n${file.name}`;
    fileCountNum += 1;
  }
});

upload.addEventListener("click", uploadFile);

async function uploadFile() {
  try {
    const response = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });
    console.log("🚀 ~ file: main.js:29 ~ uploadFile ~ response", response);
    status.innerText = "upload success";

    fileInput.value = "";
    output.innerText = "";
    fileCountView.forEach((element) => {
      element.innerText = fileCountNum;
    });
    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
