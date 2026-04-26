import axios from 'axios';
import { auth } from '../config/firebase';
import {type ProcessedCandidateProfile,type SaveCandidatePayload, type ApiResponse } from '../types';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const hrApi = {
  getGithubProfile: async (username: string): Promise<ProcessedCandidateProfile> => {
    const response = await apiClient.get<ApiResponse<ProcessedCandidateProfile>>(`/github/profile/${username}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch profile');
    }
    return response.data.data;
  },

  saveCandidate: async (payload: SaveCandidatePayload) => {
    const response = await apiClient.post<ApiResponse<any>>('/candidates', payload);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to save candidate');
    }
    return response.data.data;
  },
};