import { Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { exportToPDF } from '../../utils/export';

interface ExportButtonProps {
  elementId: string;
  filename?: string;
}

export function ExportButton({ elementId, filename }: ExportButtonProps) {
  const handleExport = async () => {
    try {
      await exportToPDF(elementId, filename);
    } catch (error) {
      console.error('Failed to export PDF:', error);
    }
  };

  return (
    <Button
      leftSection={<IconDownload size={18} />}
      onClick={handleExport}
      variant="default"
      size="sm"
    >
      Export PDF
    </Button>
  );
}
