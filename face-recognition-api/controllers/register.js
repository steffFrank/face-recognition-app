const handleRegister = (req, res, db, bcrypt, saltRounds) => {
    const {name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json("bad inputs");
    }
    bcrypt.genSalt(saltRounds, function(err, salt) {
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
}

module.exports = ({handleRegister});