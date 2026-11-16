// App State Management
let appState = {
    name: '',
    career: '',
    skills: [],
    roadmap: [], // Array of roadmap items with status
    progress: 0,
    nextStep: ''
};

// DOM Elements
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-links li');
const viewSections = document.querySelectorAll('.view-section');
const skillInput = document.getElementById('input-skill');
const btnAddSkill = document.getElementById('btn-add-skill');
const skillChipsContainer = document.getElementById('skill-chips-container');
const profileForm = document.getElementById('profile-form');

// Initialization
function init() {
    const savedState = localStorage.getItem('jugaad_state');
    if (savedState) {
        appState = JSON.parse(savedState);
        showSection('dashboard');
        updateUI();
    } else {
        showSection('welcome');
    }
    setupEventListeners();
}

function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = e.target.getAttribute('data-target');
            showSection(target);
            updateNavUI(e.target);
        });
    });

    // Welcome Screen
    document.getElementById('btn-create-roadmap').addEventListener('click', () => {
        showSection('student-form');
    });
    
    document.getElementById('btn-demo').addEventListener('click', loadDemoMode);

    // Profile Form - Add Skill
    btnAddSkill.addEventListener('click', addSkillFromInput);
    skillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkillFromInput();
        }
    });

    // Profile Form - Submit
    profileForm.addEventListener('submit', handleProfileSubmit);

    // Analysis to Dashboard
    document.getElementById('btn-go-dashboard').addEventListener('click', () => {
        showSection('dashboard');
    });

    // Dashboard jump to resources
    document.getElementById('btn-jump-resources').addEventListener('click', () => {
        showSection('resources');
        updateNavUI(document.querySelector('[data-target="resources"]'));
    });

    // Edit Profile / Reset
    document.getElementById('btn-edit-profile').addEventListener('click', resetApp);
    document.getElementById('btn-logout').addEventListener('click', resetApp);
}

// Navigation Logic
function showSection(sectionId) {
    viewSections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    // Show/Hide Sidebar
    if (sectionId === 'welcome' || sectionId === 'student-form' || sectionId === 'analysis') {
        sidebar.classList.add('hidden');
    } else {
        sidebar.classList.remove('hidden');
    }
}

function updateNavUI(activeElement) {
    navLinks.forEach(link => link.classList.remove('active'));
    if(activeElement) activeElement.classList.add('active');
}

// Form & Skill Logic
function addSkillFromInput() {
    const val = skillInput.value.trim();
    if (val && !appState.skills.includes(val)) {
        appState.skills.push(val);
        renderFormSkills();
    }
    skillInput.value = '';
}

function removeSkill(skill) {
    appState.skills = appState.skills.filter(s => s !== skill);
    renderFormSkills();
}

function renderFormSkills() {
    skillChipsContainer.innerHTML = '';
    appState.skills.forEach(skill => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.innerHTML = `${skill} <span class="remove" onclick="removeSkill('${skill}')">&times;</span>`;
        skillChipsContainer.appendChild(chip);
    });
}

// Core Logic: Profile Submit & Roadmap Generation
function handleProfileSubmit(e) {
    e.preventDefault();
    appState.name = document.getElementById('input-name').value;
    appState.career = document.getElementById('input-career').value;
    
    if (appState.skills.length === 0) {
        alert("Please add at least one current skill.");
        return;
    }

    generateRoadmap();
    saveState();
    
    // Show Analysis Animation
    showSection('analysis');
    document.getElementById('analysis-loading').classList.remove('hidden');
    document.getElementById('analysis-results').classList.add('hidden');

    // Simulate API delay
    setTimeout(() => {
        document.getElementById('analysis-loading').classList.add('hidden');
        document.getElementById('analysis-results').classList.remove('hidden');
        renderAnalysisResults();
        updateUI(); // Pre-render dashboard and other screens
    }, 2000);
}

