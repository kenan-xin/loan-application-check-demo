import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'https://dev-genie.001.gs';
const REQUEST_TIMEOUT = 300000; // 5 minutes

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const applicationForm = formData.get('application_form') as File;
  const creditReport = formData.get('credit_report') as File;

  if (!applicationForm || !creditReport) {
    return NextResponse.json({ error: 'Missing files' }, { status: 400 });
  }

  const upstreamFormData = new FormData();
  upstreamFormData.append('application_form', applicationForm);
  upstreamFormData.append('credit_report', creditReport);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_URL}/smart-api/account_manager`, {
      method: 'POST',
      headers: { accept: 'application/json' },
      body: upstreamFormData,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const responseText = await response.text();
      try {
        const errorData = JSON.parse(responseText);
        return NextResponse.json({ ...errorData, status: response.status }, { status: response.status });
      } catch {
        const errorMessage = responseText && responseText.length > 0 ? responseText : 'Unknown error';
        return NextResponse.json({ error: errorMessage, status: response.status }, { status: response.status });
      }
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timeout' }, { status: 504 });
    }
    return NextResponse.json({ error: 'Upstream request failed' }, { status: 502 });
  }
}
