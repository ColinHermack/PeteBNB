'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge, Button, Loader } from '@mantine/core';

export default function ListingPage() {
    const [listing, setListing] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();

    useEffect(() => {
        setLoading(true);

        const id = searchParams.get('id');

        if (id == null) {
            window.location.href = '/';
        }

        if (localStorage.getItem('token') == null) {
            window.location.href = `/signin?redirect=/listing?id=${id}`;
        }

        setToken(localStorage.getItem('token'));

        fetch(`/api/listing?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    window.location.href = '/404';
                }
                return response.json();
            })
            .then(data => {
                setListing(data);
                setLoading(false);
            })
    }, [])

    if (loading || listing == null) {
        return <div className='flex justify-center items-center min-h-screen'><Loader /></div>
    } else {
        return (
            <div className='flex flex-col justify-top items-center min-h-screen'>
                <p className='text-2xl font-bold mt-8'>{listing.title}</p>
                <p className='mt-4 text-sm'>{listing.address}</p>
                <div className='flex flex-row justify-between items-center w-[400px] max-w-screen mt-8'>
                    <Badge>{listing.type}</Badge>
                    <Badge>{listing.bedrooms} Bedrooms</Badge>
                    <Badge>$ {listing.cost}</Badge>
                </div>
                <p className='mt-8'>{listing.description}</p>
                <Button 
                    variant={listing.favorite ? 'filled' : 'outline'}
                    className='mt-8'
                    onClick={() => {
                        let url = listing.favorite ? '/api/favorite/remove' : '/api/favorite/add';
                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({listingId: listing.id})
                        })
                            .then(response => {
                                if (response.status === 200) {
                                    window.location.reload();
                                }
                            })
                        }
                    }
                >
                    {listing.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>

            </div>
        );
    }
}   