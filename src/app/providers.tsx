"use client";
import { Provider } from "react-redux";
import store from "./_redux/store";
import UserInfoContextProvider from "./_contexts/UserInfoContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <UserInfoContextProvider>
                        {children}
            </UserInfoContextProvider>
        </Provider>
    )
}