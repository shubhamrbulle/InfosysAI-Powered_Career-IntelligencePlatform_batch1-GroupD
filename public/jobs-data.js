// public/jobs-data.js

export const JOBS = [
  {
    title: "AI/ML Engineer",
    company: "Google",
    skillReq: [
      { skill: "Python", weight: 20, importance: "critical" },
      { skill: "Machine Learning", weight: 20, importance: "critical" },
      { skill: "TensorFlow", weight: 15, importance: "important" },
      { skill: "Deep Learning", weight: 15, importance: "important" },
      { skill: "SQL", weight: 10, importance: "important" },
      { skill: "Git", weight: 10, importance: "important" },
      { skill: "Docker", weight: 10, importance: "nice" }
    ]
  },

  {
    title: "Frontend Developer",
    company: "Microsoft",
    skillReq: [
      { skill: "HTML", weight: 15, importance: "critical" },
      { skill: "CSS", weight: 15, importance: "critical" },
      { skill: "JavaScript", weight: 20, importance: "critical" },
      { skill: "React", weight: 20, importance: "important" },
      { skill: "TypeScript", weight: 10, importance: "important" },
      { skill: "Git", weight: 10, importance: "important" },
      { skill: "Responsive Design", weight: 10, importance: "nice" }
    ]
  },

  {
    title: "Backend Developer",
    company: "Amazon",
    skillReq: [
      { skill: "Java", weight: 20, importance: "critical" },
      { skill: "Spring Boot", weight: 20, importance: "critical" },
      { skill: "SQL", weight: 15, importance: "important" },
      { skill: "REST API", weight: 15, importance: "important" },
      { skill: "Docker", weight: 10, importance: "important" },
      { skill: "Git", weight: 10, importance: "important" },
      { skill: "AWS", weight: 10, importance: "nice" }
    ]
  },

  {
    title: "Full Stack Developer",
    company: "Infosys",
    skillReq: [
      { skill: "React", weight: 15, importance: "critical" },
      { skill: "Node.js", weight: 15, importance: "critical" },
      { skill: "Express", weight: 15, importance: "important" },
      { skill: "MongoDB", weight: 15, importance: "important" },
      { skill: "JavaScript", weight: 15, importance: "critical" },
      { skill: "Git", weight: 10, importance: "important" },
      { skill: "Docker", weight: 15, importance: "nice" }
    ]
  },

  {
    title: "Cloud Engineer",
    company: "IBM",
    skillReq: [
      { skill: "AWS", weight: 20, importance: "critical" },
      { skill: "Azure", weight: 15, importance: "important" },
      { skill: "Docker", weight: 15, importance: "important" },
      { skill: "Kubernetes", weight: 20, importance: "critical" },
      { skill: "Linux", weight: 15, importance: "important" },
      { skill: "Git", weight: 15, importance: "important" }
    ]
  },

  {
    title: "DevOps Engineer",
    company: "Adobe",
    skillReq: [
      { skill: "Docker", weight: 20, importance: "critical" },
      { skill: "Kubernetes", weight: 20, importance: "critical" },
      { skill: "Jenkins", weight: 20, importance: "critical" },
      { skill: "Linux", weight: 15, importance: "important" },
      { skill: "Git", weight: 10, importance: "important" },
      { skill: "AWS", weight: 15, importance: "important" }
    ]
  },

  {
    title: "Data Scientist",
    company: "Netflix",
    skillReq: [
      { skill: "Python", weight: 20, importance: "critical" },
      { skill: "Pandas", weight: 15, importance: "important" },
      { skill: "NumPy", weight: 15, importance: "important" },
      { skill: "Machine Learning", weight: 20, importance: "critical" },
      { skill: "SQL", weight: 15, importance: "important" },
      { skill: "Data Visualization", weight: 15, importance: "important" }
    ]
  },

  {
    title: "Data Analyst",
    company: "Deloitte",
    skillReq: [
      { skill: "SQL", weight: 25, importance: "critical" },
      { skill: "Excel", weight: 20, importance: "critical" },
      { skill: "Power BI", weight: 20, importance: "important" },
      { skill: "Python", weight: 15, importance: "important" },
      { skill: "Statistics", weight: 20, importance: "important" }
    ]
  },

  {
    title: "Cybersecurity Analyst",
    company: "Cisco",
    skillReq: [
      { skill: "Networking", weight: 20, importance: "critical" },
      { skill: "Linux", weight: 15, importance: "important" },
      { skill: "Cybersecurity", weight: 25, importance: "critical" },
      { skill: "Python", weight: 10, importance: "important" },
      { skill: "SIEM", weight: 15, importance: "important" },
      { skill: "Risk Assessment", weight: 15, importance: "important" }
    ]
  },

  {
    title: "Mobile App Developer",
    company: "Samsung",
    skillReq: [
      { skill: "Flutter", weight: 20, importance: "critical" },
      { skill: "Dart", weight: 20, importance: "critical" },
      { skill: "Firebase", weight: 20, importance: "important" },
      { skill: "REST API", weight: 15, importance: "important" },
      { skill: "Git", weight: 10, importance: "important" },
      { skill: "UI Design", weight: 15, importance: "nice" }
    ]
  }
];

// Extra jobs to make 20 total

const extraJobs = [
  ["QA Engineer","Accenture",["Java","Selenium","JUnit","Git","SQL","Automation"]],
  ["UI/UX Designer","Zoho",["Figma","UI Design","Wireframing","Prototyping","HTML","CSS"]],
  ["Blockchain Developer","Coinbase",["Solidity","Ethereum","JavaScript","Git","Node.js","Web3"]],
  ["Game Developer","Ubisoft",["C++","Unity","Game Physics","Git","OOP","AI"]],
  ["ML Researcher","OpenAI",["Python","PyTorch","Deep Learning","Transformers","Mathematics","Research"]],
  ["Database Engineer","Oracle",["SQL","PL/SQL","Database Design","Performance Tuning","Linux","Git"]],
  ["Network Engineer","TCS",["Networking","Cisco","Linux","Firewall","Routing","Security"]],
  ["Embedded Systems Engineer","Intel",["C","C++","Embedded Systems","RTOS","Debugging","Git"]],
  ["Software Engineer","Apple",["C++","Data Structures","Algorithms","Git","OOP","System Design"]],
  ["Site Reliability Engineer","Meta",["Linux","Docker","Kubernetes","Python","AWS","Monitoring"]]
];

extraJobs.forEach(job => {
  JOBS.push({
    title: job[0],
    company: job[1],
    skillReq: job[2].map((skill, index) => ({
      skill,
      weight: [20,20,15,15,15,15][index],
      importance: index < 2 ? "critical" : "important"
    }))
  });
});