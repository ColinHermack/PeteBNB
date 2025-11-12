'use client';
import { useState, createContext } from 'react';

interface IUserProviderProps { 
    children: React.ReactNode
}

interface ClientUser { 
    username: string;
    name: string;
}

interface UserContextType {
    user: ClientUser | null;
    login: (username: string, name: string) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<IUserProviderProps> = (props: IUserProviderProps) => {
    const [user, setUser] = useState<ClientUser | null>(null);

    const login = (username: string, name: string) => {
        setUser({ username: username, name: name });
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {props.children}
        </UserContext.Provider>
    );
}