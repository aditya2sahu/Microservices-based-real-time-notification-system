const { Users } = require('../Models/index') 
const {generateToken} = require("../Utils")

const register = async (req, res) => {
    try {

        const { 
            username ,
            password,
            email,
        } = req.body

        const createUser = new Users({
            username ,
            password,
            email,
        })
        await createUser.save()
        return res.status(200).json({ message: "User added successfully." })

    } catch (err) {
        if(err.code === 11000){
            return res.status(400).json({ message: "Email already exists."})
        }
        return res.status(500).json({ message: err.message })
    }
}

const login = async (req, res) => {
    try {
        
        const {
            email,
            password
        } = req.query

        const users = await Users.findOne({email})
          
        if(!users ){
            return res.status(400).json({message:"User does not exists.",data:null,token:""})
        }
        
        if(!await users.matchPassword(password)){
            return res.status(400).json({message:"Wrong Password.",data:null,token:""})
        }
        
        const token = await generateToken({id:users._id})
        
        return res.status(200).json({ message: "Users Retrived successfully." ,data:users,token:token})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports =  {
    register,
    login
}
