<p align="center">
  <img src="assets/Logo.svg" width="140"/>
</p>

<h1 align="center">Rasha Shield</h1>
<p align="center">
  Phishing Detection Tool
</p>
<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#demo">Demo</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a>
  <a href="#teck stack">Tech Stack</a>

</p>
## 📖 Overview

Navigating the web safely is becoming increasingly complex. Modern scammers have transitioned from simple tricks to advanced technical deception, crafting URLs that are visually indistinguishable from legitimate services to deceive even the most cautious users.

**Rasha Shield** uses a combination of intelligent pattern analysis and official security databases to evaluate every link before it reaches the user.

---

### 🔍 Detection Layers

Our system analyzes every URL through **six primary security vectors**:

**1️⃣ Typosquatting Detection**  
We detect look-alike attacks where attackers use homoglyphs or subtle misspellings  
(e.g., `netfl1x.com`, `amaz0n.com`) to exploit human visual perception.

**2️⃣ Dash-Stuffing Analysis**  
Legitimate enterprise domains rarely use excessive hyphens. Rasha Shield flags domains that overload dashes to mimic real file paths or sentences.

**3️⃣ Subdomain Length Monitoring**  
Scammers frequently use elongated subdomains such as  
`paypal-secure-login.domain.com`  
to push the actual malicious domain off-screen on mobile devices. Our engine detects and flags this UI-spoofing technique.

**4️⃣ URL Obfuscation Checks**  
Identifies excessive percent-encoding, suspicious characters, and non-standard network ports commonly used to bypass traditional firewalls and filters.

**5️⃣ High-Risk TLD Filtering**  
Not all Top-Level Domains carry the same trust level. Rasha Shield automatically flags TLDs statistically linked with higher malware activity, including:
- `.xyz`
- `.top`
- `.zip`

**6️⃣ Google Safe Browsing Integration**  
Beyond structural heuristics, Rasha Shield integrates with the **Google Safe Browsing API**, validating URLs against a real-time global database of known phishing, malware, and unwanted software threats.
