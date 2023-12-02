require('dotenv').config();
const db = require("./db")

const port = 3000;
const cors = require('cors');

const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors('*'));




app.get('/', (req, res) =>{
    return res.json({
        mensage: "fala que eu te escuto."
        
    });
})


// end point para usuário específico
app.get('/users/:id', async (req, res)=>{
    const user = await db.selectUser(req.params.id);
    return res.json(user);
})

// end point que busca todos os usuários
app.get('/users', async (req, res)=>{
    const users = await db.selectUsers();
    return res.json(users);
})
// register user
app.post('/users', async (req, res)=>{
    try{
        await db.registerUser(req.body);
        
        res.sendStatus(201);
    }catch (error){
        console.error("erro usuário já registrado: ", error);
        res.status(500).send("Internal Server Error")
    }
   
})

app.delete('/users/:id', async(req, res)=>{
    await db.deleteUser(req.params.id);
    res.status(204);

})


// ROTA CURSOS

app.patch('/courses/:id', async (req, res)=>{
   const id = req.params.id;
   await db.updateCourse(id, req.body);
   console.log(req.body);
})

app.get('/courses/:id', async (req, res)=>{
    const course = await db.getCourse(req.params.id)
    return res.json(course);
})



app.get('/courses', async (req, res)=>{
    const courses = await db.getCourses();
    return res.json(courses);
})


app.post('/courses', async (req, res)=>{
    
    try{
        db.registerCourse(req.body);
        res.sendStatus(201);
    }
    catch{
        console.error("error curso já cadastrado registrado: ", error);
        res.status(500).send("Internal Server Error")
    }
})


app.delete('/courses/:id', async (req, res)=>{
    db.deleteCourse(req.params.id);
    return res.status(204);
})


// rota de autenticação

app.post('/auth/login', async (req, res)=>{
    const {email, senha} = req.body;
    console.log('Dados recebidos:',  email, senha);


    if(!email){
        return res.status(422).json({msg:"email obrigatório!"})
    }
    if(!senha){
        return res.status(422).json({msg:"Senha obrigatório!"})
    }

    try {
        const authResult = await db.authUser(email, senha);
        if (authResult) {
            return res.json(authResult);
        } else {
            return res.status(401).json({ msg: "Credenciais inválidas!" });
        }
    } catch (error) {
        console.error("Erro durante a autenticação:", error);
        return res.status(500).json({ msg: "Erro interno do servidor" });
    }

});

app.listen(port);

