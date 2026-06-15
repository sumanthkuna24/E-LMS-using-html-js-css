// NIRIMI Learn - Client Side localStorage Database and Service Layer

const LMS_DB = {
    // Initial Seed Data
    seedCourses: [
        {
            id: "course-1",
            title: "Introduction to Programming",
            category: "General",
            description: "Learn the absolute fundamentals of programming. Build problem-solving skills, understand computational logic, and write your first lines of code.",
            image: "assets/images/course_intro_programming.png",
            instructor: "Dr. Sarah Jenkins",
            lessons: [
                { title: "What is Programming & Code?", duration: "10:15", videoId: "zOjov-2OZ0E" },
                { title: "How Computers Understand Instructions", duration: "12:40", videoId: "OAx_6-wdslM" },
                { title: "Variables, Math, and Logic Operations", duration: "15:20", videoId: "cM37TjLwKVo" },
                { title: "Control Flows: Loops and Conditionals", duration: "18:10", videoId: "m2uxS5C-T74" }
            ]
        },
        {
            id: "course-2",
            title: "Web Development Fundamentals",
            category: "Frontend",
            description: "Master the structure, style, and interactivity of modern websites. Learn HTML5, CSS3 grid layouts, and introductory client-side JavaScript.",
            image: "assets/images/course_web_dev.png",
            instructor: "Alex Rivers",
            lessons: [
                { title: "HTML5 Document Structure & Elements", duration: "14:30", videoId: "UB1O30zR-EE" },
                { title: "CSS3 Flexbox and CSS Grid layouts", duration: "19:45", videoId: "yfoY53QXEnI" },
                { title: "Introduction to DOM and Event Listeners", duration: "22:10", videoId: "W6NZfCO5SIk" }
            ]
        },
        {
            id: "course-3",
            title: "React.js Essentials",
            category: "Frontend",
            description: "Build rapid and dynamic single page web applications. Learn modular components, custom properties (props), state hook, and modern lifecycle hooks.",
            image: "assets/images/course_react.png",
            instructor: "Maya Lin",
            lessons: [
                { title: "React Core Concepts & Setup", duration: "11:55", videoId: "Ke90Tje7VS0" },
                { title: "Reusable UI Components and Props", duration: "16:40", videoId: "bMknfKXIFA8" },
                { title: "Managing State with the useState Hook", duration: "20:15", videoId: "hQAHJsKyO8w" }
            ]
        },
        {
            id: "course-4",
            title: "Advanced JavaScript Techniques",
            category: "Frontend",
            description: "Go deep under the hood of Javascript. Master functional execution scope, closures, prototypal inheritance, and asynchronous promises.",
            image: "assets/images/course_advanced_js.png",
            instructor: "Dr. Sarah Jenkins",
            lessons: [
                { title: "Deep Dive into JavaScript Closures", duration: "18:05", videoId: "3a0I8FLdqyk" },
                { title: "Asynchronous Flow: Promises & Async/Await", duration: "25:30", videoId: "V_Kr9OSfDeU" },
                { title: "Understanding Prototypes & Object Models", duration: "21:10", videoId: "1UTqEz05p3E" }
            ]
        },
        {
            id: "course-5",
            title: "Machine Learning Basics",
            category: "AI",
            description: "Unlock the fundamentals of AI algorithms. Work with linear regression models, neural pathways, and predictive models using Python tools.",
            image: "assets/images/course_machine_learning.png",
            instructor: "Prof. Kenneth Cole",
            lessons: [
                { title: "Introduction to Artificial Intelligence & ML", duration: "15:50", videoId: "hDKCxebpknY" },
                { title: "Supervised vs. Unsupervised Learning Models", duration: "17:40", videoId: "z-EtmaFJieY" },
                { title: "Understanding Linear Regression & Data Fitting", duration: "24:12", videoId: "E5RjxoATH70" }
            ]
        },
        {
            id: "course-6",
            title: "Data Science Basics",
            category: "Data Science",
            description: "Master datasets, statistical modeling, data mining cycles, and generating reports. Perfect for junior data analysts looking to pivot.",
            image: "assets/images/course_data_science.png",
            instructor: "Diana Croft",
            lessons: [
                { title: "The Data Science Lifecycle", duration: "12:10", videoId: "ua-CiDNNj30" },
                { title: "Introduction to Data Wrangling & Analysis", duration: "18:35", videoId: "41wWJ04dJ3s" },
                { title: "Data Analysis and Libraries (Pandas/NumPy)", duration: "23:50", videoId: "GPVsHOlU28E" }
            ]
        }
    ],

    // LocalStorage keys
    KEYS: {
        COURSES: "nirimi_courses",
        USERS: "nirimi_users",
        ENROLLMENTS: "nirimi_enrollments",
        REQUESTS: "nirimi_requests",
        CURRENT_USER: "nirimi_current_user"
    },

    // Initialization
    init() {
        if (!localStorage.getItem(this.KEYS.COURSES)) {
            localStorage.setItem(this.KEYS.COURSES, JSON.stringify(this.seedCourses));
        }
        if (!localStorage.getItem(this.KEYS.USERS)) {
            // Seed a default instructor and a default student
            const defaultUsers = [
                { id: "u-inst", username: "instructor", email: "instructor@nirimi.com", password: "password", role: "instructor" },
                { id: "u-stud", username: "student", email: "student@nirimi.com", password: "password", role: "student" }
            ];
            localStorage.setItem(this.KEYS.USERS, JSON.stringify(defaultUsers));
        }
        if (!localStorage.getItem(this.KEYS.ENROLLMENTS)) {
            localStorage.setItem(this.KEYS.ENROLLMENTS, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.REQUESTS)) {
            localStorage.setItem(this.KEYS.REQUESTS, JSON.stringify([]));
        }
    },

    // Get Data
    getData(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },

    // Save Data
    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // --- COURSES ---
    getCourses() {
        return this.getData(this.KEYS.COURSES);
    },

    getCourse(id) {
        const courses = this.getCourses();
        return courses.find(c => c.id === id) || null;
    },

    addCourse(title, category, description, lessonsList, instructorName) {
        const courses = this.getCourses();
        // Parse lessons list
        const lessons = lessonsList.map((l, index) => {
            let vId = "zOjov-2OZ0E"; // default fall back
            if (l.url) {
                // Extract video ID from youtube URL
                const match = l.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
                if (match && match[1]) {
                    vId = match[1];
                }
            }
            return {
                title: l.title || `Lesson ${index + 1}`,
                duration: l.duration || "15:00",
                videoId: vId
            };
        });

        const newCourse = {
            id: "course-" + Date.now(),
            title,
            category,
            description,
            image: "assets/images/course_intro_programming.png", // fallback cover
            instructor: instructorName || "Guest Instructor",
            lessons
        };

        courses.push(newCourse);
        this.saveData(this.KEYS.COURSES, courses);
        return newCourse;
    },

    // --- USERS ---
    register(username, email, password, role) {
        const users = this.getData(this.KEYS.USERS);
        if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
            return { success: false, message: "Username already exists!" };
        }
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, message: "Email already exists!" };
        }

        const newUser = {
            id: "user-" + Date.now(),
            username,
            email,
            password,
            role: role || "student" // student or instructor
        };
        users.push(newUser);
        this.saveData(this.KEYS.USERS, users);
        return { success: true, user: newUser };
    },

    login(usernameOrEmail, password) {
        const users = this.getData(this.KEYS.USERS);
        const user = users.find(u => 
            (u.username.toLowerCase() === usernameOrEmail.toLowerCase() || 
             u.email.toLowerCase() === usernameOrEmail.toLowerCase()) && 
            u.password === password
        );
        if (user) {
            this.saveData(this.KEYS.CURRENT_USER, user);
            return { success: true, user };
        }
        return { success: false, message: "Invalid credentials. Try username: 'student' or 'instructor' with password: 'password'." };
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.KEYS.CURRENT_USER)) || null;
    },

    logout() {
        localStorage.removeItem(this.KEYS.CURRENT_USER);
    },

    // --- ENROLLMENTS ---
    getEnrollments() {
        return this.getData(this.KEYS.ENROLLMENTS);
    },

    enrollStudent(studentId, courseId) {
        const enrollments = this.getEnrollments();
        const existing = enrollments.find(e => e.studentId === studentId && e.courseId === courseId);
        if (existing) return { success: false, message: "Already enrolled in this course!" };

        const course = this.getCourse(courseId);
        if (!course) return { success: false, message: "Course not found!" };

        const newEnrollment = {
            id: "enroll-" + Date.now(),
            studentId,
            courseId,
            progressPercent: 0,
            completedLessons: new Array(course.lessons.length).fill(false),
            enrollmentDate: new Date().toLocaleDateString()
        };

        enrollments.push(newEnrollment);
        this.saveData(this.KEYS.ENROLLMENTS, enrollments);
        return { success: true, enrollment: newEnrollment };
    },

    getStudentEnrollments(studentId) {
        const enrollments = this.getEnrollments();
        const studentEnrollments = enrollments.filter(e => e.studentId === studentId);
        
        return studentEnrollments.map(e => {
            const course = this.getCourse(e.courseId);
            return {
                ...e,
                courseDetails: course
            };
        });
    },

    updateLessonProgress(studentId, courseId, lessonIndex, isCompleted) {
        const enrollments = this.getEnrollments();
        const index = enrollments.findIndex(e => e.studentId === studentId && e.courseId === courseId);
        if (index === -1) return { success: false, message: "Enrollment record not found." };

        const enrollment = enrollments[index];
        enrollment.completedLessons[lessonIndex] = isCompleted;

        // Recalculate percent
        const completedCount = enrollment.completedLessons.filter(val => val === true).length;
        enrollment.progressPercent = Math.round((completedCount / enrollment.completedLessons.length) * 100);

        enrollments[index] = enrollment;
        this.saveData(this.KEYS.ENROLLMENTS, enrollments);
        return { success: true, enrollment };
    },

    // --- COURSE REQUESTS ---
    getRequests() {
        return this.getData(this.KEYS.REQUESTS);
    },

    submitCourseRequest(name, email, phone, gender, courseName, category, field) {
        const requests = this.getRequests();
        const newRequest = {
            id: "req-" + Date.now(),
            name,
            email,
            phone,
            gender,
            courseName,
            category, // Technical, Non-Technical, etc.
            field, // Frontend, Backend, etc.
            date: new Date().toLocaleDateString(),
            status: "pending"
        };
        requests.push(newRequest);
        this.saveData(this.KEYS.REQUESTS, requests);
        return { success: true, request: newRequest };
    }
};

