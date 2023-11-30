import React, { useContext } from 'react'
import { AuthContext } from "../../context/auth/Auth";
import { Navigate } from "react-router-dom";

import { api } from '../../services/api.tsx'
import './index.css'
import Header from '../../components/header/Index.tsx'



function Course() {

    const [courses, setCourses] = React.useState([]);
    const [name, setName] = React.useState([]);

    const {signed} = useContext(AuthContext)

    React.useEffect(()=>{
        const getData = async() =>{
            const response = await api.get("/courses")
             setCourses(response.data)
        }

       getData()
       console.log(courses)
    },[])

// busca por nome

    const getCourseByName = async () =>{
      
        try {
            const response = await api.get("/courses");
            const allCourses = response.data;
        
            // Filtra os cursos com base no nome
            const filteredCourses = allCourses.filter(course => course.nome_curso === name);
        
            // Atualiza o estado apenas se houver cursos filtrados
            if (filteredCourses.length > 0) {
              setCourses(filteredCourses);
            } else {
              console.log("Nenhum curso encontrado com o nome especificado.");
            }
          } catch (error) {
            console.error("Erro ao buscar dados:", error);
          }
      

    }

  
    if(!signed){
        return <Navigate to="/signin"/>
    }
    
  return (
    <div>
        <Header />
        <h1>Cursos</h1>
        <div className="mb-3 col-4" id='pesquisa'>
        <label htmlFor="exampleFormControlInput1" className="form-label">Busca rapida</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Buscar"
         onChange={(e) => setName(e.target.value)}/>
           <button onClick={getCourseByName}>Buscar</button>
        </div>
      
         <table className="table container">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Curso</th>
            <th scope="col">Professor</th>
            <th scope="col">categoria</th>
            <th scope="col">descrição</th>
            <th>ação</th>
            </tr>
        </thead>

        {Array.isArray(courses) && courses.map((course, index) => {
        console.log(course);
        return (
            <tbody key={index}>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{course.nome_curso}</td>
                <td>{course.nome_professor}</td>
                <td>{course.categoria}</td>
                <td>{course.descricao}</td>
                <td>editar</td>
            </tr>
            </tbody>
        );
})}

        
        </table>
    </div>
  )
}


export default Course