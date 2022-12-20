const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());


const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : process.env.DATABASE_USERNAME,
      password : process.env.DATABASE_PASSWORD,
      database : process.env.DATABASE_NAME
    }
  });


// const database = {
//     users: [
//         {
//             id:"124", 
//             name: "Steff", 
//             email:"steff@gmail.com",
//             password: "1234",
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id:"123", 
//             name: "Frank", 
//             email:"Frank@gmail.com",
//             password: "1234",
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }
// let id = 124;
// app.get("/", (req, res) => {
//     res.send(database.users);
// })

// app.post("/signin", (req, res) => {
//     if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
//         const user = {
//                 id:database.users[0].id, 
//                 name: database.users[0].name, 
//                 email:database.users[0].email,
//                 entries: database.users[0].entries,
//                 joined: database.users[0].joined
//             }
//         res.status(200).json(user);
//     } else {
//         res.status(400).json("error loggin in!");
//     }
// })



app.post("/register", (req, res) => {
    const {name, email, password } = req.body;
    db("users")
        .returning("*")
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => res.json(user[0]))
        .catch(err => res.status(400).json("Unable to register!"));
        
    // if (name !=="" && email !== "" && password !== "") {
        
    //     const user = {id: id.toString(),
    //         name,
    //         email,
    //         entries:0,
    //         joined: new Date()}
    //     database.users.push(user);
    //     res.json(user);
    // } else {
    //     res.status(401).json("something went wrong registrering");
    // }
})

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    db("users").select("*").from("users").where({id:id})
    .then(user => {
        if (user.length) {
            res.json(user[0]) 
        } else {
            res.status(400).json("User not found")
        }
    })
})


// app.put("/image", (req, res) => {
//     const { id } = req.body;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//             found = true;
//             user.entries++;
//             return res.json(user.entries);
//         }
//     })
//     if (!found) {
//         return res.status(400).json("user not found");
//     }
// })
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("listening to port", PORT);
})