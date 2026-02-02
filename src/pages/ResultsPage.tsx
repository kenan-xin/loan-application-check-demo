import { useRef, useMemo, useState, useCallback } from 'react';
import { Button, Container, Group, SimpleGrid, Stack, Text, Title, rem } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../stores/applicationStore';
import { DecisionBanner } from '../components/results/DecisionBanner';
import { CompanyOverview } from '../components/results/CompanyOverview';
import { CompanyOwners } from '../components/results/CompanyOwners';
import { Shareholders } from '../components/results/Shareholders';
import { ContactInfo } from '../components/results/ContactInfo';
import { LoanDetails } from '../components/results/LoanDetails';
import { FinancialIndicators } from '../components/results/FinancialIndicators';
import { LitigationInfo } from '../components/results/LitigationInfo';
import { ExportButton } from '../components/common/ExportButton';
import { PrintButton } from '../components/common/PrintButton';
import type { Issue } from '../components/results/DecisionBanner';

export function ResultsPage() {
  const navigate = useNavigate();
  const { result, reset } = useApplicationStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const [highlightedIssueNumber, setHighlightedIssueNumber] = useState<number | null>(null);

  const handleIssueClick = useCallback((issueNumber: number) => {
    setHighlightedIssueNumber(issueNumber);
    const element = document.getElementById('decision-banner');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      setHighlightedIssueNumber(null);
    }, 3000);
  }, []);

  const handleBackToUpload = () => {
    reset();
    navigate('/');
  };

  if (!result) {
    navigate('/');
    return null;
  }

  // Derive issue numbers directly from result
  const issueNumbers = useMemo(() => {
    const issues: Issue[] = [];
    let issueNumber = 1;

    if (result.entity_type_issue) {
      issues.push({ number: issueNumber++, message: '', type: 'entity' });
    }
    if (result.ownership_issue) {
      issues.push({ number: issueNumber++, message: '', type: 'ownership' });
    }
    if (result.issued_capital_issue) {
      issues.push({ number: issueNumber++, message: '', type: 'capital' });
    }
    if (result.litigation_issue) {
      issues.push({ number: issueNumber++, message: '', type: 'litigation' });
    }

    const map = new Map<Issue['type'], number>();
    issues.forEach((issue) => map.set(issue.type, issue.number));
    return map;
  }, [result]);

  const getIssueNumber = (type: Issue['type']) => issueNumbers.get(type);

  return (
    <Container size="lg">
      <Stack gap="lg">
        <Group justify="space-between">
          <Button
            variant="default"
            leftSection={<IconArrowLeft size={18} />}
            onClick={handleBackToUpload}
          >
            Back to Upload
          </Button>
          <Group>
            <PrintButton contentRef={contentRef} />
            <ExportButton elementId="results-content" filename="loan-analysis-report.pdf" />
          </Group>
        </Group>

        <div ref={contentRef} id="results-content" style={{ padding: '8px' }}>
          {/* Page 1 Content */}
          <div id="page-1" data-page="1">
            <Stack gap="lg">
              <div id="decision-banner">
                <DecisionBanner result={result} highlightedIssueNumber={highlightedIssueNumber} />
              </div>

              <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <CompanyOverview
                  result={result}
                  hasIssue={result.entity_type_issue}
                  issueNumber={getIssueNumber('entity')}
                  onIssueClick={handleIssueClick}
                />
                <ContactInfo result={result} />
              </SimpleGrid>

              <CompanyOwners
                owners={result.company_owners}
                hasIssue={result.ownership_issue}
                issueNumber={getIssueNumber('ownership')}
                onIssueClick={handleIssueClick}
              />
              <Shareholders
                shareholders={result.shareholders}
                hasIssue={result.ownership_issue}
                issueNumber={getIssueNumber('ownership')}
                onIssueClick={handleIssueClick}
              />

              <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <LoanDetails result={result} />
                <FinancialIndicators
                  result={result}
                  hasIssue={result.issued_capital_issue}
                  issueNumber={getIssueNumber('capital')}
                  onIssueClick={handleIssueClick}
                />
              </SimpleGrid>
            </Stack>
          </div>

          {/* Page 2 Content */}
          <div id="page-2" data-page="2" style={{ pageBreakBefore: 'always', breakBefore: 'page' }}>
            <LitigationInfo
              litigation={result.litigation_information}
              hasIssue={result.litigation_issue}
              issueNumber={getIssueNumber('litigation')}
              onIssueClick={handleIssueClick}
            />
          </div>
        </div>
      </Stack>
    </Container>
  );
}
