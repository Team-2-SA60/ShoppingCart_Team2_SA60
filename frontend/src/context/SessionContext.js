import { createContext, useContext, useState } from "react";
import api from "../utilities/axios";

export const SessionContext = createContext();

export function SessionProvider({children}) {
    const [ customer, setCustomer ] = useState(null);

    async function checkSession() {
        await api.get("/check-session")
        .then(res => {
            setCustomer(res.data);
        })
        .catch(res => {
            console.log("Invalid session: " + res.data);
            setCustomer(null);
        })
    }

    return (
        <SessionContext.Provider value={{customer, setCustomer, checkSession}}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSession() {
    return useContext(SessionContext);
}