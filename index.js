"use strict";

let id = 1;

const tabs = {};

document.querySelector("#spawn").addEventListener("click", () => {
  const tab = window.open("child.html", `tab-${id++}`, "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=800,height=600");
  tabs[tab.name] = tab;

  const tr = document.createElement("tr");
  tr.id = tab.name;
  tr.innerHTML = `
    <td class="tab-name">${tab.name}</td>
    <td>
      <form name="${tab.name}" autocomplete="off">
        <label>
          Name
          <input type="text" name="name">
        </label>
        <label>
          Age
          <input type="number" name="age">
        </label>
    
        <input type="submit" value="Sync">
      </form>
    </td>
    <td class="actions"></td>
  `;

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", () => tab.close());

  const focusButton = document.createElement("button");
  focusButton.innerText = "Focus";
  focusButton.addEventListener("click", () => tab.focus());

  tr.querySelector(".actions").append(closeButton);
  tr.querySelector(".actions").append(focusButton);

  function onUnload() {
    setTimeout(() => {
      if (tab.closed) {
        tr.classList.add("tab-closed");
      } else {
        tab.onunload = onUnload;
      }
    }, 10);
  }

  tab.onunload = onUnload;

  document.querySelector("#tabs tbody").append(tr);
});

document.addEventListener("submit", (event) => {
  event.preventDefault();

  const tab = tabs[event.target.getAttribute("name")];

  if (tab && tab.closed === false) {
    const formData = new FormData(event.target);

    tab.postMessage({
      type: "FORM_SYNC",
      payload: Object.fromEntries(formData.entries())
    });
  } else {
    alert("The child tab is no longer available");
  }
});

window.addEventListener("message", (event) => {
  if (event.data?.type === "FORM_SYNC") {
    const tabName = event.source.name;
    const tab = tabs[tabName];

    if (!tab) alert("Received a message from a child tab that is no longer added in the table. The message is: " + JSON.stringify(event.data.payload));

    for (const [name, value] of Object.entries(event.data.payload)) {
      const input = document.querySelector(`#${tabName} [name="${name}"]`);
      input.value = value;
    }
  }
});
