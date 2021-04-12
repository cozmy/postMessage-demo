"use strict";

document.querySelector("#name").innerText = window.frames.name;

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  window.opener.postMessage({
    type: "FORM_SYNC",
    payload: Object.fromEntries(formData.entries())
  }, "*");
});

window.addEventListener("message", (event) => {
  if (event.data?.type === "FORM_SYNC") {
    for (const [name, value] of Object.entries(event.data.payload)) {
      const input = document.querySelector(`[name="${name}"]`);
      input.value = value;
    }
  }
});