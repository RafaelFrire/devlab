import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Index.tsx'
import { api } from '../../services/api.tsx'
import './index.css'

function Home() {

  const [data, setData] = useState([])


  const imgUrl = "https://repository-images.githubusercontent.com/37153337/9d0a6780-394a-11eb-9fd1-6296a684b124"


  useEffect(() =>{
    const getData = async () =>{
      const response = await api.get('/courses')
      await setData(response.data)
    
    }

    getData()
  },[])

  console.log(data)
  return (
    <div className='container'>
      <Header />
      <h1>Home</h1>
      <div className="container-courses ">
      {Array.isArray(data) && data.map((item, index) =>{
        return(
          
          <div className="row">
            <div className="col">
            <div className="card" style={{width: "18rem"}}>
          <img src={imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title text-center">{item.nome_curso}</h5>
            <p className="card-text">{item.descricao}</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
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