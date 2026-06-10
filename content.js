/**
 * Autofill login credentials on the GITAM login page
 */
chrome.storage.sync.get(["username", "password"], (data) => {
  if (chrome.runtime.lastError) {
    console.error("Error retrieving credentials:", chrome.runtime.lastError);
    return;
  }

  // Try multiple possible field selectors for GITAM login page
  const userField = document.querySelector("input[name='username']")
    || document.querySelector("input[name='userid']")
    || document.querySelector("input[id='username']")
    || document.querySelector("input[id*='user']");

  const passField = document.querySelector("input[name='password']")
    || document.querySelector("input[id='password']");

  try {
    if (userField && data.username) {
      userField.value = data.username;
      userField.dispatchEvent(new Event('input', { bubbles: true }));
      userField.dispatchEvent(new Event('change', { bubbles: true }));
    }

    if (passField && data.password) {
      passField.value = data.password;
      passField.dispatchEvent(new Event('input', { bubbles: true }));
      passField.dispatchEvent(new Event('change', { bubbles: true }));
    }
  } catch (error) {
    console.error("Error autofilling credentials:", error);
  }
});