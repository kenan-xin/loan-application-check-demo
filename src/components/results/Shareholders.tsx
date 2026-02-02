import { Badge, Card, Table, Title } from '@mantine/core';
import type { Shareholder } from '../../types/api';

interface ShareholdersProps {
  shareholders: Shareholder[];
  hasIssue?: boolean;
  issueNumber?: number;
  onIssueClick?: (issueNumber: number) => void;
}

export function Shareholders({ shareholders, hasIssue, issueNumber, onIssueClick }: ShareholdersProps) {
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
        Shareholders
      </Title>
      <Table withRowBorders={false}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>IC / ID</Table.Th>
            <Table.Th>Share Amount</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {shareholders.map((shareholder, index) => (
            <Table.Tr key={index}>
              <Table.Td>{shareholder.name}</Table.Td>
              <Table.Td>{shareholder.ic}</Table.Td>
              <Table.Td>{shareholder.share}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
