const express = require("express");
const app = express();
const port = 3000;


app.get('/', (req, res) =>{
    return res.send("TESTANDO PORTA 3000");
})


app.listen(port, ()=>{
    console.log("ESCUTANDO");
});