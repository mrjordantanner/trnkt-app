import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Props {
    shouldGetRandom: boolean;
    setShouldGetRandom: React.Dispatch<React.SetStateAction<boolean>>;

    shouldFillMedia: boolean;
    setShouldFillMedia: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsContext = createContext<Props | undefined>(undefined);

export const SettingsContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [shouldGetRandom, setShouldGetRandom] = useState(false);
    const [shouldFillMedia, setShouldFillMedia] = useState(false);

    // useEffect(() => {
    // }, []);

    return (
        <SettingsContext.Provider 
        value={{
            shouldGetRandom, setShouldGetRandom,
            shouldFillMedia, setShouldFillMedia
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export function useSettingsContext(): Props {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettingsContext must be used within a SettingsContextProvider');
    }
    return context;
}
