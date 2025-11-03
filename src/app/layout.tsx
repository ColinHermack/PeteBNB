'use client';
import "./globals.css";

import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Image } from '@mantine/core';
import { UserProvider } from './userProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <title>PeteBNB</title>
      </head>
      <body>
        <UserProvider>
          <MantineProvider>
            <AppShell
              padding="md"
              header={{ height: 60 }}
              navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
              }}
            >
              <AppShell.Header className='flex justify-left items-center'>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                />

                  <Image
                    radius='md'
                    src='/logo.png'
                    alt='logo'
                    h={40}
                    w={40}
                    className='mx-2'
                  />
                  <p className='text-xl font-bold ml-4'>PeteBNB</p>
              </AppShell.Header>

              <AppShell.Navbar>Navbar</AppShell.Navbar>

              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          </MantineProvider>
        </UserProvider>
      </body>
    </html>
  );
}
