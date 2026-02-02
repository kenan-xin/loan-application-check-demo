import { Badge, Card, Stack, Text, Title } from '@mantine/core';
import type { ApiResponse } from '../../types/api';

interface CompanyOverviewProps {
  result: ApiResponse;
  hasIssue?: boolean;
  issueNumber?: number;
  onIssueClick?: (issueNumber: number) => void;
}

export function CompanyOverview({ result, hasIssue, issueNumber, onIssueClick }: CompanyOverviewProps) {
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
        Company Overview
      </Title>
      <Stack gap="xs">
        <InfoRow label="Applicant Name" value={result.applicant_name} />
        <InfoRow label="Registration Number" value={result.registration_no} />
        <InfoRow label="Country of Registration" value={result.country_of_registration} />
        <InfoRow label="Type of Entity" value={result.type_of_entity} />
        <InfoRow label="Type of Business" value={result.type_of_business} />
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
