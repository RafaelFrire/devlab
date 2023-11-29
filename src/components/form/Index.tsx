import React from 'react'
import './index.css';

interface FormProps{
    title: string,
}

const Index: React.FC<FormProps> = ({title}:FormProps) =>{
    const [email, setEmail] = React.useState('');
    const [pwd, setPwd] = React.useState('');

    
  return (
    <div className='main-container'>
        <form>
            <h1>{title}</h1>
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
    
        <button type="submit" className="btn btn-primary ">Enviar</button>
    </form>
    </div>

  
   
  )
}

export default Index;