import express from "express";

const port = process.env.PORT ?? "8080"
let mock = [
    {id: 1, name: "John"},
    {id: 2, name: "Doe"}
]

const app = express()
app.use(express.json())

app.get("/users", (req, res) => {
    mock.sort((a, b) => a.id - b.id)
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

app.put("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const body = req.body

    if (!body || !body.name || !body.id || body.name == null || body.id == null) {
        res.status(400).json({message: "Name is required"})
        return
    }
    let user = mock.find((u) => u.id === id)
    if (!user) {
        res.status(404).json({message: "User not found"})
        return
    }

    const idx = mock.indexOf(user);
    if (idx > -1) {
        mock.splice(idx, 1);
    }

    user = body
    mock.push(user)

    res.status(200).json(user)
})

app.patch("/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const body = req.body

    if (!body || !body.name || body.name == null) {
        res.status(400).json({message: "Name is required"})
        return
    }
    const user = mock.find((u) => u.id === id)
    if (!user) {
        res.status(404).json({message: "User not found"})
        return
    }

    const idx = mock.indexOf(user);
    if (idx > -1) {
        mock.splice(idx, 1);
    }

    user.name = body.name
    mock.push(user)

    res.status(200).json(user)
})

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const user = mock.find((u) => u.id === id)
    if (!user) {
        res.status(404).json({message: "User not found"})
        return
    }

    const idx = mock.indexOf(user);
    if (idx > -1) {
        mock.splice(idx, 1);
    }
    res.status(204)
})

console.log(`API running on port ${port}`)
app.listen(port)