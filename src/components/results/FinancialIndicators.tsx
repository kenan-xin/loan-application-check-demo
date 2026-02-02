import { Badge, Card, Stack, Text, Title } from '@mantine/core';
import type { ApiResponse } from '../../types/api';

interface FinancialIndicatorsProps {
  result: ApiResponse;
  hasIssue?: boolean;
  issueNumber?: number;
  onIssueClick?: (issueNumber: number) => void;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
  }).format(amount);
};

export function FinancialIndicators({ result, hasIssue, issueNumber, onIssueClick }: FinancialIndicatorsProps) {
  return (
    <Card
      withBorder
      shadow="xs"
      radius="sm"
      style={{
        borderLeft: hasIssue ? '4px solid var(--mantine-color-red-6)' : undefined,
        position: 'relative',
      }}
    >
      {hasIssue && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
          }}
        >
          <Badge color="red" variant="light" size="sm">
            Issue Detected
          </Badge>
          {issueNumber && (
            <Badge
              color="red"
              variant="filled"
              size="xs"
              circle
              style={{ cursor: 'pointer' }}
              onClick={() => onIssueClick?.(issueNumber)}
            >
              {issueNumber}
            </Badge>
          )}
        </div>
      )}
      <Title order={3} mb="sm">
        Financial & Credit Indicators
      </Title>
      <Stack gap="xs">
        <InfoRow label="Issued / Paid-Up Capital" value={formatCurrency(result.issued_capital)} />
        <InfoRow label="Credit Scoring" value={result.credit_scoring.toString()} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', alignItems: 'center' }}>
          <Text size="sm" c="dimmed">
            Percentile Ranking
          </Text>
          <Badge color="green" variant="light">
            Top {result.percentile}%
          </Badge>
        </div>
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
