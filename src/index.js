require('dotenv').config();
const db = require("./db")

const port = 3000;

const express = require("express");
const app = express();

app.use(express.json());
// recebendo requisições do tipo JSON





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



app.listen(port);

