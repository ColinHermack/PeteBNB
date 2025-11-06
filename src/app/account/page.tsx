'use client';

import { useState, useEffect } from 'react';
import { Button, Loader } from '@mantine/core';

export default function AccountPage() {
    const [username, setUsername] = useState<string | null>("");

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
    })

    if (!username) {
        return <div className='flex flex-col justify-items-center min-h-screen'><Loader color='gray' /></div>
    } else {
        return (
            <div className='flex flex-col justify-top items-center min-h-screen pt-4'>
                <h2 className='text-xl font-bold'>{username}</h2>
                <Button 
                    variant="filled" 
                    color="gray"
                    className='mt-8'
                    onClick={() => {
                        window.location.href='/signout';
                    }}
                >
                    
                    Sign Out
                </Button>
            </div>
        )
    }
}