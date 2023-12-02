import React from 'react'
import './index.css'
import Header from '../../components/header/Index'
import { api } from '../../services/api'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, string } from "yup"

function CourseEdit() {

  const { id } = useParams();
  
  const [course, setCourse] = useState([]);
  const [NewCourse, setNewCourse] = React.useState({
    nome_curso: '',
    nome_professor: '',
    url_imagem: '',
    descricao: '',
    categoria: '',
    status:''
  });

  const schema = object({
    nome_curso:string().required("campo obrigatório."),
    professor:string().required("campo obrigatório.."),
    descricao:string().required("campo obrigatório..").max(200, "Tamanho máximo de 200 caracteres"),
    categoria:string().required("Campo obrigatório."),
    status:boolean().required("Campo obrigatório"),
    imglink:string().required("insira uma imagem.")
  })
  const {register,
    handleSubmit:onSubmit,
     watch,
      formState: {errors}} = useForm({resolver: yupResolver(schema)})
 

  useEffect(() =>{
    const getData = async () =>{
        const response = await  api.get(`/courses/${id}`)
        setCourse(response.data)
    }
    getData()
  }, [id])

  const handleSubmit = (data:any) =>{
    console.log(data)
  }



  const updateCourse = async () => {
    try {
      // Faça a chamada PATCH para atualizar o curso
      await api.patch(`/courses/${id}`, NewCourse);
      console.log('Curso atualizado com sucesso!', NewCourse);
      // Redireciona para a página de detalhes do curso ou outra página desejada
    } catch (error) {
      console.error('Erro ao atualizar o curso', error);
    }
  };


  return (
    <div className='bg-transparent'>
        <Header />
        <h1 className='p-3 text-dark'>Atualizando curso...</h1>
            <form className="row bg-white mx-auto p-5 shadow-lg rounded" onSubmit={onSubmit(handleSubmit)} >
            <div className="col">
            <label htmlFor="Professor" className="form-label">Nome do curso</label>
            <input
            placeholder='nome'
            type="text"
            className="form-control"
            id="nome_curso"
            value={NewCourse.nome_curso}
            {...register("nome_curso")}
            onChange={(e) => setNewCourse({ ...NewCourse, nome_curso: e.target.value })}
            />
            <span className='error'>{errors.nome_curso?.message}</span>
            </div>
            <div className="col-md-12">
            <label htmlFor="Professor" className="form-label">Professor</label>
            <input
            placeholder='Nome professor'
            type="text"
            className="form-control"
            id="professor"
            value={NewCourse.nome_professor}
            {...register("professor")}
            onChange={(e) => setNewCourse({ ...NewCourse, nome_professor: e.target.value })}
            />
            <span className='error'>{errors.professor?.message}</span>
            </div>
            <div className="col-md-12">
            <label htmlFor="imglink" className="form-label">Imagem</label>
            <input
            type="text"
            className="form-control"
            id="imglink"
            placeholder="Link URL"
            value={NewCourse.url_imagem}
            {...register("imglink")}
            onChange={(e) => setNewCourse({ ...NewCourse, url_imagem: e.target.value })}
            />
            <span className='error'>{errors.imglink?.message}</span>
            </div>
            <div className="col-12 row g-2">
            <label htmlFor="inputAddress2" className="form-label">Descrição</label>
            <input
            type="text"
            className="form-control"
            id="descricao"
            placeholder="Descrição "
            value={NewCourse.descricao}
            {...register("descricao")}
            onChange={(e) => setNewCourse({ ...NewCourse, descricao: e.target.value })}
            />
            <span className='error'>{errors.descricao?.message}</span>
            </div>

            <div className="col-md-6">
            <label htmlFor="inputState" className="form-label">Categoria</label>
            <select
            id="categoria"
            className="form-select"
            value={NewCourse.categoria}
              {...register("categoria")}
              onChange={(e) => setNewCourse({ ...NewCourse, categoria: e.target.value })}
              >
                <option value="" disabled>Escolher</option>
                <option>Desenvolvimento</option>
                <option>Design</option>
                <option>Segurança</option>
                <option>Análise de dados</option>
              </select>
              </div>

                <div className="col-md-6">
                <label htmlFor="inputState" className="form-label">Status</label>
                <select
                id="status"
                className="form-select"
                value={NewCourse.status}
                {...register("status")}
                onChange={(e) => setNewCourse({ ...NewCourse, status: e.target.value === 'Ativado' })}
                >
                  <option value="" disabled>Escolher</option>
                  <option>Ativado</option>
                  <option>Desativado</option>
                </select>
                </div>

                <div className="col-12 p-5 d-flex justify-content">
                <button type="submit" className="btn btn-primary" onClick={updateCourse}>cadastrar</button>
                </div>
                </form>
    </div>

  )
}

export default CourseEdit