'use client';

import { useState, useEffect } from 'react';
import { Loader, Card, Group, Badge, Image, Text, Button } from '@mantine/core';

const icons: { [key: string]: string } = {
  'apartment': '/apartmenticon.png',
  'house': '/houseicon.png',
  'room': 'dormicon.png'
}

export default function FavoritesPage() {
    const [token, setToken] = useState<string | null>(null);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (token === null) {
            window.location.href = '/signin?redirect=/favorites';
        }

        setToken(token);

        fetch('api/favorite/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }})
        .then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    console.log(data);
                    setListings(data);
                })
            }
        })
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Loader />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col justify-top items-center">
          <main className='flex flex-col justify-top items-center w-[600px] max-w-screen'>
            {
              listings.map((listing: any) => {
                return (
                  <Card shadow="sm" padding="lg" radius="md" withBorder className='mt-4 w-7/8' key={listing._id}>
                    <Card.Section>
                      <Image
                        src={icons[listing.type]}
                        height={160}
                        alt="Norway"
                      />
                    </Card.Section>
    
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
    
                    <Button fullWidth mt="md" radius="md" onClick={() => {
                      window.location.href = `/listing?id=${listing.id}`
                    }}>
                      Learn More
                    </Button>
                  </Card>
                )
              })
            }
          </main>
        </div>
    );
}