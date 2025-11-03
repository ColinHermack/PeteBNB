import { useState, createContext } from 'react';

interface IUserProviderProps { 
    children: React.ReactNode
}

interface ClientUser { 
    username: string;
    name: string;
}

export const UserContext = createContext(null);

export const UserProvider = (props: IUserProviderProps) => {
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