function generateRoadmap() {
    const template = careerRoadmaps[appState.career] || careerRoadmaps["Default"];
    appState.roadmap = JSON.parse(JSON.stringify(template)); // Deep copy
    
    let foundFirstInProgress = false;

    // Simulate smart mapping: if user has a skill, mark related module complete
    // For prototype simplicity: If module 1 is "Programming Fundamentals" and user has "Python", mark complete
    appState.roadmap.forEach((module, index) => {
        // Simple logic for demo: module 1 is usually basic skills user already entered
        let hasOverlap = module.topics.some(t => appState.skills.includes(t));
        
        // Hardcode for Demo specific scenario (Cybersecurity + Python/SQL/HTML)
        if (appState.career === "Cybersecurity Analyst" && index === 0 && appState.skills.includes("Python")) {
            hasOverlap = true;
        }

        if (hasOverlap) {
            module.status = 'completed';
        } else if (!foundFirstInProgress) {
            module.status = 'in-progress';
            foundFirstInProgress = true;
            appState.nextStep = module.title;
        } else {
            module.status = 'locked';
        }
    });

    // Fallback if all completed or none completed
    if (!foundFirstInProgress && appState.roadmap.length > 0) {
        let firstLocked = appState.roadmap.find(m => m.status === 'locked');
        if(firstLocked) {
             firstLocked.status = 'in-progress';
             appState.nextStep = firstLocked.title;
        } else {
             appState.nextStep = "All Complete!";
        }
    }

    calculateProgress();
}

function calculateProgress() {
    const total = appState.roadmap.length;
    if (total === 0) return;
    const completed = appState.roadmap.filter(m => m.status === 'completed').length;
    appState.progress = Math.round((completed / total) * 100);
}

// Mark Complete Logic (Smart Feedback Loop)
window.markComplete = function(moduleId) {
    let currentIdx = appState.roadmap.findIndex(m => m.id === moduleId);
    if(currentIdx > -1) {
        appState.roadmap[currentIdx].status = 'completed';
        
        // Unlock next
        if (currentIdx + 1 < appState.roadmap.length) {
            appState.roadmap[currentIdx + 1].status = 'in-progress';
            appState.nextStep = appState.roadmap[currentIdx + 1].title;
        } else {
            appState.nextStep = "Journey Completed! 🎉";
        }
        
        calculateProgress();
        saveState();
        updateUI(); // Re-render everything
    }
}

// UI Rendering Functions
function updateUI() {
    renderDashboard();
    renderRoadmap();
    renderResources();
    renderProgress();
    renderProfile();
    
    // Update dynamic text
    document.querySelectorAll('.dyn-goal').forEach(el => el.textContent = appState.career);
}

function renderAnalysisResults() {
    document.getElementById('ar-goal').textContent = appState.career;
    
    const arSkills = document.getElementById('ar-skills');
    arSkills.innerHTML = '';
    appState.skills.forEach(s => {
        arSkills.innerHTML += `<li>${s}</li>`;
    });

    const arGaps = document.getElementById('ar-gaps');
    arGaps.innerHTML = '';
    
    // Find gaps (topics in locked or in-progress modules)
    let gaps = [];
    appState.roadmap.forEach(m => {
        if(m.status !== 'completed') {
            gaps.push(m.title); // Using module title as high-level gap for UI simplicity
        }
    });
    
    gaps.slice(0, 3).forEach(gap => {
        arGaps.innerHTML += `<li>${gap}</li>`;
    });
}

function renderDashboard() {
    document.getElementById('dash-name').textContent = appState.name.split(' ')[0] || 'Student';
    document.getElementById('dash-next-step').textContent = `Learn ${appState.nextStep}`;
    document.getElementById('dash-progress-text').textContent = `${appState.progress}%`;
    document.getElementById('dash-progress-fill').style.width = `${appState.progress}%`;
    document.getElementById('dash-goal').textContent = appState.career;
    
    const dashSkills = document.getElementById('dash-skills');
    dashSkills.innerHTML = appState.skills.map(s => `<div class="chip">✓ ${s}</div>`).join('');
    
    const dashGaps = document.getElementById('dash-gaps');
    let gaps = appState.roadmap.filter(m => m.status !== 'completed').map(m => m.title).slice(0,3);
    dashGaps.innerHTML = gaps.map(g => `<div class="chip">○ ${g}</div>`).join('');
}

