import React, { useContext } from 'react'
import { AuthContext } from "../../context/auth/Auth";
import { Navigate } from "react-router-dom";
import Modal from '../../components/Modal/Modal.tsx'
import { api } from '../../services/api.tsx'
import './index.css'
import Header from '../../components/header/Index.tsx'



function Course() {

    const [courses, setCourses] = React.useState([]);
    const [name, setName] = React.useState([]);
    const {signed} = useContext(AuthContext)

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

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
              alert("Nenhum curso encontrado com o nome especificado.");
            }
          } catch (error) {
            alert("Erro ao buscar dados:", error);
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
           <button className="btn btn-primary " onClick={getCourseByName}>buscar</button>
        </div>
      
         <table className="table container">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Curso</th>
            <th scope="col">Professor</th>
            <th scope="col">categoria</th>
            <th scope="col">descrição</th>
            <th scope="col-5 bg-danger">ação</th>
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
                <td>desativar</td>
            </tr>
            </tbody>
        );
})}

        
        </table>
        <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-warning text-dark " type="button" onClick={openModal}>Cadastrar</button>

        <Modal isOpen={isModalOpen} onClose=
        {closeModal}>
        {/* começo do modal */}
        
            <div className='container-modal'>
              <form className="row g-3 bg-light">
        <div className="col-md-56">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail4"/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword4"/>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">City</label>
          <input type="text" className="form-control" id="inputCity"/>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">State</label>
          <select id="inputState" className="form-select">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">Zip</label>
          <input type="text" className="form-control" id="inputZip"/>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck"/>
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">cadastrar</button>
          <button type="submit" className="btn btn-warning" onClick={closeModal}>cancelar</button>
        </div>
      </form>
      </div>
        {/* fim do modal */}
      </Modal>
  </div>
    </div>
  )
}


export default Course