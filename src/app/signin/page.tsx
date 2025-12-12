'use client'

import { Suspense } from 'react'
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <SignInPageInner />
        </Suspense>
    )
}

export function SignInPageInner() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    useEffect(() => {
        const userToken = localStorage.getItem('token');

        if (userToken !== null) {
            window.location.href = redirect;
        }   
    }, [])

    

    return (
        <div className="font-sans flex flex-col items-center justify-top">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="text-2xl font-bold">Sign in</div>
                <form 
                    action={(formData) => {
                        const username = formData.get('username');
                        const password = formData.get('password');

                        if (username == null || password == null) {
                            return;
                        }

                        fetch('/api/auth/signin', {
                            method: 'POST',
                            body: JSON.stringify({
                                username: username,
                                password: password
                            })
                        })
                            .then(response => {
                                if (!response.ok) {
                                    alert("Invalid username or password");
                                } else {
                                    response.json().then((data) => {
                                        localStorage.setItem('token', data.token);
                                        localStorage.setItem('username', data.username);
                                        localStorage.setItem('name', data.name);
                                        window.location.href = redirect;
                                    });
                                }
                            });
                        
                    }}
                    className='flex flex-col justify-top items-center gap-4'
                >
                    <input name='username' placeholder="Username" className='border-1 border-black rounded-md p-2' />
                    <input name='password' placeholder="Password" className='border-1 border-black rounded-md p-2' />
                    <button type='submit' className='bg-black text-white rounded-md p-2'>Sign in</button>
                </form>
            </main>
        </div>
    )
}