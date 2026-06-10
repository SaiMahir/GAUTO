/**
 * Autofill login credentials on the college portal page
 */
chrome.storage.sync.get(["username", "password"], (data) => {
  if (chrome.runtime.lastError) {
    console.error("Error retrieving credentials:", chrome.runtime.lastError);
    return;
  }

  const userField = document.querySelector("#username");
  const passField = document.querySelector("#password");

  try {
    if (userField && data.username) {
      userField.value = data.username;
    }

    if (passField && data.password) {
      passField.value = data.password;
    }
  } catch (error) {
    console.error("Error autofilling credentials:", error);
  }
});