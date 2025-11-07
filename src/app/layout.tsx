'use client';
import "./globals.css";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { useState, useEffect } from 'react';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

import { AppShell, Burger, createTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Anchor, Avatar, Image, NavLink } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'gold',
  colors: {
    'gold': ['#8E6F3E', '#CDAD4D', '#DAAA00', '#D4B58B', '#D5B579', '#D6B472', '#D7B36B', '#DDB945', '#D9B66E', '#EBD99F']
  }
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  const [name, setName] = useState<string | null>();
  
  useEffect(() => {
    setName(localStorage.getItem('name'));
  }, []);
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <title>PeteBNB</title>
      </head>
      <body>
          <MantineProvider theme={theme}>
            <AppShell
              header={{ height: 60 }}
              padding="md"
              navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: { mobile: !opened }
              }}
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
                    className='mx-2 hover:cursor-pointer'
                    onClick={() => {
                      window.location.href='/';
                    }}
                  />
                  <p className='text-xl font-bold ml-4 hover:cursor-pointer' onClick={() => {window.location.href='/';}}>PeteBNB</p>
                </div>
                <Anchor href={name ? '/account' : '/signin'}><Avatar radius='xl' className='mr-4'></Avatar></Anchor>
              </AppShell.Header>
              <AppShell.Navbar>
                <div className='w-full h-full flex flex-col justify-top items-center'>
                  <NavLink label="Home" href="/" />
                  <NavLink label='Favorites' href='/favorites' />
                  <NavLink label='My Listings' href='mylistings' />
                </div>
              </AppShell.Navbar>
              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          </MantineProvider>
      </body>
    </html>
  );
}
