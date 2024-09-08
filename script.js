"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import html2pdf from npm
const html2pdf_js_1 = __importDefault(require("html2pdf.js"));
// Accessing DOM elements
const form = document.getElementById('resume-form');
const resumeContainer = document.getElementById('resume-container');
const resume = document.getElementById('resume');
const resumeName = document.getElementById('resume-name');
const resumeTitle = document.getElementById('resume-title');
const resumeSkills = document.getElementById('resume-skills');
const shareButton = document.getElementById('share-link');
const downloadButton = document.getElementById('download-pdf');
// Event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Collect input values
    const username = document.getElementById('username').value.trim();
    const name = document.getElementById('name').value.trim();
    const title = document.getElementById('title').value.trim();
    const skills = document.getElementById('skills').value.split(',');
    // Display and populate resume
    resumeContainer.classList.remove('hidden');
    resumeName.textContent = name;
    resumeTitle.textContent = title;
    resumeSkills.innerHTML = ''; // Clear existing list items
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill.trim();
        resumeSkills.appendChild(li);
    });
    // Generate shareable link
    shareButton.onclick = () => {
        const uniqueUrl = `https://github.app/resume/${username}`;
        alert(`Your resume link: ${uniqueUrl}`);
    };
    // Download resume as PDF
    downloadButton.onclick = () => {
        if (!resume) {
            console.error('Resume element not found!');
            return;
        }
        const options = {
            margin: 1,
            filename: `${username}_resume.pdf`,
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait' }
        };
        (0, html2pdf_js_1.default)().from(resume).set(options).save().catch((error) => {
            console.error('Error generating PDF:', error);
        });
    };
});
