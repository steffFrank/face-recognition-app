const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id:"124", 
            name: "Steff", 
            email:"steff@gmail.com",
            password: "1234",
            entries: 0,
            joined: new Date()
        },
        {
            id:"123", 
            name: "Frank", 
            email:"Frank@gmail.com",
            password: "1234",
            entries: 0,
            joined: new Date()
        }
    ]
}
let id = 124;
app.get("/", (req, res) => {
    res.send(database.users);
})

app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.status(200).json("success signing in");
    } else {
        res.status(400).json("error loggin in!");
    }
})


app.post("/register", (req, res) => {
    const {name, email, password } = req.body;
    if (name !=="" && email !== "" && password !== "") {
        id++;
        database.users.push({id: id.toString(),
                        name,
                        email,
                        entries:0,
                        joined: new Date()})
        res.json("Registered with success");
    } else {
        res.status(401).json("something went wrong registrering");
    }
})

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json("user not found");
    }
})


app.put("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        return res.status(400).json("user not found");
    }
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("listening to port", PORT);
})