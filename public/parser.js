// Client-side Resume PDF/DOCX Parser for CareerPilot AI
import { JOBS } from "/jobs-data.js";
async function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function extractTextFromPdf(arrayBuffer) {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');
  const pdfjsLib = window['pdfjs-dist/build/pdf'];
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    text += strings.join(' ') + '\n';
  }
  return text;
}

async function extractTextFromDocx(arrayBuffer) {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js');
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

export function parseResumeText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // 1. Extract Email
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = text.match(emailRegex) || [];
  const email = emails[0] || '';
  
  // 2. Extract Name (typically first non-empty line)
  let name = '';
  if (lines.length > 0) {
    name = lines[0];
    if (name.length > 50 || /\b(resume|cv|curriculum|profile|engineer|developer|designer|page|summary)\b/i.test(name)) {
      name = lines.find(l => l.length > 2 && l.length < 40 && !/\b(resume|cv|curriculum|profile|engineer|developer|designer|page|summary)\b/i.test(l)) || lines[0];
    }
  }
  
  // 3. Extract Skills (check for intersection with a standard list of skills)
  const knownSkills = [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'dart', 'solidity',
    'react', 'angular', 'vue', 'next.js', 'svelte', 'solid', 'node', 'express', 'django', 'flask', 'fastapi', 'flutter',
    'spring', 'laravel', 'rails', 'html', 'css', 'sass', 'tailwind', 'bootstrap', 'material ui', 'responsive design',
    'postgresql', 'mysql', 'mongodb', 'redis', 'sqlite', 'oracle', 'supabase', 'firebase', 'aws', 'gcp', 'azure', 'sql', 'pl/sql',
    'docker', 'kubernetes', 'git', 'github', 'gitlab', 'ci/cd', 'agile', 'scrum', 'jira', 'jenkins', 'linux',
    'figma', 'sketch', 'adobe xd', 'photoshop', 'illustrator', 'ui/ux', 'product design', 'graphic design', 'wireframing', 'prototyping',
    'ai', 'machine learning', 'deep learning', 'nlp', 'llm', 'computer vision', 'data science', 'analytics',
    'tensorflow', 'pytorch', 'pandas', 'numpy', 'transformers', 'data visualization', 'statistics', 'excel', 'power bi',
    'networking', 'cybersecurity', 'siem', 'risk assessment', 'cisco', 'firewall', 'routing', 'security',
    'rest api', 'web3', 'ethereum', 'unity', 'game physics', 'oop', 'system design', 'data structures', 'algorithms',
    'selenium', 'junit', 'automation', 'embedded systems', 'rtos', 'debugging', 'database design', 'performance tuning', 'monitoring', 'mathematics', 'research'
  ];
  const foundSkillsSet = new Set();
  const lowerText = text.toLowerCase();
  knownSkills.forEach(skill => {
    const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let regex;
    if (skill === 'go' || skill === 'c' || skill === 'r') {
      regex = new RegExp(`\\b${escaped}\\b`, 'i');
    } else if (skill === 'c++' || skill === 'c#') {
      regex = new RegExp(`(?:\\s|^)${escaped}(?:\\s|$|[,.;])`, 'i');
    } else {
      regex = new RegExp(`\\b${escaped}\\b`, 'i');
    }
    if (regex.test(lowerText)) {
      const displayMap = {
        'javascript': 'JavaScript', 'typescript': 'TypeScript', 'python': 'Python', 'java': 'Java', 'c++': 'C++', 'c#': 'C#',
        'php': 'PHP', 'ruby': 'Ruby', 'go': 'Go', 'rust': 'Rust', 'swift': 'Swift', 'kotlin': 'Kotlin', 'dart': 'Dart', 'solidity': 'Solidity',
        'react': 'React', 'angular': 'Angular', 'vue': 'Vue.js', 'next.js': 'Next.js', 'svelte': 'Svelte', 'solid': 'Solid.js',
        'node': 'Node.js', 'express': 'Express.js', 'django': 'Django', 'flask': 'Flask', 'fastapi': 'FastAPI', 'flutter': 'Flutter',
        'spring': 'Spring Boot', 'laravel': 'Laravel', 'rails': 'Ruby on Rails', 'html5': 'HTML5', 'CSS': 'CSS3',
        'sass': 'Sass', 'tailwind': 'TailwindCSS', 'bootstrap': 'Bootstrap', 'material ui': 'Material-UI', 'responsive design': 'Responsive Design',
        'postgresql': 'PostgreSQL', 'mysql': 'MySQL', 'mongodb': 'MongoDB', 'redis': 'Redis', 'sqlite': 'SQLite',
        'supabase': 'Supabase', 'firebase': 'Firebase', 'aws': 'AWS', 'gcp': 'GCP', 'azure': 'Azure', 'sql': 'SQL', 'pl/sql': 'PL/SQL',
        'docker': 'Docker', 'kubernetes': 'Kubernetes', 'git': 'Git', 'github': 'GitHub', 'gitlab': 'GitLab',
        'ci/cd': 'CI/CD', 'agile': 'Agile', 'scrum': 'Scrum', 'jira': 'Jira', 'jenkins': 'Jenkins', 'linux': 'Linux',
        'figma': 'Figma', 'sketch': 'Sketch', 'adobe xd': 'Adobe XD', 'photoshop': 'Adobe Photoshop', 'illustrator': 'Adobe Illustrator',
        'ui/ux': 'UI/UX Design', 'product design': 'Product Design', 'graphic design': 'Graphic Design',
        'wireframing': 'Wireframing', 'prototyping': 'Prototyping',
        'ai': 'Artificial Intelligence', 'machine learning': 'Machine Learning', 'deep learning': 'Deep Learning',
        'nlp': 'NLP', 'llm': 'LLMs', 'computer vision': 'Computer Vision', 'data science': 'Data Science', 'analytics': 'Analytics',
        'tensorflow': 'TensorFlow', 'pytorch': 'PyTorch', 'pandas': 'Pandas', 'numpy': 'NumPy', 'transformers': 'Transformers',
        'data visualization': 'Data Visualization', 'statistics': 'Statistics', 'excel': 'Excel', 'power bi': 'Power BI',
        'networking': 'Networking', 'cybersecurity': 'Cybersecurity', 'siem': 'SIEM', 'risk assessment': 'Risk Assessment',
        'cisco': 'Cisco', 'firewall': 'Firewall', 'routing': 'Routing', 'security': 'Security',
        'rest api': 'REST API', 'web3': 'Web3', 'ethereum': 'Ethereum', 'unity': 'Unity', 'game physics': 'Game Physics',
        'oop': 'OOP', 'system design': 'System Design', 'data structures': 'Data Structures', 'algorithms': 'Algorithms',
        'selenium': 'Selenium', 'junit': 'JUnit', 'automation': 'Automation', 'embedded systems': 'Embedded Systems',
        'rtos': 'RTOS', 'debugging': 'Debugging', 'database design': 'Database Design', 'performance tuning': 'Performance Tuning',
        'monitoring': 'Monitoring', 'mathematics': 'Mathematics', 'research': 'Research'
      };
      foundSkillsSet.add(displayMap[skill] || skill);
    }
  });
  const skills = Array.from(foundSkillsSet);
  
  // 4. Section Parsing
  const sectionHeaders = [
    { key: 'experience', patterns: [/experience/i, /work history/i, /employment/i, /professional background/i] },
    { key: 'education', patterns: [/education/i, /academic/i, /qualifications/i, /university/i] },
    { key: 'projects', patterns: [/projects/i, /personal projects/i, /key projects/i, /portfolio/i] }
  ];
  
  const sections = { experience: '', education: '', projects: '' };
  const foundHeaders = [];
  
  sectionHeaders.forEach(section => {
    section.patterns.forEach(pattern => {
      let match;
      const regex = new RegExp(pattern.source, 'gi');
      while ((match = regex.exec(text)) !== null) {
        foundHeaders.push({
          key: section.key,
          index: match.index,
          length: match[0].length
        });
      }
    });
  });
  
  foundHeaders.sort((a, b) => a.index - b.index);
  
  const uniqueHeaders = [];
  let lastIndex = -1;
  foundHeaders.forEach(h => {
    if (h.index > lastIndex + 10) {
      uniqueHeaders.push(h);
      lastIndex = h.index;
    }
  });
  
  for (let i = 0; i < uniqueHeaders.length; i++) {
    const current = uniqueHeaders[i];
    const next = uniqueHeaders[i + 1];
    const start = current.index + current.length;
    const end = next ? next.index : text.length;
    sections[current.key] = text.substring(start, end).trim();
  }
  
  if (!sections.experience && text.toLowerCase().includes('experience')) {
    sections.experience = "Work Experience detected in resume. Open Resume tab to review detail.";
  }
  if (!sections.education && text.toLowerCase().includes('education')) {
    sections.education = "Education history detected in resume. Open Resume tab to review detail.";
  }
  if (!sections.projects && text.toLowerCase().includes('projects')) {
    sections.projects = "Projects list detected in resume. Open Resume tab to review detail.";
  }

  let resumeScore = 50;
  if (email) resumeScore += 10;
  if (name && name !== lines[0]) resumeScore += 5;
  if (skills.length > 3) resumeScore += 10;
  if (sections.experience) resumeScore += 10;
  if (sections.education) resumeScore += 10;
  if (sections.projects) resumeScore += 5;
  resumeScore = Math.min(100, resumeScore + Math.min(10, skills.length));
  
  let readinessScore = Math.min(100, Math.round(resumeScore * 0.8 + (skills.length * 1.5)));

  return {
    name,
    email,
    skills,
    experience: sections.experience || 'No experience section detected.',
    education: sections.education || 'No education section detected.',
    projects: sections.projects || 'No projects section detected.',
    raw_text: text,
    resume_score: resumeScore,
    readiness_score: readinessScore
  };
}

export async function parseResumeFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  let text = '';
  if (file.name.endsWith('.pdf')) {
    text = await extractTextFromPdf(arrayBuffer);
  } else if (file.name.endsWith('.docx')) {
    text = await extractTextFromDocx(arrayBuffer);
  } else {
    throw new Error('Unsupported file format. Please upload a .pdf or .docx file.');
  }
  return parseResumeText(text);
}
