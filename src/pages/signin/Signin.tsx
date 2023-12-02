import React, { SyntheticEvent, useContext } from "react";

import './index.css';
import { AuthContext } from "../../context/auth/Auth";
import { Navigate } from "react-router-dom";


// cadastrar

function Signin(){
  const [email, setEmail] = React.useState<string>();
  const [senha, setSenha] = React.useState<string>();
  
  const {signIn, signed} = useContext(AuthContext)

  const handleSignIn = async (event: SyntheticEvent) => {
    event.preventDefault();
    // validando inputs
    if (!email || !senha) {
      alert("Preencha todos os campos!"); 
      return;
    }
    try {
      // fazendo requisição para o back-end
      // autenticar o usuário 
      await signIn({ email, senha });

    } catch (error) {
      console.error("Erro durante o login:", error);
    }
  };
  

if(signed){
    return <Navigate to="/home"/>
}
else{

  return (
  <div className='main-container bg-light'>
        <form onSubmit={handleSignIn}>
            <h1 className="text">Login</h1>
            <div className="mb-3">
            <label htmlFor="InputEmail" className="form-label">Endereço de E-mail</label>
            <input type="email"
            className="form-control" id="InputEmail" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
            <div id="emailHelp" className="form-text">Nunca compartilhe seu acesso com ninguém.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
            <input type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setSenha(e.target.value)}
            />
        </div>

        <button type="submit" className="btn btn-primary " onClick={handleSignIn}>Enviar</button>
    </form>

    </div>
        
  )
  }
}

export default Signin