const socket = io();

// socket.on("countUpdated", (count) => {
//   console.log("The count has been updated ", count);
// });

// const incermentButton = document.querySelector("#increment");
// incermentButton.addEventListener("click", () => {
//   console.log("clicking");
//   socket.emit("increment");
// });

socket.on("message", (msg) => {
  console.log(msg);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, () => {
    console.log("The message was delivered.");
  });
});

document.querySelector("#locationBtn").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    // socket.emit(
    //   "sendMessage",
    //   `(${position.coords.latitude}, ${position.coords.longitude})`
    // );
  });
});
