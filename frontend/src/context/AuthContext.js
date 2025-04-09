import { createContext, useContext, useState } from "react";
import api from "../utilities/axios";

export const AuthContext = createContext();

export function AuthProvider({children}) {
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
        <AuthContext.Provider value={{customer, setCustomer, checkSession}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}