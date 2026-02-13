import express from "express"
import cors from "cors"
import mysql from "mysql2"

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    const selectCommand = "SELECT * FROM atomCommerce"

    database.query(selectCommand, (error, atom) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(atom)
    })
})

app.post("/cadastrar", (request, response) => {
    const { name, z, mass, symbol } = request.body.atom

    const insertCommand = ` 
    INSERT INTO atomCommerce(name, z, mass, symbol)
    VALUES (?, ?, ?, ?)
    `
    database.query(insertCommand, [name, z, mass, symbol])

    response.status(201).json({ message: "Usuário cadastrado com sucesso"})
})

app.listen (port, () => {
    console.log(`Servidor rodando na porta ${port}!`)
})

const database = mysql.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password:"senhaAlunos",
    database: "web_03ta",
    connectionLimit: 10
})