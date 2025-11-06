'use client'

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NewUserPage() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        const userToken = localStorage.getItem('token');

        if (userToken !== null) {
            window.location.href = redirect;
        }

        setUserToken(userToken);
    })

    if (userToken == null) {
        return (
            <div className="font-sans flex flex-col items-center justify-top">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <div className="text-2xl font-bold">Sign Up</div>
                    <form 
                        action={(formData) => {
                            let username = formData.get('username');
                            let password = formData.get('password');
                            let firstname = formData.get('firstname');
                            let lastname = formData.get('lastname');

                            if (username == null || password == null || firstname == null || lastname == null) {
                                return;
                            }

                            fetch('/api/user/new', {
                                method: 'POST',
                                body: JSON.stringify({
                                    username: username,
                                    password: password,
                                    name: `${firstname} ${lastname}`
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then((response) => {
                                    if (response.status === 200) {
                                        response.json().then((data) => {
                                            localStorage.setItem('token', data.token);
                                            localStorage.setItem('username', data.username);
                                            localStorage.setItem('name', data.name);
                                            window.location.href = redirect;
                                        })
                                    } else if (response.status === 409) {
                                        alert("Username already taken!");
                                    } else {
                                        alert("Error creating user!");
                                    }
                                })
                        }}
                        className='flex flex-col justify-top items-center gap-4'
                    >
                        <input name='firstname' placeholder='First Name' className='border-1 border-black rounded-md p-2' />
                        <input name='lastname' placeholder='Last Name' className='border-1 border-black rounded-md p-2' />
                        <input name='username' placeholder="Username" className='border-1 border-black rounded-md p-2' />
                        <input name='password' placeholder="Password" className='border-1 border-black rounded-md p-2' />
                        <button type='submit' className='bg-black text-white rounded-md p-2'>Sign Up</button>
                    </form>
                </main>
            </div>
        )
    }
}