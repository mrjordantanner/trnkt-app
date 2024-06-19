import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import { User } from '../models/user';

interface UserServiceContextProps {
    isAuthenticated: boolean;
    loginAsync: (email: string, password: string) => Promise<boolean>;
    logout: () => void;

    // TODO these arent' working?
    currentUser: User | null;
    setCurrentUser: React.Dispatch<User | null>;
}

const UserServiceContext = createContext<UserServiceContextProps | undefined>(undefined);

export const UserServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const userService = new UserService();
    const navigate = useNavigate();

    useEffect(() => {
        const token = userService.getToken();
        if (token) {
            setIsAuthenticated(true);
        }
    }, [userService]);

    const loginAsync = async (email: string, password: string) => {
        const loggedIn = await userService.loginUser(email, password);
        if (loggedIn) {
            setIsAuthenticated(true);
            const user = await userService.fetchUserByEmail(email);
            if (user) {
                console.log(`Current User: ${user.email}`);
                setCurrentUser(user);
            }
        }
        return loggedIn;
    };

    const logout = () => {
        userService.logoutUser();
        setCurrentUser(null);
        setIsAuthenticated(false);
        navigate('/logout');
    };

    return (
        <UserServiceContext.Provider value={{ isAuthenticated, loginAsync, logout, currentUser, setCurrentUser }}>
            {children}
        </UserServiceContext.Provider>
    );
};

export function useUserService(): UserServiceContextProps {
    const context = useContext(UserServiceContext);
    if (!context) {
        throw new Error('useUserService must be used within a UserServiceProvider');
    }
    return context;
}
