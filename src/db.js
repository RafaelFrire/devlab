const { Client } = require("pg")


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

async function selectUsers(){
    const client = await connect(); 
    const res = await client.query("SELECT * FROM tbl_usuarios");
    return res.rows
}

module.exports = {
    selectUsers
}