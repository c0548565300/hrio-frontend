export interface ProcessedCandidateProfile {
  username: string;
  fullName: string;
  summary: string;
  totalPublicRepos: number;
  topLanguages: string[];
  recentProjects: {
    name: string;
    description: string;
    language: string;
  }[];
}

export interface SaveCandidatePayload {
  githubUsername: string;
  fullName: string;
  yearsOfExperience: number;
  interviewNote: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ProcessedCandidateProfile {
  username: string;
  fullName: string;
  summary: string;
  totalPublicRepos: number;
  topLanguages: string[];
  recentProjects: {
    name: string;
    description: string;
    language: string;
  }[];
}

