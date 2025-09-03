"use client"
import { createContext, useState } from "react";
import { UserInfo } from "../_types/userInfo";

type UserInfoContextType = {
    userInfo: UserInfo | null,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>
}
export const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

const UserInfoContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
}

export default UserInfoContextProvider;