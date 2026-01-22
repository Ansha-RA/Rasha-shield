async function checkWebsite() {
  const url = document.getElementById("url-input").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Checking...";

  if (!url) {
    resultDiv.textContent = "Please enter a URL.";
    resultDiv.className = "result warning";
    return;
  }
  let containsManyDashes = false;
  let hasNonStandardPort = false;
  let containLongSubdomain = false;

  try {
    let urlToParse = url;
    if (!/^https?:\/\//i.test(urlToParse)) {
      urlToParse = 'https://' + urlToParse;
    }
    const parsedUrl = new URL(urlToParse);
    const hostname = parsedUrl.hostname;
    const port = parsedUrl.port; 
    const dashCount = (hostname.match(/-/g) || []).length;
    if (dashCount > 2) {
      containsManyDashes = true;
    }
    if (port && port !== '80' && port !== '443') {
      hasNonStandardPort = true;
    }
    const parts = hostname.split('.');
    if (parts.length > 2) {
      const subdomain = parts.slice(0, parts.length - 2).join('.');
      if (subdomain.length > 20) {
        containLongSubdomain = true;
      }
    }

  } catch (e) {
    console.log("Could not parse URL for heuristics");
  }
  if (containsManyDashes) {
    resultDiv.textContent = "⚠️ Suspicious! The domain contains excessive dashes (Dash-Stuffing).";
    resultDiv.className = "result fake";
    return;
  }
  if (hasNonStandardPort) {
    resultDiv.textContent = "⚠️ Suspicious! The URL uses a non-standard port (often used by compromised servers).";
    resultDiv.className = "result fake";
    return;
  }
  if (containLongSubdomain) {
    resultDiv.textContent = "⚠️ Suspicious! The subdomain is unusually long (often used to hide the real domain on mobile).";
    resultDiv.className = "result fake";
    return;
  }
  // Custom pattern detection (cleaned up to remove duplicates)
  const suspiciousPatterns = [
    "paypa1", "paypai", "bit.ly", "tinyurl", "secure-", "update-info", "account", "login", "signin", "banking",
    "verify", "paypal", "appleid", "reset-password", "security-check", "g00gle", "faceb00k", "facebo0k", "amaz0n", "dropbox-secure",
    "netfl1x", "instagrarn", "tw1tter", "chase-bank-update", "update-billing", "goog1e", "micros0ft", "secure-paypal",
    "appleid-login", "googIe", "faceb00k-login", "secure-amazon", "netflix-update", "bankofarnerica", "wellsfargo-login",
    "citibank-secure", "hsbc-update", "icloud-security", "outlook-verify", "secure-dropbox", "onedrive-login", "secure-facebook",
    "instagram-verify", "linkedin-security", "ebay-update", "paypal-security", "secure-apple", "amazon-billing", "google-drive-login",
    "secure-gmail", "yahoo-security", "hotmail-verify", "secure-outlook", "icloud-login", "bankofamerica-secure", "chase-verify",
    "wellsfargo-security", "citibank-login", "hsbc-verify", "secure-icloud", "dropbox-verify", "onedrive-security", "facebook-login",
    "instagram-security", "linkedin-verify", "ebay-security", "paypal-login", "apple-security", "amazon-login", "google-security",
    "gmail-verify", "yahoo-login", "hotmail-security", "outlook-login", "icloud-verify", "bankofamerica-login", "chase-security",
    "wellsfargo-verify", "citibank-security", "hsbc-login", "secure-bank", "secure-email", "secure-account", "update-password",
    "verify-identity", "confirm-account", "validate-login", "account-update", "billing-update", "security-alert", "login-alert",
    "account-security", "secure-update", "password-reset", "account-verify", "login-update", "secure-login", "verify-account",
    "update-account", "confirm-login", "validate-account", "security-update", "account-alert", "login-security", "update-login",
    "verify-login", "confirm-password", "validate-password", "security-password", "password-update", "account-password", "login-password",
    "secure-password", "verify-password", "fizzleplop", "bananacircuit", "zorblaxonline", "neonkoalacode.io","muffinreboot.tech", "quasarmelon", "grumbleverse.biz", "wigglytiger.xyz",
  ];
  const isSuspicious = suspiciousPatterns.some(pattern =>
    url.toLowerCase().includes(pattern)
  );
  if (isSuspicious) {
    resultDiv.textContent =
      "⚠️ Suspicious website detected based on URL pattern!";
    resultDiv.className = "result fake";
    return;
  }
  // Google Safe Browsing API check
  const apiKey = "YOUR_API_KEY";
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
  const body = {
    client: {
      clientId: "rashashield",
      clientVersion: "1.0"
    },
    threatInfo: {
      threatTypes: [
        "MALWARE",
        "SOCIAL_ENGINEERING",
        "POTENTIALLY_HARMFUL_APPLICATION",
        "UNWANTED_SOFTWARE"
      ],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: url }]
    }
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (data && data.matches) {
      resultDiv.textContent = "⚠️ Warning! This website is unsafe.";
      resultDiv.className = "result fake";
    } else {
      resultDiv.textContent = "✅ This website is safe.";
      resultDiv.className = "result safe";
    }
  } catch (error) {
    console.error("Error:", error);
    resultDiv.textContent = "Error checking website. Try again later.";
    resultDiv.className = "result warning";
  }
}
