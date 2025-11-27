// // Placeholder fake website list
// const fakeWebsites = ["phishingsite.com", "fakeshop.net", "scamwebsite.org"];
// const suspiciousWebsites = ["suspiciouswebsite.com", "potentialphishing.org"];

// // Function to validate URL
// function isValidUrl(url) {
//   const pattern = new RegExp(
//     "^(https?:\\/\\/)?" + 
//     "((([a-zA-Z0-9\\-]+)\\.)+[a-zA-Z]{2,})" + 
//     "(\\/[a-zA-Z0-9#\\-._~%!$&'()*+,;=]*)?$", 
//     "i"
//   );
//   return !!pattern.test(url);
// }

// // Function to check website authenticity
// function checkWebsite() {
//   const input = document.getElementById("url-input").value.trim();
//   const resultDiv = document.getElementById("result");

//   if (!input) { resultDiv.innerHTML = `<div class="warning">Please enter a website URL.</div>`;
//     return;
//   }

//   // Validate the URL format
//   if (!isValidUrl(input)) {
//     resultDiv.innerHTML = `<div class="warning">Invalid URL format. Please check and try again.</div>`;
//     return;
//   }

//   // Extract the domain (remove http:// or https:// and anything after '/')
//   const domain = input.replace(/^https?:\/\//, '').split('/')[0];

//   // Check if the domain is in the fake websites list
//   if (fakeWebsites.includes(domain)) {
//     resultDiv.innerHTML = `<div class="fake">Warning: This website is considered fake and potentially dangerous.</div>`;
//     return;
//   }

//   // Check if the domain is in the suspicious websites list
//   if (suspiciousWebsites.includes(domain)) {
//     resultDiv.innerHTML = `<div class="warning">This website might be suspicious. Proceed with caution.</div>`;
//     return;
//   }

//   // If the website is not in the lists, it's considered safe
//   resultDiv.innerHTML = `<div class="safe">This website is safe to browse!</div>`;
// }
   


async function checkWebsite() {
  const url = document.getElementById("url-input").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Checking...";

  if (!url) {
    resultDiv.textContent = "Please enter a URL.";
    resultDiv.className = "result warning";
    return;
  }

  // Custom pattern detection (cleaned up to remove duplicates)
  const suspiciousPatterns = [
    "paypa1", "paypai", "bit.ly", "tinyurl", "secure-", "update-info", "account", "login", "signin", "banking",
    "verify", "paypal", "appleid", "reset-password", "security-check", "g00gle", "faceb00k", "facebo0k","amaz0n", "dropbox-secure",
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
    "secure-password", "verify-password","fizzleplop","bananacircuit","zorblaxonline","neonkoalacode.io",

    "muffinreboot.tech","quasarmelon","grumbleverse.biz", "wigglytiger.xyz","snorkelhub.fake","toastrocket.lol"
    
  
    
   
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
  const apiKey = "AIzaSyBgXNv-Pnu3yUlNH8Tf1CrL1hbD8s01dB0";
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


// "paypal-security", "secure-apple", "amazon-billing", "google-drive-login","secure-gmail",
//  "yahoo-security", "hotmail-verify", "secure-outlook", "icloud-login", "bankofamerica-secure", "chase-verify",

// "verify", "paypal", "appleid", "reset-password", "security-check", "g00gle", "faceb00k", "facebo0k","amaz0n",