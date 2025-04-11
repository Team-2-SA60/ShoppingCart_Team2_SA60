import { createContext, useContext, useState } from "react";
import api from "../utilities/axios";

export const SessionContext = createContext();

export function SessionProvider({children}) {
    const [ customer, setCustomer ] = useState(null);
    const [ isLoading, setLoading ] = useState(true);

    async function checkSession() {
        setLoading(true);
        await api.get("/check-session")
        .then(res => {
            if (res.data !== '') {
                setCustomer(res.data);
            } else {
                setCustomer(null);
            }
        })
        .catch(res => {
            console.log("Unable to check session: " + res.data);
        })
        .finally(
            setLoading(false)
        )
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