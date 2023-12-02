const { Client, Pool } = require("pg")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// método connect gera conexão com o banco de dados
const pool = new Pool({
    user: "postgres",
        password: "admin",
        host: "localhost",
        port: 5500,
        database: "devlab" 
})

async function connect(){
    try {
        const client = await pool.connect();
        console.log("Conectado ao BD");
        return client;
    } catch (error) {
        console.error("Erro ao conectar ao Banco de dados", error);
        throw error;
    }
    
}
connect();
// Método para buscar todos os usuários do BD
async function selectUsers(){
    const client = await connect(); 
    const res = await client.query("SELECT * FROM tbl_usuarios");
    return res.rows
}
// metodo para buscar um usuário com ID específico
async function selectUser(id){
    const client = await connect()
    const response = await client.query("select * from tbl_usuarios where id_usuario=$1", [id])
    return response.rows
}
// método para cadastrar usuários:
async function registerUser(user){
    const client = await connect();
    const email = user.email;
    const pwd = await bcrypt.hash(user.senha, 10)
    const sql = "INSERT INTO tbl_usuarios(email, senha) VALUES ($1, $2)";
    await client.query(sql, [email,pwd]);
}

async function deleteUser(id){
    const client = await connect();
    try{
        const sql = "DELETE FROM tbl_usuarios WHERE id_usuario=$1";
        const values = [id];
        await client.query(sql, values)
    }
    catch (error){
        console.error("Usuário não encontrado: ")
    }
    finally{
        client.release();
    }

    
}


// métodos para a tabela cursos do BD

async function getCourse(id){
    const client = await connect();
    const sql = "SELECT * FROM tbl_cursos WHERE id=$1"
    const response = await client.query(sql, [id]);
    return response.rows
}


async function getCourses(){
    const client = await connect();
    const sql = "SELECT * FROM tbl_cursos";
    const response = await client.query(sql)
    return response.rows

}


async function registerCourse(data){
    const client = await connect();
    const sql = "INSERT INTO tbl_cursos (nome_curso, nome_professor, categoria, descricao, url_imagem, status) VALUES ($1, $2, $3, $4, $5, $6)" 
    const values = [data.nome_curso, data.nome_professor, data.categoria, data.descricao, data.url_imagem, data.status];
    await client.query(sql, values);
    
 }


 async function updateCourse(id, data){
    const client = await connect();
    if (data.status === 'Ativado') {
        data.status = true;
      } else if (data.status === 'Desativado') {
        data.status = false;
      }
    try {
        const sql = `
          UPDATE tbl_cursos 
          SET nome_curso = $1, 
              nome_professor = $2, 
              categoria = $3, 
              descricao = $4, 
              url_imagem = $5, 
              status = $6
          WHERE id = $7
        `;
        const values = [
          data.nome_curso,
          data.nome_professor,
          data.categoria,
          data.descricao,
          data.url_imagem,
          data.status,
          id
        ];
        await client.query(sql, values);
        console.log("Curso atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar o curso", error);
        throw error;  // Rejogue o erro para tratamento em um nível superior
      }

    }
    
 

 async function deleteCourse(id){
    const client = await connect();
    const sql = "DELETE FROM tbl_cursos WHERE id=$1";
    await client.query(sql, [id]);
 }

 async function authUser(email, senha) {
    const client = await connect();
  
    try {
      const sql = "SELECT * FROM tbl_usuarios WHERE email=$1";
      const response = await client.query(sql, [email]);
  
      if (response.rows.length === 0) {
        console.log("USUÁRIO NÃO ENCONTRADO");
        return { error: "Usuário não encontrado" };
      }
      const user = response.rows[0];
      
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      console.log("Senha válida?", isPasswordValid);


      if (!isPasswordValid) {
        console.log("SENHA INVALIDA");
        return { error: "SENHA INVALIDA" };
      }
      
      const token = jwt.sign({ userId: user.id_usuario, email: user.email }, 'secretpassword', { expiresIn: '1h' });
  
      return { token, user: { id: user.id_usuario, email: user.email } };
    } finally{
        client.release();
    }
  }
  

module.exports = {
    selectUsers,
    selectUser,
    registerUser,
    deleteUser,
    getCourses,
    getCourse,
    registerCourse,
    deleteCourse,
    authUser,
    updateCourse
}