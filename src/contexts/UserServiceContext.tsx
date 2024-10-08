import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import { UpdateUserRequestBody }  from '../models/updateUserRequestBody';
import { User,  } from '../models/user';

interface UserServiceContextProps {
    isAuthenticated: boolean;
    getToken: () => string | null;
    loginAsync: (email: string, password: string) => Promise<User | null>;
    logoutAsync: () => Promise<boolean>;
    currentUser: User | null;
    setCurrentUser: React.Dispatch<User | null>;
    registerNewUserAsync: (email: string, userName: string, password: string) => Promise<User | null>;
    updateUserInfoAsync: (updatedUserInfoBody: UpdateUserRequestBody) => Promise<User | null>;
}

const UserServiceContext = createContext<UserServiceContextProps | undefined>(undefined);

export const UserServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const userService = new UserService();
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuthenticated(!!getToken() && !!getLocalUser());
    }, [userService]);

    useEffect(() => {
        if (isAuthenticated && !currentUser) {
            refreshCurrentUser();
        }
    }, []);

    const refreshCurrentUser = async () => {
        console.log("Refreshing current user...");
        const userEmail = getLocalUser();
        const user = await userService.fetchUserByEmailAsync(userEmail);
        if (user) {
            setCurrentUser(user);
            console.log('Refreshed currentUser.');
        }
    }

    const getToken = () : string | null => {
        return userService.getToken();
    }

    const getLocalUser = (): string | null => {
        return userService.getLocalUser();
    }

    const registerNewUserAsync = async (email: string, userName: string, password: string) : Promise<User | null> => {
        const user = await userService.registerNewUserAsync(email, userName, password);
        if (user?.email) {
            console.log(`UserService: Successfully registered New User: ${user.email} / ${user.userName}`);
            navigate('/user/login');
        }
        return user;
    };

    const loginAsync = async (email: string, password: string) : Promise<User | null>=> {
        const user = await userService.loginUserAsync(email, password);
        if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
        } else {
            console.error("UserService: No User was returned from the login operation.");
        }
        return user;
    };

    const logoutAsync = async (): Promise<boolean> => {
        try {
            const success = await userService.logoutUserAsync();
            if (success) {
                setCurrentUser(null);
                setIsAuthenticated(false);
                navigate('/');
                console.log('UserService: Successfully logged out User.');
                return true;
            }
        }
        catch (error) {
            console.error(error);
            return false;
        }
        return false;

    };

    const updateUserInfoAsync = async (updatedUserInfoBody: UpdateUserRequestBody): Promise<User | null> => {
        try {
            const user = await userService.updateUserInfoAsync(updatedUserInfoBody);
            if (user != null) {
                setCurrentUser(user);
                return user;
            }
        } catch (error) {
            console.error(error);
            return Promise.resolve(null);
          }

          return null;
    }

    return (
        <UserServiceContext.Provider 
        value={{
            isAuthenticated, getToken,
            loginAsync, logoutAsync, 
            currentUser, setCurrentUser, 
            updateUserInfoAsync,
            registerNewUserAsync,
        }}>
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
