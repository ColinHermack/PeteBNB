'use client'
import { useState, useEffect } from 'react';
import { Anchor, Button, Image, Input, Loader, Card, Group, Text, Badge, Paper } from '@mantine/core';

const criteria = {
  maxPrice: -1,
  numBedrooms: -1,
  type: ''
}

const icons: { [key: string]: string } = {
  'apartment': '/apartmenticon.png',
  'house': '/houseicon.png',
  'room': 'dormicon.png'
}

export default function Home() {
  const [username, setUsername] = useState<string | null>('');
  const [name, setName] = useState<string | null>('');
  const [token, setToken] = useState<string | null>('');
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const name = localStorage.getItem('name');

    setUsername(username);
    setName(name);
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      return;
    }
    
    setLoading(true);

    let url = '/api/listing/many?';

    if (criteria.maxPrice !== -1) {
      url += `maxPrice=${criteria.maxPrice}&`;
    }

    if (criteria.numBedrooms !== -1) {
      url += `numBedrooms=${criteria.numBedrooms}&`;
    }

    if (criteria.type !== '') {
      url += `type=${criteria.type}`;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token') as string,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setListings(data);
      setLoading(false);
    })
  }, [])

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

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <Loader />
      </div>
    );
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
