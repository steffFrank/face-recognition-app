const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

app.post("/signin", (req, res) => {
    const {email, password} = req.body;
   
    db("login")
    .select("*")
    .where({email:email})
    .returning("*")
    .then(user => {
        bcrypt.compare(password, user[0].hash, function(err, result){
            if (result) {
                db("users").select("*").where({email:email}).returning("*")
                .then(userProfile => {
                    console.log(userProfile);
                    res.json(userProfile[0])
                })
            } else {
                res.status(404).json("User not found");
            }
        })
    })
})



app.post("/register", (req, res) => {
    const {name, email, password } = req.body;
    bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(password, salt, function(err, hash){
            db.transaction(trx =>{
                trx.insert({
                    hash: hash,
                    email:email
                })
                .into("login")
                .returning("email")
                .then(loginEmail => {
                   return trx("users")
                    .returning("*")
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date()
                    })
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json("Unable to register!"));
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
        })
    })
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