// Auto-run DB init on import/script execution
LMS_DB.init();

// Toast Notifications helper utility
function showToast(message, type = "info") {
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <span class="toast-close" onclick="this.parentElement.remove()">&times;</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 4s
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-10px)";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Global UI Navbar State logic helper
function updateGlobalNavbar() {
    const user = LMS_DB.getCurrentUser();
    const navRight = document.querySelector(".nav-right");
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    // Build responsive mobile menu button if not exists
    let menuBtn = document.querySelector(".mobile-menu-btn");
    if (!menuBtn) {
        menuBtn = document.createElement("button");
        menuBtn.className = "mobile-menu-btn";
        menuBtn.innerHTML = "<span></span><span></span><span></span>";
        navbar.insertBefore(menuBtn, navbar.firstChild);
        
        menuBtn.addEventListener("click", () => {
            const navLinks = document.querySelector(".nav-links");
            navLinks.classList.toggle("active");
            menuBtn.classList.toggle("active");
        });
    }

    const navLinksContainer = document.querySelector(".nav-links");
    if (!navLinksContainer) return;

    // Render Navigation links dynamically based on user role
    let linksHtml = `
        <a href="index.html">Home</a>
        <a href="courses.html">Courses</a>
    `;

    if (user) {
        if (user.role === "student") {
            linksHtml += `
                <a href="students.html">My Dashboard</a>
                <a href="request.html">Request Course</a>
            `;
        } else if (user.role === "instructor") {
            linksHtml += `
                <a href="instructors.html">Instructor Portal</a>
            `;
        }
        linksHtml += `
            <span class="navbar-user-badge">Hello, <strong>${user.username}</strong></span>
            <a href="#" class="nav-btn nav-btn-outline" onclick="handleLogoutClick(event)">Logout</a>
        `;
    } else {
        linksHtml += `
            <a href="login.html" class="nav-btn nav-btn-primary">Login / Sign Up</a>
        `;
    }
    
    navLinksContainer.innerHTML = linksHtml;
}

function handleLogoutClick(e) {
    e.preventDefault();
    LMS_DB.logout();
    showToast("Logged out successfully", "success");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    updateGlobalNavbar();
});
