'use client';

import { Fieldset, TextInput, Button, Group, Radio, NumberInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';

const defaultValues = {
    address: '',
    title: '',
    type: 'apartment',
    bedrooms: 0,
    description: '',
    features: [],
    cost: 0,
    startDate: new Date(),
    endDate: new Date()
}

export default function NewListingPage() {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);
    const [formData, setFormData] = useState({
        address: '',
        title: '',
        type: 'apartment',
        bedrooms: 0,
        description: '',
        features: [],
        cost: 0,
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token == null) {
            window.location.href='/signin?redirect=/newlisting'
        } else {
            setUserToken(token);
        }
    })

    return (
        <div className='flex flex-col justify-top items-center'>
            <h1 className='mt-8 font-bold text-2xl'>List Your Property</h1>
            <Fieldset className='mt-8 flex flex-col justify-top items-center w-[600px] max-w-7/8 mb-8'>
                <TextInput
                    placeholder="Address"
                    label="Address"
                    className='w-15/16'
                    value={formData.address}
                    onChange={handleChange}
                    name='address'
                    required
                />
                <TextInput
                    placeholder='Listing Title'
                    label='Listing Title'
                    className='w-15/16 mt-4'
                    value={formData.title}
                    onChange={handleChange}
                    name='title'
                    required
                />
                <Radio.Group name="listingType" label='Property Type' required className='mt-4' value={formData.type} onChange={(event) => {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        type: event
                    }))
                }}>
                    <Radio value="apartment" label="Apartment" className='mt-2'/>
                    <Radio value="house" label="House" className='mt-2' />
                    <Radio value="room" label="Room" className='mt-2' />
                </Radio.Group>
                <NumberInput
                    placeholder='Bedrooms'
                    label='Number of Bedrooms'
                    className='w-15/16 mt-4'
                    value={formData.bedrooms}
                    onChange={(value) => {
                        if (typeof value === 'number') {
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                bedrooms: value,
                            }));
                        }
                    }}
                    required
                    min={0}
                />
                <TextInput
                    placeholder='Description'
                    label='Description'
                    className='w-15/16 mt-4'
                    value={formData.description}
                    onChange={handleChange}
                    name='description'
                    required
                />
                <NumberInput
                    placeholder='Cost'
                    label='Monthly Rent'
                    className='w-15/16 mt-4'
                    value={formData.cost}
                    onChange={(value) => {
                        if (typeof value === 'number') {
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                cost: value,
                            }));
                        }
                    }}
                    required
                />
                <p className='mt-4 mb-2'>Sublease Period</p>
                <DatePicker type='range' value={dateRange} onChange = {setDateRange}/>
                <Button variant="filled" className='mt-8' onClick={() => {
                    fetch('/api/listing/new', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${userToken}`
                        },
                        body: JSON.stringify({
                            address: formData.address,
                            title: formData.title,
                            type: formData.type,
                            bedrooms: formData.bedrooms,
                            description: formData.description,
                            cost: formData.cost,
                            startDate: dateRange[0],
                            endDate: dateRange[1]
                        })
                    })
                }}>List</Button>
            </Fieldset>
        </div>
    )
}