'use client'
import { useState, useEffect } from 'react';
import { Anchor, Button, Image } from '@mantine/core';

export default function Home() {
  const [username, setUsername] = useState<string | null>('');
  const [name, setName] = useState<string | null>('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    const name = localStorage.getItem('name');

    setUsername(username);
    setName(name);
  }, [])

  console.log(username);
  console.log(name);

  if (username == null) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <Image
          radius='md'
          src='/logo.png'
          alt='logo'
          h={120}
          w={120}
          className='mx-2 hover:cursor-pointer'
          onClick={() => {
            window.location.href='/';
          }}
        />
        <p className='font-bold text-xl mt-2'>PeteBNB</p>
        <p className='text-md'>Sign in to find your next sublease</p>
        <Button 
          variant="filled"
          className='mt-8'
          onClick={() => {window.location.href=('/signin')}}
        >
          Sign In
        </Button>
        <p className='text-sm mt-9'>Don&apos;t have an account?</p>
        <Anchor href='/newuser' className='text-sm'>Sign Up</Anchor>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-top items-center">
      <main>
        User {name} logged in
      </main>
    </div>
  );
}
