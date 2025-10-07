import express , {Request , Response}  from "express";

const app = express()

app.use(express.json())

app.get('/' , (req:Request , res:Response)=>{
    res.json({message:"Servidor rodando!"})
})

app.listen(3000  ,()=>{
    console.log("Servidor rodando!")
})