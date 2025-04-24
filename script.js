function switchScreen(screen) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(`${screen}-screen`).classList.add('active');
}

function login() {
  const user = document.getElementById('login-username').value;
  const pass = document.getElementById('login-password').value;

  if (user && pass) {
    switchScreen('dashboard');
  } else {
    alert('Enter login credentials.');
  }
}

function register() {
  const user = document.getElementById('register-username').value;
  const pass = document.getElementById('register-password').value;

  if (user && pass) {
    alert('Registered! Now log in.');
    switchScreen('login');
  } else {
    alert('Fill all fields!');
  }
}

function sendFeedback() {
  const msg = document.getElementById('feedback-text').value;
  if (!msg) return alert('Please write something.');

  fetch("YOUR_DISCORD_WEBHOOK_URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: msg })
  }).then(() => {
    alert("Feedback sent!");
    document.getElementById('feedback-text').value = "";
    switchScreen('dashboard');
  }).catch(err => alert("Error sending feedback."));
}
