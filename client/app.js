// create a new WebSocket connection from the client to the specified server URL.
socket = new WebSocket('ws://localhost:5000');

function sendMessage(e) {
  e.preventDefault(); // submit the form without reload the page.
  const input = document.querySelector('input');
  if (input.value) {
    socket.send(input.value);
    input.value = '';
  }
  // set the focus back to input element without having to manually click on it.
  input.focus();
}

// add an event listener to a form element.
// the event listener triggers the sendMessage() function whenever the form is submitted.
document.querySelector('form').addEventListener('submit', sendMessage);

// add an event listener to a WebSocket connection instance.
socket.addEventListener('open', (event) => {
  console.log('Connected to the server!');
});

// add an event listener to incoming messages.
socket.addEventListener('message', ({ data }) => {
  console.log(`Received message: ${data}`);
  const li = document.createElement('li');
  li.textContent = data;
  document.querySelector('ul').appendChild(li);
});
