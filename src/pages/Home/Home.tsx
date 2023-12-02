import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Index.tsx'
import { api } from '../../services/api.tsx'
import './index.css'

function Home() {

  const [data, setData] = React.useState([])

  useEffect(() =>{
    const getData = async () =>{
      const response = await api.get('/courses')
      await setData(response.data)
    
    }

    getData()
  },[])

  return (
    <div className='container '>
      <Header />
      <h1 className='text-center p-5 text-bold'>Home</h1>
      <div className="container-courses ">
      {Array.isArray(data) && data.map((item, index) =>{
        
        if(item.status === true){
          return(
            <div className="row p-8 " key={item.id}>
              <div className="col-5">
              <div className="card" style={{width: "20rem"}}>
            <img src={item.url_imagem} className="card-img-top" alt="..."  style={{ width: "100%", height: "200px" }}/>
              <div className="card-body">
              <h5 className="card-title text-center"><strong>{item.nome_curso}</strong></h5>
              <p className="card-text p-2">{item.descricao}</p>
                  </div>
                 </div> 
                </div>
             </div>
          )
        }
        else{
          return null;
        }
    })}
     </div>
    </div>
  
  )
}

export default Home