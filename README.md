The **window.postMessage()** method safely enables cross-origin communication between [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window) objects; e.g., between a page and a pop-up that it spawned, or between a page and an iframe embedded within it.

Normally, scripts on different pages are allowed to access each other if and only if the pages they originate from share the same protocol, port number, and host (also known as the "same-origin policy"). `window.postMessage()` provides a controlled mechanism to securely circumvent this restriction (if used properly).

Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
