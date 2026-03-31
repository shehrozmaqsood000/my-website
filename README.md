# HOPE Preparations Website

**House of Progressive Education – Sahiwal**

A complete, deployable static website for HOPE Preparations coaching academy.

---

## 📁 Project Structure

```
hope-preparations/
├── index.html                  ← Main homepage
├── vercel.json                 ← Vercel deployment config
├── README.md
├── css/
│   └── styles.css              ← All styles
├── js/
│   └── script.js               ← All JavaScript
├── pages/
│   ├── about.html
│   ├── courses.html
│   ├── faculty.html
│   ├── schedule.html
│   ├── admissions.html
│   ├── contact.html
│   ├── login.html              ← Student login
│   ├── admin-login.html        ← Admin login
│   ├── student-dashboard.html  ← Student portal
│   └── admin-dashboard.html    ← Admin panel
└── assets/
    └── images/
        ├── logo.png            ← HOPE logo (add manually)
        ├── director.jpg
        ├── director2.jpg
        ├── teacher-ielts.jpg
        ├── teacher-science.jpg
        ├── teacher-computer.jpg
        ├── teacher-cs-skills.jpg
        ├── teacher-gk.jpg
        ├── teacher-math.jpg
        ├── banner-main.jpg
        ├── banner-ielts.jpg
        └── banner-law.jpg
```

---

## 🚀 Deploy to Vercel

### Method 1: GitHub + Vercel (Recommended)
1. Create a GitHub repository
2. Upload all project files
3. Go to [vercel.com](https://vercel.com) → New Project
4. Import your GitHub repo
5. Click **Deploy** — Done!

### Method 2: Vercel CLI
```bash
npm install -g vercel
cd hope-preparations
vercel
```

---

## 🔐 Demo Login Credentials

### Student Portal
- URL: `/pages/login.html`
- Username: `student1` | Password: `hope123`
- Username: `ahmed` | Password: `hope123`

### Admin Panel
- URL: `/pages/admin-login.html`
- Username: `admin` | Password: `hopeadmin2025`
- Username: `director` | Password: `asifnaveed`

---

## ✅ Features

### Public Website
- ✅ Hero slider with 3 banners
- ✅ Animated stats counter
- ✅ Courses section (6 courses)
- ✅ Faculty profiles with photos
- ✅ Director's message
- ✅ Class schedule (public)
- ✅ Admissions/Apply form
- ✅ Contact form + map
- ✅ Responsive mobile design
- ✅ Scroll animations
- ✅ Back to top button
- ✅ Announcement ticker

### Student Dashboard
- ✅ Secure login
- ✅ Notes & study materials (with search)
- ✅ Daily newspapers (with date filter)
- ✅ Quiz with timer
- ✅ Online class (Google Meet link)
- ✅ Announcements
- ✅ Fee status
- ✅ Profile page

### Admin Dashboard
- ✅ Student management table
- ✅ New enrollment form
- ✅ Fee management (mark paid)
- ✅ Upload notes
- ✅ Upload newspapers
- ✅ Post announcements
- ✅ Edit schedule

---

## 📞 Academy Info
- **Address:** 05-Q Masjid Shuhhada Chowk, Farid Town, Sahiwal
- **Phone:** 0345-7345203 | 0321-7345203 | 040-4555203

---

## ⚠️ Important Notes

1. **Logo:** Add your `logo.png` file to `assets/images/` folder
2. **Images:** All uploaded images are already in `assets/images/`
3. **Authentication:** This is a static frontend demo. For production, connect to a backend (Node.js/PHP) or Firebase for real auth
4. **Google Meet:** Replace the Google Meet link in `student-dashboard.html` with your actual class link
5. **Email:** Update contact email in `index.html` footer

---

*Built for HOPE Preparations – House of Progressive Education*
