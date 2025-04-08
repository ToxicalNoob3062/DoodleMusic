// Get the form and the button elements
const form = document.getElementById("loginForm");
const submitBtn = document.getElementById("submitBtn");
const usernameInput = document.getElementById("username");
const password = document.getElementById("password");

// Restrict username input: lowercase, no spaces, max 10 characters
usernameInput.addEventListener("input", () => {
  let val = usernameInput.value.toLowerCase().replace(/\s+/g, "");
  usernameInput.value = val.slice(0, 10);
});

// Add an event listener to handle form submission via the button
submitBtn.addEventListener("click", async function (event) {
  event.preventDefault(); // Prevent the default form submission

  const uname = usernameInput.value;
  const pass = password.value;

  const resp = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: uname, password: pass }),
  });

  const { msg } = await resp.json();
  alert(msg);
  if (resp.ok) {
    window.location.href = "/mytunes";
  }
});
