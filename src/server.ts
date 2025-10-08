import express , {Request , Response}  from "express";
import useroutes from"../src/routes/userRoutes"
import authroutes from "../src/routes/authRoutes"
const app = express()

app.use(express.json())

app.get('/' , (req:Request , res:Response)=>{
    res.json({message:"Servidor rodando!"})
})
app.use("/api",useroutes)
app.use("/api" ,authroutes)

app.listen(3000  ,()=>{
    console.log("Servidor rodando!")
})