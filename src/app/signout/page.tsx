'use client';

import { useState, useEffect } from 'react';

export default function SignOutPage() {
    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('/api/auth/signout', {
            method: 'POST',
            body: JSON.stringify({token: token}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('name');
                    window.location.href = '/';
                } else {
                    alert("Error signing out user!");
                }
            })
    }, [])
    
    return (
        <div>Signing Out...</div>
    )
}