import { ActionIcon, Container, Group, rem } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';
import logoHongLeongDesktop from '../../assets/logo-hong-leong-desktop.png';

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
          <img
            src={logoHongLeongDesktop}
            alt="Hong Leong Bank"
            style={{ height: rem(36), width: 'auto' }}
          />
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
