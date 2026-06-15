# NIRIMI Learn

A modernized, responsive, and interactive Electronic Learning Management System (E-LMS) built with HTML, Vanilla CSS, and JavaScript. 

This project was upgraded from its initial coursework draft to follow Google's clean, modern Material Design 3 aesthetic, incorporating video-focused microlearning, modular course progress tracking, and client-side database persistence.

---

## 🚀 Key Features

1. **Google Material 3 Aesthetic**: A premium dark-centric design system featuring smooth hover transitions, glassmorphic cards, custom elevations, and elegant Google Fonts (`Outfit` and `Inter`).
2. **In-App Video Player (`player.html`)**: Watch programming lectures (embedded YouTube modules) without leaving the platform, navigate through dynamic playlists, and check off completed topics.
3. **Student Dashboard (`students.html`)**: Tracks active registrations with graphical completion progress bars (updating dynamically as you finish video lectures) and claims exclusive section course discounts.
4. **Instructor Portal (`instructors.html`)**: Access faculty coordinator tools to:
   - Create custom courses by submitting dynamic lesson modules and YouTube video URLs.
   - Analyze enrollment metrics (student counts per course).
   - Review and approve custom course suggestions requested by students.
5. **Dynamic Mock Database (`assets/js/db.js`)**: Real-time logic using browser `localStorage` to handle logins, registrations, progress calculations, and course catalogs dynamically.
6. **Course Request System (`request.html`)**: Multi-category recommendation form that streams submissions to the Instructor dashboard.

---

## 🔑 Test Credentials

The local database is pre-seeded with two default accounts for testing:

| Role | Username | Password |
| :--- | :--- | :--- |
| **Student** | `student` | `password` |
| **Instructor** | `instructor` | `password` |

*Note: You can also register custom new student accounts directly through the Sign Up tab.*

---

## 📁 File Structure

```text
E-LMS-using-html-js-css-main/
├── assets/
│   ├── images/
│   │   ├── course_intro_programming.png   <- Generated Banner Art
│   │   ├── course_web_dev.png
│   │   ├── course_react.png
│   │   ├── course_advanced_js.png
│   │   ├── course_machine_learning.png
│   │   └── course_data_science.png
│   └── js/
│       └── db.js                          <- Client-Side DB, Session & Toast Logic
├── index.html                             <- Redesigned Spot Homepage
├── courses.html                           <- Courses Catalog & Enrollment Triggers
├── login.html                             <- Unified Students/Faculty Sign-In
├── students.html                          <- Student Course Stats & Progress
├── player.html                            <- In-App Video Playback & Topic Checklist
├── request.html                           <- Student Course Request Form
├── instructors.html                       <- Faculty Panel & Course Publisher
├── style.css                              <- Master Material Design 3 Stylesheet
└── README.md                              <- Project Documentation
```

---

## 🛠️ How to Run Locally

Since this is a client-side web application, you can run it directly:
1. Open `index.html` in any modern web browser.
2. Alternatively, run a local web server (e.g. `npx serve .` or VS Code Live Server extension) for a full simulated deployment experience.
