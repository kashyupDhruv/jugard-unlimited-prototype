// Roadmap Definitions
const careerRoadmaps = {
    "Cybersecurity Analyst": [
        { id: 'm1', title: "Programming Fundamentals", topics: ["Python"] },
        { id: 'm2', title: "Networking", topics: ["TCP/IP", "DNS", "HTTP/HTTPS", "Network Security Basics"] },
        { id: 'm3', title: "Linux", topics: ["Linux Commands", "File Permissions", "Processes", "Shell Basics"] },
        { id: 'm4', title: "Web Security", topics: ["OWASP", "Authentication", "XSS", "SQL Injection", "CSRF"] },
        { id: 'm5', title: "Security Tools", topics: ["Wireshark", "Nmap", "Burp Suite"] },
        { id: 'm6', title: "Projects", topics: ["Network Scanner", "Vulnerability Scanner", "Web Security Lab"] },
        { id: 'm7', title: "Career Preparation", topics: ["Resume", "Portfolio", "Interview Preparation"] }
    ],
    "Full Stack Developer": [
        { id: 'm1', title: "Frontend Basics", topics: ["HTML", "CSS", "JavaScript"] },
        { id: 'm2', title: "Frontend Frameworks", topics: ["React", "State Management"] },
        { id: 'm3', title: "Backend Basics", topics: ["Node.js", "Express"] },
        { id: 'm4', title: "Databases", topics: ["SQL", "MongoDB"] },
        { id: 'm5', title: "Deployment", topics: ["Git", "Docker", "AWS"] },
        { id: 'm6', title: "Projects", topics: ["E-commerce App", "Blog Platform"] },
        { id: 'm7', title: "Career Preparation", topics: ["Resume", "Portfolio", "Interview Preparation"] }
    ],
    "Default": [
        { id: 'm1', title: "Foundations", topics: ["Basic Concepts", "Core Tools"] },
        { id: 'm2', title: "Intermediate Skills", topics: ["Advanced Topics", "Practical Application"] },
        { id: 'm3', title: "Advanced Projects", topics: ["Capstone Project"] }
    ]
};

// Mock Resources Data
const resourcesData = {
    "Networking": [
        { title: "Networking Fundamentals", category: "Course", difficulty: "Beginner", time: "4 Hours", desc: "Learn the basics of computer networks." },
        { title: "TCP/IP Explained", category: "Video", difficulty: "Intermediate", time: "45 Mins", desc: "Deep dive into the TCP/IP model." },
        { title: "DNS Basics", category: "Documentation", difficulty: "Beginner", time: "30 Mins", desc: "How Domain Name System works." },
        { title: "Network Security Basics", category: "Course", difficulty: "Intermediate", time: "3 Hours", desc: "Securing modern networks." }
    ],
    "Linux": [
        { title: "Linux Crash Course", category: "Video", difficulty: "Beginner", time: "1 Hour", desc: "Essential Linux commands." },
        { title: "File Permissions", category: "Documentation", difficulty: "Beginner", time: "20 Mins", desc: "Understanding chmod and chown." },
        { title: "Shell Scripting 101", category: "Course", difficulty: "Intermediate", time: "2 Hours", desc: "Automate tasks with Bash." }
    ],
    "Web Security": [
        { title: "OWASP Top 10", category: "Documentation", difficulty: "Beginner", time: "2 Hours", desc: "The top web application security risks." },
        { title: "XSS & SQL Injection", category: "Video", difficulty: "Intermediate", time: "1.5 Hours", desc: "Understanding common vulnerabilities." },
        { title: "Web Hacking Lab", category: "Project", difficulty: "Advanced", time: "5 Hours", desc: "Hands-on practice in a safe environment." }
    ],
    "Default": [
         { title: "General Overview", category: "Course", difficulty: "Beginner", time: "2 Hours", desc: "Introduction to the topic." },
         { title: "Practice Guide", category: "Documentation", difficulty: "Intermediate", time: "1 Hour", desc: "Step-by-step practice." }
    ]
};
