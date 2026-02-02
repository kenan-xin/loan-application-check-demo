import { Alert, Badge, Group, Stack, Text } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { ApiResponse } from '../../types/api';

export interface Issue {
  number: number;
  message: string;
  type: 'entity' | 'ownership' | 'capital' | 'litigation';
}

interface DecisionBannerProps {
  result: ApiResponse;
  onIssuesChange?: (issues: Issue[]) => void;
  highlightedIssueNumber?: number | null;
}

export function DecisionBanner({ result, onIssuesChange, highlightedIssueNumber }: DecisionBannerProps) {
  const issues: Issue[] = [];
  let issueNumber = 1;

  if (result.entity_type_issue) {
    issues.push({
      number: issueNumber++,
      message: 'The applying entity type is not eligible for this product.',
      type: 'entity',
    });
  }
  if (result.ownership_issue) {
    issues.push({
      number: issueNumber++,
      message: 'Ownership of company is not clear – company owners are not found in shareholders list.',
      type: 'ownership',
    });
  }
  if (result.issued_capital_issue) {
    issues.push({
      number: issueNumber++,
      message: "The loan application amount exceeds the company's paid-up capital.",
      type: 'capital',
    });
  }
  if (result.litigation_issue) {
    issues.push({
      number: issueNumber++,
      message: 'Litigation case(s) with an involved amount exceeding RM30,000 have been identified.',
      type: 'litigation',
    });
  }

  // Notify parent component of issues
  if (onIssuesChange) {
    onIssuesChange(issues);
  }

  const hasIssues = issues.length > 0;

  if (!hasIssues) {
    return (
      <Alert variant="light" color="green" icon={<IconCheck />} title="Application Passed Initial Checks">
        <Stack gap={0}>
          <Text>Ready for next stage (Credit Assessment)</Text>
        </Stack>
      </Alert>
    );
  }

  return (
    <Alert variant="light" color="red" icon={<IconX />} title="Application Failed Initial Checks">
      <Stack gap="xs">
        {issues.map((issue) => (
          <div
            key={issue.type}
            style={{
              padding: '8px',
              borderRadius: '4px',
              backgroundColor:
                highlightedIssueNumber === issue.number
                  ? 'rgba(254, 226, 226, 1)'
                  : 'transparent',
              transition: 'background-color 1.5s ease-out, padding 0.3s ease',
              border:
                highlightedIssueNumber === issue.number
                  ? '2px solid var(--mantine-color-red-6)'
                  : 'none',
            }}
          >
            <Group gap="xs">
              <Badge size="xs" color="red" variant="filled">
                {issue.number}
              </Badge>
              <Text>{issue.message}</Text>
            </Group>
          </div>
        ))}
      </Stack>
    </Alert>
  );
}
