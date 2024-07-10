const jwt = require('jsonwebtoken')

const generateToken = async (data) =>{

    try{
        // eslint-disable-next-line no-undef
        const JWT_SECRET = process.env.SECRET_KEY
        const token = await jwt.sign(data, JWT_SECRET, { expiresIn: '30d' });
        return token
    
    }catch(err){
        console.log(err.message)
        throw new Error(err.message)
    }
}

module.exports = generateToken