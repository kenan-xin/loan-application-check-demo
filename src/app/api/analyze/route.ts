import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'https://dev-genie.001.gs';

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

  const response = await fetch(`${API_URL}/smart-api/account_manager`, {
    method: 'POST',
    headers: { accept: 'application/json' },
    body: upstreamFormData,
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
