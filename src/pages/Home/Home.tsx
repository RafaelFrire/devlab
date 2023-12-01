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
    <div className='container'>
      <Header />
      <h1>Home</h1>
      <div className="container-courses ">
      {Array.isArray(data) && data.map((item, index) =>{
        // console.log(item)
        return(
          
          <div className="row" key={item.id}>
            <div className="col-5">
            <div className="card" style={{width: "20rem"}}>
          <img src={item.url_imagem} className="card-img-top" alt="..."  style={{ width: "100%", height: "250px" }}/>
            <div className="card-body">
            <h5 className="card-title text-center">{item.nome_curso}</h5>
            <p className="card-text">{item.descricao}</p>
            <div className='low-card'>
                <p><strong>professor:</strong>{item.nome_professor}</p>
                <label id='categoria_label'>categoria: {item.categoria}</label>
            </div>

                </div>
               </div> 
              </div>
           </div>
       
        )
    })}
     </div>
    </div>
  
  )
}

export default Home