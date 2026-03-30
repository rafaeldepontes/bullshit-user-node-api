import express from "express";

const port = process.env.PORT ?? "8080"
const mock = [
    {id: 1, name: "John"},
    {id: 2, name: "Doe"}
]

const app = express()
app.use(express.json())

app.get("/users", (req, res) => {
    res.type('json');
    res.send(mock)
})

app.post("/users", async (req, res) => {
    const user = req.body
    mock.push(user)
    res.send(`id: ${user?.id}`)
})

console.log(`API running on port ${port}`)
app.listen(port)