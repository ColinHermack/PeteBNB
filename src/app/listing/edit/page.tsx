'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Loader, Fieldset, TextInput, Button, Group, Radio, NumberInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const defaultListing = {
    address: "",
    bedrooms: 0,
    cost: 0,
    description: "",
    endDate: new Date(),
    favorite: false,
    id: "",
    lister: {
        username: "",
        name: ""
    },
    startDate: new Date(),
    title: "",
    type: ""
}

export default function EditListingPage() {
    return (
        <Suspense fallback={<>Listing...</>}>
            <EditListingPageInner />
        </Suspense>
    )
}

function EditListingPageInner() {
    const [listing, setListing] = useState<any>(defaultListing);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListing({
            ...listing,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token === null) {
            window.location.href = `/signin?redirect=/listing/edit?id=${searchParams.get('id')}`;
        }
        setToken(token);

        if (searchParams.get('id') == null) {
            window.location.href = '/';
        }

        fetch(`/api/listing?id=${searchParams.get('id')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setListing(data);
                })
            }
        })
        setLoading(false);
    }, [])

    if (loading) {
        return <div className='flex flex-col justify-center items-center min-h-screen'><Loader /></div>
    }

    return (
        <div className='flex flex-col justify-top items-center min-h-screen'>
            <h1 className='text-2xl font-bold'>Edit Listing</h1>

            <Fieldset className='mt-8 flex flex-col justify-top items-center w-[600px] max-w-7/8 mb-8'>
                <TextInput
                    placeholder="Address"
                    label="Address"
                    className='w-15/16'
                    value={listing.address}
                    onChange={handleChange}
                    name='address'
                    required
                />
                <TextInput
                    placeholder='Listing Title'
                    label='Listing Title'
                    className='w-15/16 mt-4'
                    value={listing.title}
                    onChange={handleChange}
                    name='title'
                    required
                />
                <Radio.Group name="listingType" label='Property Type' required className='mt-4' value={listing.type} onChange={(event) => {
                    setListing({
                        ...listing,
                        type: event
                    })
                }}>
                    <Radio value="apartment" label="Apartment" className='mt-2'/>
                    <Radio value="house" label="House" className='mt-2' />
                    <Radio value="room" label="Room" className='mt-2' />
                </Radio.Group>
                <NumberInput
                    placeholder='Bedrooms'
                    label='Number of Bedrooms'
                    className='w-15/16 mt-4'
                    value={listing.bedrooms}
                    onChange={(value) => {
                        if (typeof value === 'number') {
                            setListing({
                                ...listing,
                                bedrooms: value
                            })
                        }
                    }}
                    required
                    min={0}
                />
                <TextInput
                    placeholder='Description'
                    label='Description'
                    className='w-15/16 mt-4'
                    value={listing.description}
                    onChange={handleChange}
                    name='description'
                    required
                />
                <NumberInput
                    placeholder='Cost'
                    label='Monthly Rent'
                    className='w-15/16 mt-4'
                    value={listing.cost}
                    onChange={(value) => {
                        if (typeof value === 'number') {
                            setListing({
                                ...listing,
                                cost: value
                            })
                        }
                    }}
                    required
                />
                <Button variant="filled" className='mt-8' onClick={() => {
                    fetch('/api/listing/update', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`
                        },
                        body: JSON.stringify({
                            id: listing.id,
                            address: listing.address,
                            title: listing.title,
                            type: listing.type,
                            bedrooms: listing.bedrooms,
                            description: listing.description,
                            cost: listing.cost,
                            startDate: listing.startDate,
                            endDate: listing.endDate
                        })
                    }).then((response) => {
                        if (response.ok) {
                            window.location.href='/mylistings';
                        } else {
                            alert('Error updating listing!');
                        }
                    })
                }}>Update</Button>
            </Fieldset>
        </div>
    )
}