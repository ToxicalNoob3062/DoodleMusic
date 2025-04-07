// Get the form and the button elements
const form = document.getElementById("loginForm");
const submitBtn = document.getElementById("submitBtn");

// Add an event listener to handle form submission via the button
submitBtn.addEventListener("click", async function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const uname = username.value;
  const pass = password.value;

  // Example: sending data using Fetch API (You can replace this with your actual API)
  const resp = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: uname, password: pass }),
  });
  if (resp.ok) {
    alert("Login successful");
    window.location.href = "/mytunes";
  } else {
    const data = await resp.text();
    alert(`Error logging in: ${data}`);
  }
});
