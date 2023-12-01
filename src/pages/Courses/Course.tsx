import React, { useContext } from 'react'
import { AuthContext } from "../../context/auth/Auth";
import { Navigate } from "react-router-dom";
import Modal from '../../components/Modal/Modal.tsx'
import { api } from '../../services/api.tsx'
import './index.css'
import Header from '../../components/header/Index.tsx'



function Course() {
    // data to validation
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


// Registrando um novo curso.
const [NewCourse, setNewCourse] = React.useState({
  nome_curso: '',
  nome_professor: '',
  url_imagem: '',
  descricao: '',
  categoria: '',
});
    const registerCourse = async () =>{
      try {
        // Realizar a requisição POST para cadastrar o novo curso
        const response = await api.post("/courses", NewCourse);
  
        console.log(response.data); // A resposta da API (pode ajustar conforme necessário)
  
  
        // Atualizar a lista de cursos (opcional, dependendo do seu fluxo)
        const updatedCourses = await api.get("/courses");
        setCourses(updatedCourses.data);
      } catch (error) {
        console.error("Erro ao cadastrar novo curso:", error);
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
        <label htmlFor="Professor" className="form-label">Nome do curso</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={NewCourse.nome_curso}
          onChange={(e) => setNewCourse({ ...NewCourse, nome_curso: e.target.value })}
        />
        </div>
        <div className="col-md-6">
          <label htmlFor="Professor" className="form-label">Professor</label>
          <input
          type="text"
          className="form-control"
          id="Professor"
          value={NewCourse.nome_professor}
          onChange={(e) => setNewCourse({ ...NewCourse, nome_professor: e.target.value })}
        />
        </div>
        <div className="col-md-6">
          <label htmlFor="imglink" className="form-label">Imagem</label>
          <input
          type="text"
          className="form-control"
          id="imglink"
          placeholder="Link URL"
          value={NewCourse.url_imagem}
          onChange={(e) => setNewCourse({ ...NewCourse, url_imagem: e.target.value })}
        />
        </div>
        <div className="col-12 row g-2">
          <label htmlFor="inputAddress2" className="form-label">Descrição</label>
          <input
          type="text"
          className="form-control"
          id="descricao"
          placeholder="Descrição "
          value={NewCourse.descricao}
          onChange={(e) => setNewCourse({ ...NewCourse, descricao: e.target.value })}
        />
        </div>

        <div className="col-md-5">
          <label htmlFor="inputState" className="form-label">Categoria</label>
          <select
          id="inputState"
          className="form-select"
          value={NewCourse.categoria}
          onChange={(e) => setNewCourse({ ...NewCourse, categoria: e.target.value })}
        >
            <option selected>Escolher</option>
            <option>Desenvolvimento</option>
            <option>Design</option>
            <option>Segurança</option>
            <option>Análise de dados</option>
          </select>
        </div>
       
        <div className="col-12 p-5 d-flex justify-content">
          <button type="submit" className="btn btn-primary" onClick={registerCourse}>cadastrar</button>
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