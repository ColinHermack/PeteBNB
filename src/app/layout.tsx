'use client';
import "./globals.css";

import '@mantine/core/styles.css';
import { useState, useEffect } from 'react';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Avatar, Image } from '@mantine/core';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  const [name, setName] = useState<string>('');
  
  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name !== null) {
      setName(name);
    };
  }, []);
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <title>PeteBNB</title>
      </head>
      <body>
          <MantineProvider>
            <AppShell
              header={{ height: 60 }}
            >
              <AppShell.Header className='flex justify-between items-center'>
                <div className='flex items-center'>
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
                </div>
                <Avatar radius='xl' className='mr-4'>{name !== ''? name[0] + name.split(' ')[1][0] : name}</Avatar>
              </AppShell.Header>
              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          </MantineProvider>
      </body>
    </html>
  );
}
