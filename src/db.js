const { Client } = require("pg")
const bcrypt = require('bcrypt')

// método connect gera conexão com o banco de dados
async function connect(){


    try{
        if(global.connection){
            return global.connection
        }
        
        const cliente = new Client({
            user: "postgres",
            password: "admin",
            host: "localhost",
            port: 5500,
            database: "devlab" 
        });
        await cliente.connect();
        console.log("Conectado ao BD")

        global.connection = cliente;
        return cliente;
       
    }

    catch(error){
        console.error("Erro ao conectar ao Banco de dados");
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
    const sql = "INSERT INTO tbl_cursos (nome_curso, nome_professor, categoria, descricao) VALUES ($1, $2, $3, $4)" 
    values = [data.nome_curso, data.nome_professor, data.categoria, data.descricao];
    await client.query(sql, values);

 }

 async function deleteCourse(id){
    const client = await connect();
    const sql = "DELETE FROM tbl_cursos WHERE id=$1";
    await client.query(sql, [id]);
 }



module.exports = {
    selectUsers,
    selectUser,
    registerUser,
    deleteUser,
    getCourses,
    getCourse,
    registerCourse,
    deleteCourse
}