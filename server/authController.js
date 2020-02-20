const bcrypt = require('bcryptjs');

module.exports = {
    login: async (req,res) => {
        const {email,password} = req.body
        const {session} = req
        // This line is just connecting the database to the function
        const db = req.app.get('db')

        let user = await db.check_user([email])
        // Pass it in as an array generally, DB always comes back as an array
        user = user[0]
        if(!user){
            // return an error
            return res.status(400).send('Email not found')
        }

        const authenticated = bcrypt.compareSync(password, user.user_password)
        // compareSynch compares a string to a hash

        if(authenticated){
            delete user.user_password;
            session.user = user 
            res.status(202).send(session.user) 
        }else {
            res.status(401).send('Incorrect Password')
            // Password Incorrect/Do not match
        }

        
    },
    register: async (req,res) => {
        const {email,password} = req.body;
        const {session} = req
        const db = req.app.get('db')

        let user = await db.check_user([email]);
        user = user[0]
        if(user){
            return res.status(400).send('User already exists')
        }

        const salt = bcrypt.genSaltSync(20)
        // hash is first what you want to hash
        const hash = bcrypt.hashSync(password,salt)
        // This encyrpts the password

        let newUser = await db.register_user({email,hash})

        newUser = newUser[0]
        session.user = newUser
        res.status(201).send(session.user)

        
    },
    logout: () => {
        
    },
    getUser: () => {
        
    }
};