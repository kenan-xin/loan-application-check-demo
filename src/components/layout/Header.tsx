import { ActionIcon, Container, Group, Text, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function Header() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <div
      style={{
        borderBottom: '1px solid',
        borderBottomColor: 'light-dark(var(--mantine-color-bankGray-2), var(--mantine-color-bankGray-7))',
        padding: '12px 0',
      }}
    >
      <Container size="lg">
        <Group justify="space-between">
          <Text
            fw={600}
            size="xl"
            c="light-dark(var(--mantine-color-hlbNavy-8), var(--mantine-color-hlbNavy-3))"
            style={{ letterSpacing: '-0.5px' }}
          >
            XY Bank
          </Text>
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle color scheme"
          >
            {colorScheme === 'light' ? <IconMoon stroke={1.5} /> : <IconSun stroke={1.5} />}
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
