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
</p>
## Overview
Navigating the web safely is becoming increasingly complex. Modern scammers have transitioned from simple tricks to advanced technical deception, crafting URLs that are visually indistinguishable from legitimate services to deceive even the most cautious users.
Rasha Shield uses a mix of smart pattern detection and official security databases to check every link. 

🔍 Detection Layers
Our system analyzes every link through six primary security vectors:
1.1 Typosquatting Detection We scan for "look-alike" attacks where attackers utilize homoglyphs or subtle misspellings (e.g., netfl1x.com or amaz0n.com) to exploit human visual processing errors.
1.2 Dash-Stuffing Analysis Legitimate enterprise domains rarely utilize excessive hyphens. We flag domains that "stuff" dashes to mimic authentic file paths or sentences.
1.3 Subdomain Length Monitoring Scammers frequently use elongated subdomains (e.g., paypal-secure-login.domain.com) to push the actual malicious domain off-screen on mobile devices. Our engine flags this specific UI-spoofing behavior.
1.4 Obfuscation Checks The system identifies URLs containing excessive character encoding (percent-encoding) or non-standard network ports, which are common tactics for bypassing traditional firewalls and signature-based filters.
1.5 High-Risk TLD Filtering Not all Top-Level Domains (TLDs) carry the same reputation. We automatically flag TLDs statistically correlated with high malware rates—such as .xyz, .top, and .zip—often favored by bad actors for their low registration costs.
1.6 Google Safe Browsing Integration Beyond structural heuristics, Rasha Shield integrates with the Google Safe Browsing API. This provides a final verification layer against a global, real-time database of known social engineering and unwanted software threats.

