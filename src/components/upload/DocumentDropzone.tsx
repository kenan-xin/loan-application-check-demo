import { useState } from 'react';
import { Box, Text, Group, rem } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';

interface DocumentDropzoneProps extends Omit<Partial<DropzoneProps>, 'onDrop'> {
  label: string;
  onFileSelect: (file: File | null) => void;
  value?: File | null;
}

export function DocumentDropzone({ label, onFileSelect, value, ...props }: DocumentDropzoneProps) {
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setError(null);
      onFileSelect(acceptedFiles[0]);
    }
  };

  const handleReject = (rejections: unknown[]) => {
    setError('Please upload a valid PDF file');
    onFileSelect(null);
  };

  const handleRemove = () => {
    setError(null);
    onFileSelect(null);
  };

  return (
    <Box>
      <Text fw={600} size="sm" mb="xs">
        {label}
      </Text>
      {value ? (
        <Group
          justify="space-between"
          p="sm"
          style={{
            border: '1px solid',
            borderColor: 'var(--mantine-color-bankGray-3)',
            borderRadius: 'var(--mantine-radius-sm)',
          }}
        >
          <Text size="sm" truncate style={{ maxWidth: rem(300) }}>
            {value.name}
          </Text>
          <button
            type="button"
            onClick={handleRemove}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--mantine-color-red-6)',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <IconX style={{ width: rem(18), height: rem(18) }} />
          </button>
        </Group>
      ) : (
        <Dropzone
          onDrop={handleDrop}
          onReject={handleReject}
          maxSize={50 * 1024 ** 2}
          accept={PDF_MIME_TYPE}
          {...props}
        >
          <Group
            justify="center"
            gap="xl"
            mih={120}
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Upload PDF file
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Drag & drop or click to select
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
      {error && (
        <Text c="red" size="sm" mt="xs">
          {error}
        </Text>
      )}
    </Box>
  );
}
