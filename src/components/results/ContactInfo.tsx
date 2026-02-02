import { Card, Stack, Text, Title } from '@mantine/core';
import type { ApiResponse } from '../../types/api';

interface ContactInfoProps {
  result: ApiResponse;
}

export function ContactInfo({ result }: ContactInfoProps) {
  return (
    <Card withBorder shadow="xs" radius="sm">
      <Title order={3} mb="sm">
        Contact Information
      </Title>
      <Stack gap="xs">
        <InfoRow label="Contact Person" value={result.contact_person_name} />
        <InfoRow label="Email" value={result.contact_email} />
        <InfoRow label="Phone Number" value={result.contact_phone_number} />
      </Stack>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px' }}>
      <Text size="sm" c="dimmed">
        {label}
      </Text>
      <Text size="sm" fw={500}>
        {value}
      </Text>
    </div>
  );
}
