import React, { SyntheticEvent } from 'react'
import './index.css';
import { api } from "../../services/api";

interface User {
  email: string;
  senha: string;
}

function signup() {
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [auth, setAuth] = React.useState(false);


  const HandleClick =  async (event:SyntheticEvent) =>{
    event.preventDefault()
    await userAuth()
    
}

const userAuth = async ()=>{
  
  try{
    const response = await api.get<User[]>("/users")
    const users =  response.data

    const authenticatedUser = users.find((client) => client.email === email && client.senha === pwd)

    if(authenticatedUser){
      console.log("usuário Autenticado");
      setAuth(true);
    }
    else{
      console.log("usuário inválido")
      setAuth(false)
    }
    
  }
  catch (error){
    console.error("error ao autenticar usuário")
  }

}


  return (
    <div className='main-container bg-danger'>
        <form>
            <h1>Cadastrar</h1>
            <div className="mb-3">
            <label htmlFor="InputEmail" className="form-label">Endereço de E-mail</label>
            <input type="email"
            className="form-control" id="InputEmail" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
            <div id="emailHelp" className="form-text">Nunca compartilhe seu acesso com ninguém.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPwd(e.target.value)}/>
            <p>cadastrar</p>
        </div>
    
        <button type="submit" className="btn btn-primary " onClick={HandleClick}>Enviar</button>
    </form>

    </div>
    
  )
}

export default signup