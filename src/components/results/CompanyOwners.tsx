import { Badge, Card, Table, Title } from '@mantine/core';
import type { CompanyOwner } from '../../types/api';

interface CompanyOwnersProps {
  owners: CompanyOwner[];
  hasIssue?: boolean;
  issueNumber?: number;
  onIssueClick?: (issueNumber: number) => void;
}

export function CompanyOwners({ owners, hasIssue, issueNumber, onIssueClick }: CompanyOwnersProps) {
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
        Company Owners
      </Title>
      <Table withRowBorders={false}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Designation</Table.Th>
            <Table.Th>IC / ID</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Date of Appointment</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {owners.map((owner, index) => (
            <Table.Tr key={index}>
              <Table.Td>{owner.name}</Table.Td>
              <Table.Td>{owner.designation}</Table.Td>
              <Table.Td>{owner.ic}</Table.Td>
              <Table.Td>{owner.address}</Table.Td>
              <Table.Td>{owner.date_of_appointment}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
