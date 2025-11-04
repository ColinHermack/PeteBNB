'use client'
import { useState, useEffect } from 'react';

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
      <div>No user logged in</div>
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
