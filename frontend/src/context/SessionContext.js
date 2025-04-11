import { createContext, useContext, useState } from "react";
import api from "../utilities/axios";

export const SessionContext = createContext();

export function SessionProvider({children}) {
    const [ customer, setCustomer ] = useState(null);
    const [ isLoading, setLoading ] = useState(true);

    async function checkSession() {
        try {
            const sessionResponse = await api.get("/check-session");
            const customerData = sessionResponse.data || null;
            setCustomer(customerData);
            return customerData;
        } catch (error) {
            console.error("Session check failed:", error);
            setCustomer(null);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return (
        <SessionContext.Provider value={{customer, setCustomer, checkSession, isLoading}}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSession() {
    return useContext(SessionContext);
}