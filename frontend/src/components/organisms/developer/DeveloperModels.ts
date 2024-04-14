export interface FormFunction {
  getFormValues: () => FormModel;
}

export interface InforFunction {
  handleSetPreview: () => void;
}

export interface Language {
  name: string;
  level: "Junior" | "Middle" | "Senior";
}

export interface Experience {
  company: string;
  years: number;
  work: string;
}

export interface Project {
  name: string;
  techstack: string;
  duration: string;
  purpose: string;
}

export interface FormModel {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  avatarlink: string;
  objective: string;
  mainSkill: Language;
  otherSkills: Language[];
  experience: Experience[];
  projects: Project[];
}
