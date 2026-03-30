import express from "express";

const port = process.env.PORT ?? "8080"
const mock = [
    {id: 1, name: "John"},
    {id: 2, name: "Doe"}
]

const app = express()
app.use(express.json())

app.get("/users", (req, res) => {
    res.status(200).json(mock)
})

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const user = mock.find((u) => u.id === id)
    user ? res.status(200).json(user) : res.status(404).json({message: "User not found"})
})

app.post("/users", async (req, res) => {
    const user = req.body
    mock.push(user)
    res.status(201).json({id: user?.id})
})

console.log(`API running on port ${port}`)
app.listen(port)