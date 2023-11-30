import React, { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../../services/api";


interface User {
  id: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  signed: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const loadingStoreData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageToken && storageUser) {
        setUser(JSON.parse(storageUser));
      }
    };

    loadingStoreData();
  }, []);

     const signIn = async ({email, senha}:{email:string, senha:string}) =>  {
      try {
    
        const response = await api.post("/auth/login",{ email, senha }, {
          headers: {'Content-Type': 'application/json'},
        });
        
          if(response.data.error){
              alert(response.data.error);
          }
         else {
          // salvando token e no localstorage
          setUser(response.data);
          api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
          localStorage.setItem("@Auth:token", response.data.token)
          localStorage.setItem("@Auth:user", response.data.user.email)
        }
      } catch (error) {
        console.error("Erro durante o login:", error);
  
        // Adicione mais lógica de tratamento de erro conforme necessário
        alert("Erro durante o login. Por favor, tente novamente.");
      }

  

 
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn }}>
      {children}
    </AuthContext.Provider>
  
  );
};
