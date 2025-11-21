document.addEventListener("DOMContentLoaded", () => {
  const data = resumeData;

  // Hero
  document.getElementById("hero-content").innerHTML = `
    <img src="${data.photo}" alt="${data.name}" class="profile-photo"/>
    <h1>${data.name}</h1>
    <h2>${data.title} • ${data.tagline}</h2>
    <p class="location"><i class="fas fa-map-marker-alt"></i> ${data.location}</p>
    <div class="contacts">
      <a href="mailto:${data.email}"><i class="fas fa-envelope"></i> ${data.email}</a>
      <a href="${data.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
      <a href="${data.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
    </div>
    <a href="${data.resumePdf}" class="btn-primary" download id="download-btn">
      <i class="fas fa-download"></i> Download PDF Resume <span id="counter">(0)</span>
    </a>
  `;

  // About
  document.getElementById("about").innerHTML = `<h3>About</h3><p>${data.about}</p>`;

  // Experience
  let expHTML = "<h3>Experience</h3>";
  data.experience.forEach(job => {
    expHTML += `
      <div class="job">
        <div class="job-header">
          <img src="${job.logo}" alt="${job.company}"/>
          <div>
            <h4>${job.title}</h4>
            <p class="company">${job.company} <span class="date">${job.date}</span></p>
            <p class="location">${job.location}</p>
          </div>
        </div>
        <ul>${job.achievements.map(a => `<li>${a}</li>`).join("")}</ul>
      </div>`;
  });
  document.getElementById("experience").innerHTML = expHTML;

  // Education
  document.getElementById("education").innerHTML = `
    <h3>Education</h3>
    <div class="job-header"><div>
      <h4>${data.education.degree}</h4>
      <p class="company">${data.education.school} <span class="date">${data.education.date}</span></p>
    </div></div>
  `;

  // Skills with progress bars
  let skillsHTML = "<h3>Skills</h3><div class='skills-grid'>";
  data.skills.forEach(s => {
    skillsHTML += `
      <div class="skill-item">
        <span>${s.name}</span>
      </div>`;
  });
  skillsHTML += "</div>";
  document.getElementById("skills").innerHTML = skillsHTML;

  // Projects
  let projHTML = "<h3>Projects</h3><div class='projects-grid'>";
  data.projects.forEach(p => {
    projHTML += `<a href="${p.link}" target="_blank" class="project-card">
      <h4>${p.name}</h4><p>${p.desc}</p>
    </a>`;
  });
  projHTML += "</div>";
  document.getElementById("projects").innerHTML = projHTML;

  // Footer
  document.getElementById("footer").innerHTML = `<p>© ${new Date().getFullYear()} ${data.name}. Made with ☕ and JavaScript.</p>`;

  // Dark mode toggle
  const toggle = document.querySelector(".theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("theme");
  const isDark = saved ? saved === "dark" : prefersDark;

  if (isDark) document.body.classList.add("dark");
  toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const nowDark = document.body.classList.contains("dark");
    toggle.innerHTML = nowDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", nowDark ? "dark" : "light");
  });

  // Download counter (just for fun)
  let count = localStorage.getItem("downloads") || 0;
  document.getElementById("counter").textContent = `(${count})`;
  document.getElementById("download-btn").addEventListener("click", () => {
    count++;
    localStorage.setItem("downloads", count);
    document.getElementById("counter").textContent = `(${count})`;
  });
});

