require('dotenv').config();

const db = require("./db")

const port = 3000;
const express = require("express");



const app = express();

app.get('/', (req, res) =>{
    return res.json({
        mensage: "fala que eu te escuto."
        
    });
})

app.get('/users', async (req, res)=>{
    const users = await db.selectUsers();
    return res.json(users);
})

app.listen(port, ()=>{
    console.log("ESCUTANDO");
});

