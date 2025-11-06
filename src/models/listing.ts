import { User } from './user';

export type DwellingType = 'apartment' | 'house' | 'room';

export type Listing = {
    id: string,
    address: string,
    title: string,
    type: DwellingType,
    bedrooms: number,
    lister: {
        username: string,
        name: string
    },
    description: string,
    cost: number,
    startDate: Date,
    endDate: Date
}