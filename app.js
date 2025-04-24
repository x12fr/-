let socket;
let username = "";

function login() {
  username = document.getElementById("usernameInput").value;
  if (!username) return alert("Enter a username!");

  fetch("/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username })
  }).then(res => res.json()).then(data => {
    if (data.success) {
      document.getElementById("login").style.display = "none";
      document.getElementById("chat").style.display = "block";
      connectSocket();
    } else {
      alert("Username taken.");
    }
  });
}

function connectSocket() {
  socket = io();
  socket.emit("join", username);

  socket.on("message", msg => {
    const div = document.createElement("div");
    div.textContent = `${msg.user}: ${msg.text}`;
    document.getElementById("messages").appendChild(div);
  });
}

function sendMessage() {
  const text = document.getElementById("messageInput").value;
  socket.emit("message", { user: username, text });
  document.getElementById("messageInput").value = "";
}
