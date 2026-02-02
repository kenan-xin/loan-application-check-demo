import { Card, Stack, Text, Title } from '@mantine/core';
import type { ApiResponse } from '../../types/api';

interface LoanDetailsProps {
  result: ApiResponse;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
  }).format(amount);
};

export function LoanDetails({ result }: LoanDetailsProps) {
  return (
    <Card withBorder shadow="xs" radius="sm">
      <Title order={3} mb="sm">
        Loan Application Details
      </Title>
      <Stack gap="xs">
        <InfoRow label="Type of Loan" value={result.type_of_loan} />
        <InfoRow label="Loan Amount" value={formatCurrency(result.loan_amount)} />
        <InfoRow label="Loan Tenure" value={result.loan_tenure} />
        <InfoRow label="Security Provided Type" value={result.security_provided_type} />
        <InfoRow label="Security Value" value={formatCurrency(result.security_value)} />
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
