<h1>Jugaad Unlimited (Prototype)</h1>
<h2>Project Overview</h2>

This is a prototype version of "Jugaad Unlimited". The term "Jugaad" refers to creative problem-solving or innovative workarounds. This project serves as a web-based platform or showcase to display such innovative ideas, hacks, and solutions. Being a prototype, it is currently in its initial development phase.

<h3>Tech Stack</h3>
<ul>
  <li>This project is built entirely on standard web technologies:</li>
  <li>HTML5: For the basic structure and layout.</li>
  <li>CSS3: For styling and user interface design.</li>
  <li>JavaScript: For frontend logic and interactivity (Data and App logic are managed separately).</li>

</ul>
<h2>File Structure</h2>
The main components of the project are as follows:
<ul>
	<li>index.html: The main entry point and home page of the website.</li>
	<li>css/style.css: Contains all the design styles and layouts for the project.</li>
	<li>js/data.js: This file is used to store static data, content, or JSON objects for the website.</li>
	<li>js/app.js: The main application logic that makes the website interactive. </li>
	<li>It fetches data from data.js and renders it dynamically on the UI.</li>
</ul>

<h1 style="text-align:center;">Application Interface & Features</h1>
<dl>
	<dt>
		Landing Page (Welcome Screen)
	</dt>
	<dd>
		This is the entry point of the application that introduces the user to the platform's core vision. It features a clear tagline ("One Goal. One Roadmap. One Next Step.") and two Call-to-Action (CTA) buttons: "Create My Roadmap" (to start a new journey) and "Try Demo" (to explore the platform).
		<img width="100%"  alt="1" src="https://github.com/user-attachments/assets/96c4e528-e858-4f1c-930b-d603e9c10438" />
	</dd>
	<dt>
		Student Profile Setup (Onboarding)
	</dt>
	<dd>
		Here, the user sets up their profile to generate a personalized experience. The user enters their Full Name, target Career Goal (e.g., 'Full Stack Developer'), and their existing 			skills (Current Skills).
		<img width="100%"  alt="2" src="https://github.com/user-attachments/assets/b803cf45-4967-4d38-8ef3-2e4a30315170" />
	</dd>
	<dt>
		Profile Analysis & Gap Identification
	</dt>
	<dd>
		After form submission, this loading/analysis screen appears. The system maps the user's current skills against the industry requirements for their chosen career goal and identifies the "Skill Gaps" (skills yet to be learned), summarizing them on the screen.
		<img width="100%"  alt="3" src="https://github.com/user-attachments/assets/b9a9d3eb-b1e2-4fa9-bdbd-ceba451eb11c" />
	</dd>
	<dt>
		Main Dashboard (Central Hub)
	</dt>
	<dd>
		This is the main control center of the application, featuring a side navigation bar (Dashboard, My Roadmap, Resources, Progress, Profile). On the main screen, "Your Next Step" is highlighted to keep the user focused, alongside summary cards for learning progress and skill gaps.
		<img width="100%"  alt="4" src="https://github.com/user-attachments/assets/1138ff2e-56cc-411e-865b-ac5c49e29b92" />
	</dd>
	<dt>
		Personalized Roadmap (Core Feature)
	</dt>
	<dd>
		This is the most critical section of the app, displaying a gamified and sequential step-by-step timeline. For example, the first step "Frontend Basics" (HTML, CSS, JS) is shown as in-progress. Subsequent modules (Frontend Frameworks, Backend Basics, Databases) remain "Locked" until the previous step is marked as complete.
		<img width="100%"  alt="5" src="https://github.com/user-attachments/assets/642aae8b-8b0d-4ef7-8d2f-b880c37db7b6" />
	</dd>
	<dt>
		Curated Learning Resources
	</dt>
	<dd>
		Study materials related to the currently active roadmap module are displayed here. It includes resources for different skill levels, such as "General Overview" video courses for beginners and "Documentation" for intermediate practice. An estimated learning time is also provided for each resource.
		<img width="100%" alt="6" src="https://github.com/user-attachments/assets/59ab7513-3c50-4ca9-8e03-efef74da444b" />
	</dd>
	<dt>
		Progress Tracking & Analytics
	</dt>
	<dd>
		This page visualizes the user's journey data to maintain motivation. It tracks key metrics such as Overall Progress percentage, Modules Completed (e.g., 0/7), Total Learning Hours, and a "Current Streak" (e.g., 7 Days) to encourage consistency.
		<img width="100%" alt="7" src="https://github.com/user-attachments/assets/7283c55a-6e05-4c29-ae37-691baaa377e8" />
	</dd>
</dl>
