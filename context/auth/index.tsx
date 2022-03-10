import React, { useState, useContext, createContext, useEffect } from 'react';

type Profile = {
    id: string;
    username: string;
    in_app_email: string;
    is_onboarded: boolean;
    email: string;
}

interface IContextValues {
    profile: Profile | null;
    updateProfile: (profile: Profile) => void;
}

export const AuthContext = createContext<IContextValues>({
    profile: null,
    updateProfile: () => {},
})

export function AuthProvider({children}: {
    children: JSX.Element
}) {
    const [profile, setProfile] = useState(null);

    function updateProfile(account: Profile) {
        setProfile(account);
    }

    return(
        <AuthContext.Provider value={{ profile, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
