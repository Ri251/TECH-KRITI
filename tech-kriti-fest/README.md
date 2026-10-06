# 🚀 TECH KRITI 2026 — Official Festival Platform

Official web platform for the **Tech Kriti 2026 Annual College Tech & Cultural Festival** (Delhi Skill and Entrepreneurship University — DSEU).

---

## 💎 Pricing & Policy Structure

- 🎓 **DSEU Campus Students**: **₹50** (One-Time Festival Entry Pass)
- 🌐 **Outside / Non-DSEU College Students**: **₹100** (One-Time Festival Entry Pass)
- 🎁 **All 10 Competitions & Events**: **100% FREE** once the entry pass is taken!
- 🎧 **DJ Night**: Included for all registered attendees.

---

## 💳 Payment Gateway: Paytm UPI QR & UTR Verification

1. **UPI Payee Details**:
   - **Name**: Rishab Kumar Jha
   - **UPI ID**: `6287056243@ptsbi`
   - **Supported Apps**: Paytm, Google Pay, PhonePe, BHIM, Cred, and all Indian banking UPI apps.
2. **Payment Flow**:
   - Student selects **DSEU (₹50)** or **Outside (₹100)**.
   - If the student already has an active entry pass on their Roll Number or Email, registration is **₹0 (FREE)**.
   - Student scans Rishab Kumar Jha's official QR code and pays via UPI.
   - Student enters the **12-digit UPI Reference / UTR Number** from their payment receipt.
   - The system validates the 12-digit format and instantly generates an **Official Digital Ticket Pass with scannable QR & Barcode**.
3. **Admin Verification**:
   - In `pages/admin.html`, coordinators cross-check UTR numbers directly against Rishab Kumar Jha's Paytm statement and click **"Approve UTR"** with 1 click.

---

## 🌐 Complete Deployment Guide (How to Deploy All Files Together)

Since this platform is built with modern vanilla web standards (HTML5, Tailwind CSS CDN, FontAwesome CDN, QRCode.js, and Confetti), **no compilation, webpack, or npm build is required**. Everything is bundled together and ready to go live in seconds!

Here are the 3 easiest ways to deploy:

### 🌟 Method 1: Netlify Drop (Fastest — 10 Seconds, No Terminal Needed)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Sign in with GitHub, Google, or create a free account.
3. Open your computer's File Explorer and locate the project folder:
   `C:\Users\HP\.gemini\antigravity\scratch\tech-kriti-fest`
4. **Drag and drop the entire folder** into the Netlify Drop box on the website.
5. In 5 to 10 seconds, Netlify will give you a live HTTPS link (e.g. `https://tech-kriti-2026.netlify.app`)!

---

### 🌟 Method 2: Vercel (Recommended for Custom Domains)
We have already included a production-ready `vercel.json` in the root folder.
1. Open PowerShell and navigate to the project directory:
   ```powershell
   cd C:\Users\HP\.gemini\antigravity\scratch\tech-kriti-fest
   ```
2. If you have the Vercel CLI installed:
   ```bash
   npx vercel
   ```
3. Or push this repository to GitHub and import it on [vercel.com](https://vercel.com):
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Click **Deploy**!

---

### 🌟 Method 3: GitHub Pages (Free Permanent Hosting)
1. Create a new GitHub repository named `tech-kriti-fest`.
2. Push your files:
   ```bash
   git init
   git add .
   git commit -m "Tech Kriti 2026 Official Festival Platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/tech-kriti-fest.git
   git push -u origin main
   ```
3. In GitHub repo **Settings** > **Pages**:
   - Source: Deploy from branch `main` / `root`
   - Click Save. Your website will be live at `https://YOUR_USERNAME.github.io/tech-kriti-fest/`!

---

### 💻 Running Locally (On Your PC)
From this directory, run:
```powershell
python server.py
```
This automatically opens `http://localhost:8080/index.html` in your default browser.

---

## 📁 Project Architecture & File Inventory

```text
tech-kriti-fest/
├── index.html                   # Main Landing Page (Hero, ₹50/₹100 Cards, Events, Countdown, FAQs)
├── server.py                    # Local Python server with automatic browser launch
├── vercel.json                  # Production Vercel static routing config
├── netlify.toml                 # Netlify deployment configuration
├── .gitignore                   # Clean git tracking rules
├── README.md                    # Documentation & deployment guide
├── assets/
│   └── upi_qr_rishab.jpg        # Rishab Kumar Jha's Paytm UPI QR Code
├── css/
│   └── style.css                # Glassmorphism, animations, print rules, scrollbars
├── js/
│   ├── data.js                  # Central pricing rules (₹50/₹100/₹0), schedules, prizes
│   ├── storage.js               # Clean live database manager (Zero dummy records, UTR verification)
│   ├── payment.js               # UPI QR Modal, UTR 12-digit validator, audio chime & confetti
│   ├── ticket.js                # Digital Pass engine with QR & barcode
│   └── app.js                   # Mobile navbar drawer, countdown timer, toast alerts
└── pages/
    ├── admin.html               # Organizer Admin Desk: UTR approval, CSV export, gate scanner
    ├── student-portal.html      # Student Self-Service: view pass, UTR status & digital ID
    ├── register.html            # Universal registration with DSEU (₹50) vs Outside (₹100)
    ├── ticket.html              # Printable & downloadable official digital pass
    ├── events.html              # Searchable activities directory (All 10 events 100% Free)
    ├── schedule.html            # Pre-events (22 Oct) & Main Day (23 Oct) timeline
    ├── frontend.html            # Dedicated Front End Web Sprint page
    ├── prompt-engineering.html  # Dedicated Prompt Engineering page
    ├── dance.html               # Dedicated Dance Mania page
    ├── singing.html             # Dedicated Singing Showcase page
    ├── carrom.html              # Dedicated Carrom Championship page
    ├── cosplay.html             # Dedicated Cosplay Extravaganza page
    ├── poetry.html              # Dedicated Poetry & Slam Verse page
    ├── standup.html             # Dedicated Stand-up Comedy page
    ├── tech-debate.html         # Dedicated Tech Debate page
    └── memory-challenge.html    # Dedicated Memory Challenge page
```

---

## 🔒 Security & Verification Features

- **🔐 Secured Admin Portal Lock (ID & Password)**:
  - `pages/admin.html` is strictly locked behind a cyber gatekeeper screen.
  - No student records, personal data, or payment UTRs are revealed until valid organizer credentials are provided.
  - **Default Organizer Credentials**:
    - **Admin ID**: `admin`
    - **Password**: `techkriti2026`
  - Coordinators can customize or change the password anytime directly from the top bar ("Change Pass").
  - Includes session encryption, "Remember device" option, and instant **1-Click "Lock Portal"** button.
- **No Random/Dummy Data**: Database starts 100% clean and opens for real live participants.
- **12-Digit UTR Validation**: Only valid bank transaction reference numbers are accepted.
- **DSEU vs Outside Tier Detection**: Clear visual distinction on passes and coordinator dashboards.
- **Gate Pass QR Scanner**: Admin dashboard features an instant camera/code pass validator to prevent double-entry at festival gates.
- **1-Click CSV Export**: Organizers can download the full registered student roster with UTR codes at any time.
