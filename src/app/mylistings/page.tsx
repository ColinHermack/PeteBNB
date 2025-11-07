'use client';

import { useState, useEffect } from 'react';

import { Loader, Card, Group, Badge, Text, Button } from '@mantine/core';

export default function MyListingsPage() {
    const [token, setToken] = useState<string | null>(null);

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const token = localStorage.getItem('token');
        if (token === null) {
            window.location.href = '/signin?redirect=/mylistings';
        }

        setToken(token);

        fetch('api/listing/mine', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setListings(data);
                    setLoading(false);
                })
            }
        })
    }, []);

    if (loading) {
        return (
            <div className='flex flex-col justify-center items-center min-h-screen'>
                <Loader />
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-top items-center min-h-screen'>
            <Button 
                variant="filled"
                onClick={() => {
                    window.location.href='/newlisting';
                }}
            >Add a Listing</Button>
            {
                listings.map((listing: any) => {
                return (
                    <Card shadow="sm" padding="lg" radius="md" withBorder className='mt-4 w-7/8 max-w-[600px]' key={listing._id}>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>{listing.title}</Text>
                        <Badge>$ {listing.cost}</Badge>
                    </Group>
    
                    <Text size="sm" c="dimmed">
                        {listing.description}
                    </Text>
    
                    <Group justify='space-between' mt="md">
                        <Text size="sm" c="dimmed">
                        {listing.address}
                        </Text>
                        <Text size="sm" c="dimmed">
                        {listing.bedrooms} Bedrooms
                        </Text>
                    </Group>
    
                    <Text size="sm" c="dimmed">{new Date(listing.startDate).toLocaleDateString()} - {new Date(listing.endDate).toLocaleDateString()}</Text>
    
                    <Group justify='start' mt="md">
                        <Button mt="md" radius="md" onClick={() => {
                            window.location.href = `/listing/edit?id=${listing.id}`
                        }}>
                            Update
                        </Button>
                        <Button mt='md' radius='md' color='red' onClick={() => {
                            fetch('/api/listing/delete', {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `${token}`
                                },
                                body: JSON.stringify({id: listing.id})
                            })
                                .then((response) => {
                                    if (response.status === 200) {
                                        window.location.reload();
                                    }
                                })
                        }}>Delete</Button>
                    </Group>
                    </Card>
                )
                })
            }
        </div>
    )
}