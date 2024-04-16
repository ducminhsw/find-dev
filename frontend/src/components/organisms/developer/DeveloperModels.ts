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
  role: string;
  work: Project;
  years: number;
}

export interface Project {
  duration: string;
  name: string;
  techstack: string;
  purpose: string;
}

export interface FormModel {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  avatarlink: string;
  objective: string;
  languages: Language[];
  tools: string[];
  interests: string[];
  experience: Experience[];
  projects: Project[];
}
