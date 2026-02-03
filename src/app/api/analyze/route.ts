import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'https://dev-genie.001.gs';
const REQUEST_TIMEOUT = 180000; // 3 minutes

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const applicationForm = formData.get('application_form') as File;
  const creditReport = formData.get('credit_report') as File;

  if (!applicationForm || !creditReport) {
    return NextResponse.json({ error: 'Missing files' }, { status: 400 });
  }

  const upstreamUrl = `${API_URL}/smart-api/account_manager`;
  console.log('[analyze API] Starting upstream request to:', upstreamUrl);
  console.log('[analyze API] Files:', { applicationForm: applicationForm.name, creditReport: creditReport.name });

  const upstreamFormData = new FormData();
  upstreamFormData.append('application_form', applicationForm);
  upstreamFormData.append('credit_report', creditReport);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  const startTime = Date.now();

  try {
    console.log('[analyze API] Sending fetch request...');
    const response = await fetch(upstreamUrl, {
      method: 'POST',
      headers: { accept: 'application/json' },
      body: upstreamFormData,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const duration = Date.now() - startTime;
    console.log('[analyze API] Response received:', { status: response.status, duration: `${duration}ms` });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('[analyze API] Upstream error:', { status: response.status, body: responseText });
      try {
        const errorData = JSON.parse(responseText);
        return NextResponse.json({ ...errorData, status: response.status }, { status: response.status });
      } catch {
        const errorMessage = responseText && responseText.length > 0 ? responseText : 'Unknown error';
        return NextResponse.json({ error: errorMessage, status: response.status }, { status: response.status });
      }
    }

    const data = await response.json();
    console.log('[analyze API] Success');
    return NextResponse.json(data);
  } catch (error) {
    clearTimeout(timeoutId);
    const duration = Date.now() - startTime;
    console.error('[analyze API] Request failed:', { error, duration: `${duration}ms` });
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('[analyze API] Request timed out after', REQUEST_TIMEOUT, 'ms');
      return NextResponse.json({ error: 'Request timeout' }, { status: 504 });
    }
    return NextResponse.json({ error: 'Upstream request failed' }, { status: 502 });
  }
}
