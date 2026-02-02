import { Container, Title, Stack, Button, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DocumentDropzone } from '../components/upload/DocumentDropzone';
import { useApplicationStore } from '../stores/applicationStore';

export function UploadPage() {
  const navigate = useNavigate();
  const { applicationForm, creditReport, setApplicationForm, setCreditReport, reset } =
    useApplicationStore();

  const handleAnalyze = () => {
    navigate('/processing');
  };

  return (
    <Container size="lg">
      <Stack gap="xl">
        <div>
          <Title order={1}>Loan Application Analysis</Title>
          <Text c="dimmed" mt="xs">
            Upload the required documents to begin the automated analysis
          </Text>
        </div>

        <Stack gap="lg">
          <DocumentDropzone
            label="Loan Application Form (PDF)"
            value={applicationForm}
            onFileSelect={setApplicationForm}
          />
          <DocumentDropzone
            label="Credit Bureau / Company Report (PDF)"
            value={creditReport}
            onFileSelect={setCreditReport}
          />
        </Stack>

        <Button
          size="lg"
          fullWidth
          onClick={handleAnalyze}
          disabled={!applicationForm || !creditReport}
        >
          Analyse Application
        </Button>
      </Stack>
    </Container>
  );
}
