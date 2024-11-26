"use client"

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

import { IUser } from "../types";
import { getCurrentUser } from "../services/AuthServices";
import { useUserStore } from "../lib/zustand/userStore";

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

interface IUserProviderValues {
    user: IUser | null;
    isLoading: boolean;
    setUser: (user: IUser | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleUser = async () => {
        const user = await getCurrentUser();
        // console.log(user)

        if (user) {
            useUserStore.getState().setUser(user.data);
            console.log('User from store', user.data);
        }
        
        setUser(user);
        setIsLoading(false);
    };

    useEffect(() => {
        handleUser();
    }, [isLoading]);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUser must be used within the UserProvider context");
    }

    return context;
};

export default UserProvider;
