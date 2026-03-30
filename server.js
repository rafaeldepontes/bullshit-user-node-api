import express from "express";

const mock = [
    {id: 1, name: "John"},
    {id: 2, name: "Doe"}
]

const app = express()
const port = process.env.PORT ?? "8080"

app.get("/users", (req, res) => {
    res.type('json');
    res.send(mock)
})

console.log(`API running on port ${port}`)
app.listen(port)