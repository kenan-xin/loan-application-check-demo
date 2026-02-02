import { useEffect, useState } from 'react';
import { Container, Title, Stack, Text, Loader, Center, Paper } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../stores/applicationStore';
import { useAnalyzeApplication } from '../api/account-manager';

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
    if (!isActive) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, [isActive]);

  return <span>{'.'.repeat(dots)}</span>;
};

const STEP_DURATION = 30000; // 30 seconds per step (2 minutes total for 4 steps)

export function ProcessingPage() {
  const navigate = useNavigate();
  const { applicationForm, creditReport, setResult } = useApplicationStore();
  const mutate = useAnalyzeApplication();
  const [visibleStepIndex, setVisibleStepIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (!applicationForm || !creditReport) {
      navigate('/');
      return;
    }

    mutate.mutate(
      { applicationForm, creditReport },
      {
        onSuccess: (data) => {
          setResult(data);
          setIsProcessing(false);
          setVisibleStepIndex(PROCESSING_STEPS.length);
          setTimeout(() => navigate('/results'), 1000);
        },
        onError: () => {
          // Navigate back to upload on error
          navigate('/');
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationForm, creditReport]);

  // Start showing first step immediately
  useEffect(() => {
    if (visibleStepIndex === 0 && isProcessing) {
      const timer = setTimeout(() => {
        setVisibleStepIndex(1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [visibleStepIndex, isProcessing]);

  // Animate remaining steps appearing one by one
  useEffect(() => {
    if (visibleStepIndex >= PROCESSING_STEPS.length || !isProcessing || visibleStepIndex === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setVisibleStepIndex((prev) => prev + 1);
    }, STEP_DURATION);

    return () => clearTimeout(timer);
  }, [visibleStepIndex, isProcessing]);

  return (
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
                <Loader size="xl" color="var(--mantine-color-hlbNavy-8)" />
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
                    index === visibleStepIndex - 1 && isProcessing
                      ? 'var(--mantine-color-gray-8)'
                      : 'dimmed'
                  }
                  style={
                    index === visibleStepIndex - 1 && isProcessing
                      ? {
                          animation: 'blink 2.5s ease-in-out infinite',
                          fontWeight: 500,
                        }
                      : {}
                  }
                >
                  • {step.text}<AnimatedDot isActive={index === visibleStepIndex - 1 && isProcessing} />
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
  );
}
