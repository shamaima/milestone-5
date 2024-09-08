// Import html2pdf from npm
import html2pdf from 'html2pdf.js';

// Accessing DOM elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeContainer = document.getElementById('resume-container') as HTMLDivElement;
const resume = document.getElementById('resume') as HTMLDivElement;
const resumeName = document.getElementById('resume-name') as HTMLHeadingElement;
const resumeTitle = document.getElementById('resume-title') as HTMLParagraphElement;
const resumeSkills = document.getElementById('resume-skills') as HTMLUListElement;
const shareButton = document.getElementById('share-link') as HTMLButtonElement;
const downloadButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Collect input values
  const username = (document.getElementById('username') as HTMLInputElement).value.trim();
  const name = (document.getElementById('name') as HTMLInputElement).value.trim();
  const title = (document.getElementById('title') as HTMLInputElement).value.trim();
  const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.split(',');

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

    html2pdf().from(resume).set(options).save().catch((error) => {
      console.error('Error generating PDF:', error);
    });
  };
});
