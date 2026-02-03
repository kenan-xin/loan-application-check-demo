'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Center, Container, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { AppShell } from '../../components/layout/AppShell';
import { useApplicationStore } from '../../stores/applicationStore';
import type { ApiResponse } from '../../types/api';

interface ProcessingStep {
  id: number;
  text: string;
}

const PROCESSING_STEPS: ProcessingStep[] = [
  { id: 1, text: 'Verifying company information' },
  { id: 2, text: 'Analysing ownership structure' },
  { id: 3, text: 'Checking eligibility criteria' },
  { id: 4, text: 'Running credit assessment' },
];

const AnimatedDot = ({ isActive }: { isActive: boolean }) => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, [isActive]);

  return <span>{'.'.repeat(dots)}</span>;
};

const STEP_DURATION = 30000; // 30 seconds per step (2 minutes total for 4 steps)

async function analyzeApplication(files: { applicationForm: File; creditReport: File }): Promise<ApiResponse> {
  const formData = new FormData();
  formData.append('application_form', files.applicationForm);
  formData.append('credit_report', files.creditReport);

  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to analyse application');
  }

  return response.json();
}

export default function ProcessingPage() {
  const router = useRouter();
  const { applicationForm, creditReport, setResult } = useApplicationStore();
  const [visibleStepIndex, setVisibleStepIndex] = useState(0);

  const mutation = useMutation({
    mutationFn: () => analyzeApplication({ applicationForm: applicationForm!, creditReport: creditReport! }),
    onSuccess: (data) => {
      setResult(data);
      setVisibleStepIndex(PROCESSING_STEPS.length);
      setTimeout(() => router.push('/results'), 1000);
    },
    onError: () => {
      router.push('/');
    },
  });

  useEffect(() => {
    if (!applicationForm || !creditReport) {
      router.push('/');
      return;
    }

    if (mutation.isPending) return;
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationForm, creditReport, mutation.isPending]);

  // Start showing first step immediately
  useEffect(() => {
    if (visibleStepIndex === 0 && mutation.isPending) {
      const timer = setTimeout(() => {
        setVisibleStepIndex(1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [visibleStepIndex, mutation.isPending]);

  // Animate remaining steps appearing one by one
  useEffect(() => {
    if (visibleStepIndex >= PROCESSING_STEPS.length || !mutation.isPending || visibleStepIndex === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setVisibleStepIndex((prev) => prev + 1);
    }, STEP_DURATION);

    return () => clearTimeout(timer);
  }, [visibleStepIndex, mutation.isPending]);

  return (
    <AppShell>
      <Container size="lg">
        <Stack gap="xl" align="center" mt="xl">
        <Title order={2} ta="center">
          Processing Application
        </Title>
        <Text c="dimmed" ta="center">
          Please wait while we analyse the documents
        </Text>

        <Paper p="xl" radius="sm" shadow="xs" withBorder w="100%">
          <Stack gap="md">
            <Stack gap="sm" align="center">
              <Center>
                <Loader
                  size="xl"
                  color="light-dark(var(--mantine-color-hlbNavy-8), var(--mantine-color-hlbNavy-3))"
                />
              </Center>
              <Text fw={500} ta="center">
                Extracting data from documents...
              </Text>
            </Stack>

            <Stack gap="xs">
              {PROCESSING_STEPS.slice(0, visibleStepIndex).map((step, index) => (
                <Text
                  key={step.id}
                  size="sm"
                  c={
                    index === visibleStepIndex - 1 && mutation.isPending
                      ? 'light-dark(var(--mantine-color-gray-8), var(--mantine-color-gray-2))'
                      : 'dimmed'
                  }
                  style={
                    index === visibleStepIndex - 1 && mutation.isPending
                      ? {
                          animation: 'blink 2.5s ease-in-out infinite',
                          fontWeight: 500,
                        }
                      : {}
                  }
                >
                  • {step.text}
                  <AnimatedDot isActive={index === visibleStepIndex - 1 && mutation.isPending} />
                </Text>
              ))}
            </Stack>
          </Stack>
        </Paper>

        <Text size="sm" c="dimmed" ta="center">
          This process may take a few minutes. Please do not close this window.
        </Text>
        </Stack>
      </Container>
    </AppShell>
  );
}
