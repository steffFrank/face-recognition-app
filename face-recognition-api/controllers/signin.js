const handleSignin = (req, res, db, bcrypt) => {

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
}

module.exports = ({handleSignin});