import { Alert, Badge, Card, Table, Title } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import type { Litigation } from '../../types/api';

interface LitigationInfoProps {
  litigation: Litigation[];
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

export function LitigationInfo({ litigation, hasIssue, issueNumber, onIssueClick }: LitigationInfoProps) {
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
        Litigation Information
      </Title>

      {litigation.length === 0 ? (
        <Alert variant="light" color="blue" icon={<IconAlertTriangle />}>
          No litigation cases
        </Alert>
      ) : (
        <Table withRowBorders={false}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Case Number</Table.Th>
              <Table.Th>Court</Table.Th>
              <Table.Th>City</Table.Th>
              <Table.Th>State</Table.Th>
              <Table.Th>Amount</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {litigation.map((case_, index) => (
              <Table.Tr key={index}>
                <Table.Td>{case_.case_no}</Table.Td>
                <Table.Td>{case_.court}</Table.Td>
                <Table.Td>{case_.city}</Table.Td>
                <Table.Td>{case_.state}</Table.Td>
                <Table.Td>{formatCurrency(case_.amount)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Card>
  );
}
