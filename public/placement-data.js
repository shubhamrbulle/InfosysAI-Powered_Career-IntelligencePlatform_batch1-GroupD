// Static campus placement drive listings. Eligibility is checked for real
// against the logged-in user's resume_score and matched job % — not just
// displayed as a flat list.
export const PLACEMENT_DRIVES = [
  { company: 'TCS', role: 'Software Developer', date: '2026-08-12', location: 'Bengaluru',
    minResumeScore: 60, relatedJobTitle: 'Software Engineer (Product)', minMatch: 40 },
  { company: 'Infosys', role: 'Systems Engineer', date: '2026-08-18', location: 'Hybrid',
    minResumeScore: 55, relatedJobTitle: 'Full Stack Developer', minMatch: 35 },
  { company: 'Wipro', role: 'Project Engineer', date: '2026-08-25', location: 'Chennai',
    minResumeScore: 55, relatedJobTitle: 'Backend Developer', minMatch: 35 },
  { company: 'Amazon', role: 'SDE-1', date: '2026-09-02', location: 'Remote',
    minResumeScore: 75, relatedJobTitle: 'Backend Developer', minMatch: 65 },
  { company: 'Google', role: 'AI/ML Intern', date: '2026-09-10', location: 'Hyderabad',
    minResumeScore: 80, relatedJobTitle: 'AI/ML Engineer', minMatch: 60 },
  { company: 'Microsoft', role: 'Frontend Engineer', date: '2026-09-15', location: 'Remote',
    minResumeScore: 70, relatedJobTitle: 'Frontend Developer', minMatch: 55 },
  { company: 'IBM', role: 'Cloud Associate', date: '2026-09-20', location: 'Bengaluru',
    minResumeScore: 60, relatedJobTitle: 'Cloud Engineer', minMatch: 40 },
  { company: 'Deloitte', role: 'Data Analyst', date: '2026-09-28', location: 'Mumbai',
    minResumeScore: 60, relatedJobTitle: 'Data Analyst', minMatch: 40 }
];