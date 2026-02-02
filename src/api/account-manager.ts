import { useMutation } from '@tanstack/react-query';
import type { ApiResponse } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'https://dev-genie.001.gs';

interface AnalyzeApplicationVariables {
  applicationForm: File;
  creditReport: File;
}

async function analyzeApplication({
  applicationForm,
  creditReport,
}: AnalyzeApplicationVariables): Promise<ApiResponse> {
  const formData = new FormData();
  formData.append('application_form', applicationForm);
  formData.append('credit_report', creditReport);

  const response = await fetch(`${API_URL}/smart-api/account_manager`, {
    method: 'POST',
    headers: {
      accept: 'text/event-stream',
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to analyse application');
  }

  return response.json();
}

export function useAnalyzeApplication() {
  return useMutation({
    mutationFn: analyzeApplication,
  });
}