function renderRoadmap() {
    const timeline = document.getElementById('roadmap-timeline');
    timeline.innerHTML = '';
    
    appState.roadmap.forEach((module, index) => {
        let badgeClass = module.status === 'completed' ? 'badge-completed' : 
                         module.status === 'in-progress' ? 'badge-in-progress' : 'badge-locked';
        let badgeText = module.status === 'completed' ? 'COMPLETED' : 
                        module.status === 'in-progress' ? 'IN PROGRESS' : 'LOCKED';
                        
        let actionBtn = module.status === 'in-progress' 
            ? `<button class="btn-primary mt-2" onclick="markComplete('${module.id}')">Mark Complete</button>` 
            : '';

        let html = `
            <div class="roadmap-item ${module.status}">
                <div class="roadmap-content">
                    <h3>${index + 1}. ${module.title} <span class="status-badge ${badgeClass}">${badgeText}</span></h3>
                    <ul class="roadmap-topics">
                        ${module.topics.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                    ${actionBtn}
                </div>
            </div>
        `;
        timeline.innerHTML += html;
    });
}

function renderResources() {
    document.getElementById('res-current-step').textContent = appState.nextStep;
    const grid = document.getElementById('resources-grid');
    grid.innerHTML = '';

    // Fetch resources based on next step, fallback to Default
    let resources = resourcesData[appState.nextStep] || resourcesData["Default"];
    
    if (appState.progress === 100) {
        grid.innerHTML = '<p class="text-muted">You have completed your roadmap! Start building real-world projects or applying for jobs.</p>';
        return;
    }

    resources.forEach(res => {
        grid.innerHTML += `
            <div class="res-card">
                <span class="category">${res.category} • ${res.difficulty}</span>
                <h3>${res.title}</h3>
                <p>${res.desc}</p>
                <div class="res-meta">
                    <span>⏱ ${res.time}</span>
                </div>
                <button class="btn-outline full-width">Open Resource</button>
            </div>
        `;
    });
}

function renderProgress() {
    document.getElementById('stat-progress').textContent = `${appState.progress}%`;
    
    const completedCount = appState.roadmap.filter(m => m.status === 'completed').length;
    document.getElementById('stat-modules').textContent = `${completedCount} / ${appState.roadmap.length}`;
    
    // Estimate hours
    document.getElementById('stat-hours').textContent = (completedCount * 12) + " Hrs";
    
    document.getElementById('chart-fill').style.width = `${appState.progress}%`;
    document.getElementById('chart-label').textContent = `${appState.progress}% of Roadmap Completed`;
}

function renderProfile() {
    document.getElementById('prof-name').textContent = appState.name || 'Demo Student';
    document.getElementById('prof-goal').textContent = appState.career;
    
    const profSkills = document.getElementById('prof-skills');
    profSkills.innerHTML = appState.skills.map(s => `<div class="chip">${s}</div>`).join('');
}

// Storage
function saveState() {
    localStorage.setItem('jugaad_state', JSON.stringify(appState));
}

// Demo Mode
function loadDemoMode() {
    appState = {
        name: "Demo Student",
        career: "Cybersecurity Analyst",
        skills: ["Python", "SQL", "HTML"],
        progress: 14, // Roughly 1/7
        nextStep: "Networking",
        roadmap: [
            { id: 'm1', title: "Programming Fundamentals", topics: ["Python"], status: "completed" },
            { id: 'm2', title: "Networking", topics: ["TCP/IP", "DNS", "HTTP/HTTPS", "Network Security Basics"], status: "in-progress" },
            { id: 'm3', title: "Linux", topics: ["Linux Commands", "File Permissions", "Processes", "Shell Basics"], status: "locked" },
            { id: 'm4', title: "Web Security", topics: ["OWASP", "Authentication", "XSS", "SQL Injection", "CSRF"], status: "locked" },
            { id: 'm5', title: "Security Tools", topics: ["Wireshark", "Nmap", "Burp Suite"], status: "locked" },
            { id: 'm6', title: "Projects", topics: ["Network Scanner", "Vulnerability Scanner", "Web Security Lab"], status: "locked" },
            { id: 'm7', title: "Career Preparation", topics: ["Resume", "Portfolio", "Interview Preparation"], status: "locked" }
        ]
    };
    calculateProgress(); // ensure correct progress based on demo state
    saveState();
    showSection('dashboard');
    updateNavUI(document.querySelector('[data-target="dashboard"]'));
    updateUI();
}

// Reset App
function resetApp() {
    localStorage.removeItem('jugaad_state');
    appState = { name: '', career: '', skills: [], roadmap: [], progress: 0, nextStep: '' };
    location.reload();
}

// Boot
init();
