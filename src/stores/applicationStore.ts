import { create } from 'zustand';
import type { ApiResponse } from '../types/api';

interface ApplicationStore {
  applicationForm: File | null;
  creditReport: File | null;
  result: ApiResponse | null;
  setApplicationForm: (file: File | null) => void;
  setCreditReport: (file: File | null) => void;
  setResult: (result: ApiResponse | null) => void;
  reset: () => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applicationForm: null,
  creditReport: null,
  result: null,
  setApplicationForm: (file) => set({ applicationForm: file }),
  setCreditReport: (file) => set({ creditReport: file }),
  setResult: (result) => set({ result }),
  reset: () => set({ applicationForm: null, creditReport: null, result: null }),
}));
