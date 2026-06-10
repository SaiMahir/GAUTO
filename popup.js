const saveButton = document.getElementById("save");
const statusDiv = document.getElementById("status");

function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = type;
  
  if (type === "success") {
    setTimeout(() => {
      statusDiv.className = "";
    }, 3000);
  }
}

saveButton.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Validate input
  if (!username) {
    showStatus("Please enter a roll number", "error");
    return;
  }

  if (!password) {
    showStatus("Please enter a password", "error");
    return;
  }

  // Save credentials
  chrome.storage.sync.set(
    { username, password },
    () => {
      if (chrome.runtime.lastError) {
        showStatus("Error saving credentials", "error");
        console.error(chrome.runtime.lastError);
      } else {
        showStatus("Credentials saved successfully!", "success");
      }
    }
  );
});

// Load saved credentials on popup open
window.addEventListener("load", () => {
  chrome.storage.sync.get(["username", "password"], (data) => {
    if (data.username) {
      document.getElementById("username").value = data.username;
    }
    if (data.password) {
      document.getElementById("password").value = data.password;
    }
  });
});