export type TechStack = {
  frontend: string;
  backend: string;
  database: string;
  auth: string;
  hosting: string;
};

export type Blueprint = {
  featureList: string[];
  techStack: TechStack;
  architecture: string;
  databaseSchema: string;
  apiEndpoints: string[];
  timeline: string[];
  risks: string[];
  mermaidDiagram: string; 
  folderStructure: string;
};