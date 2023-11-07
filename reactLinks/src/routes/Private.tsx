import { ReactNode, useState, useEffect } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps {
    children: ReactNode;
}

export function Private({children}: PrivateProps) : any{
    const [ loading, setLoading ] = useState(true) // Verifica se está carregando ou não
    const [ signed, setSigned ] = useState(false) // Verifar se está logado ou não

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (use) {
                const userData = {
                    uid: user?.id,
                    email: user?.email
                }
                localStorage.SetItem("@medusaLinks", JSON.stringify(userData))
                setLoading(false) // Agora não está carregando!
                setSigned(true) // Agora está logado!
            } else {
                setLoading(false)
                setSigned(false)
            }
        })
        return(() => {
            unsub();
        })
    }, [])
    if (loading) {
        return<div><h1>Carregando</h1></div>
    }
    if (!signed) {
        return <Navigate to="/login"/>
    }
    return children;
}