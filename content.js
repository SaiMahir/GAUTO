/**
 * Autofill login credentials and click reCAPTCHA on GITAM login page
 */

function autofillAndClickCaptcha() {
  chrome.storage.sync.get(["username", "password"], (data) => {
    if (chrome.runtime.lastError) {
      console.error("Error retrieving credentials:", chrome.runtime.lastError);
      return;
    }

    try {
      // Try multiple possible field selectors for GITAM login page
      const userField = document.querySelector("input[placeholder*='User']")
        || document.querySelector("input[placeholder*='ID']")
        || document.querySelector("input[name='username']")
        || document.querySelector("input[name='userid']")
        || document.querySelector("input[id='username']")
        || document.querySelector("input[type='text'][name='']")
        || Array.from(document.querySelectorAll("input[type='text']"))[0];

      const passField = document.querySelector("input[type='password']")
        || document.querySelector("input[name='password']")
        || document.querySelector("input[id='password']");

      // Autofill credentials
      if (userField && data.username) {
        userField.focus();
        userField.value = data.username;
        userField.dispatchEvent(new Event('input', { bubbles: true }));
        userField.dispatchEvent(new Event('change', { bubbles: true }));
        userField.dispatchEvent(new Event('blur', { bubbles: true }));
        console.log("User ID filled:", data.username);
      }

      if (passField && data.password) {
        passField.focus();
        passField.value = data.password;
        passField.dispatchEvent(new Event('input', { bubbles: true }));
        passField.dispatchEvent(new Event('change', { bubbles: true }));
        passField.dispatchEvent(new Event('blur', { bubbles: true }));
        console.log("Password filled");
      }

      // Click reCAPTCHA checkbox after a short delay
      setTimeout(() => {
        clickRecaptcha();
      }, 500);

    } catch (error) {
      console.error("Error autofilling credentials:", error);
    }
  });
}

function clickRecaptcha() {
  try {
    // Method 1: Click reCAPTCHA anchor
    let recaptchaAnchor = document.querySelector("#recaptcha-anchor");
    if (recaptchaAnchor) {
      recaptchaAnchor.click();
      console.log("reCAPTCHA clicked (anchor method)");
      return;
    }

    // Method 2: Look for visible checkbox input
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    for (let checkbox of checkboxes) {
      if (checkbox.offsetParent !== null) { // Check if visible
        checkbox.click();
        console.log("reCAPTCHA clicked (checkbox method)");
        return;
      }
    }

    // Method 3: Click the reCAPTCHA container div
    const recaptchaContainer = document.querySelector(".g-recaptcha");
    if (recaptchaContainer) {
      recaptchaContainer.click();
      console.log("reCAPTCHA clicked (container method)");
    }
  } catch (error) {
    console.error("Error clicking reCAPTCHA:", error);
  }
}

// Wait for page to fully load before autofilling
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autofillAndClickCaptcha);
} else {
  autofillAndClickCaptcha();
}