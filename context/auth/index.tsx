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
    const [feed, setFeed] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [cursor, setCursor] = useState<string | null>(null);
    const [order, setOrder] = useState('asc');

    function updateProfile(account: Profile) {
        setProfile(account);
    }

    function getIssues() {

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
