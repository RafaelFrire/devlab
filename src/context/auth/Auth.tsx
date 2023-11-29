import {ReactNode, createContext, useState, useEffect } from 'react'

interface AuthProviderProps {
    children: ReactNode;
  }

export const AuthContext = createContext({});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  
    // validando para ver se já está logado.
    const [user, setUser] = useState('')


    useEffect(() =>{
        const userToken = 



    }, [])

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
  };




