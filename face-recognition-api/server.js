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


// let id = 124;
// app.get("/", (req, res) => {
//     res.send(database.users);
// })

app.post("/signin", (req, res) => {
    const {email, password} = req.body;
   
    db("login")
    .select("*")
    .where({email:email})
    .then(user => {
        bcrypt.compare(password, user[0].hash, function(err, result){
            if (result) {
                db("users").select("*").where({email:email})
                .then(userProfile => {
                    res.json(userProfile[0])
                })
            } else {
                res.status(404).json("Wrong credentials");
            }
        })
    })
    .catch(err => res.status(300).json("Wrong credentials"));
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


app.put("/image", (req, res) => {
    const { id } = req.body;
    db("users").where({id:id})
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(error => res.status(400).json("Something went wrong!"))
})



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("listening to port", PORT);
})