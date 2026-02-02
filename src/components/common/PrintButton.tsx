import { Button } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import { useReactToPrint } from 'react-to-print';

interface PrintButtonProps {
  contentRef: React.RefObject<HTMLElement | null>;
}

export function PrintButton({ contentRef }: PrintButtonProps) {
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: 'Loan Analysis Report',
  });

  return (
    <Button
      leftSection={<IconPrinter size={18} />}
      onClick={handlePrint}
      variant="default"
      size="sm"
    >
      Print
    </Button>
  );
}
