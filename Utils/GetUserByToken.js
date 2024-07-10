const jwt = require('jsonwebtoken')
const { Users } = require('../Models')

const getUserByToken = async (token) => {
    try {
        const JWT_SECRET = process.env.SECRET_KEY
        console.log(token)
        // if (!token.startsWith("bearer ")) {
        //     throw new Error('Request Token is in wrong formate.')
        // }
        const [bearer, getToken] = token.split(" ")
        if( String(bearer).toLowerCase() !== "bearer"){
            throw new Error('Request Token is in wrong formate.')
        }
        const payload = await jwt.verify(getToken, JWT_SECRET)
        if (payload) {
            const user = await Users.findOne({ _id: payload.id })
            if (!user) {
                return null
            }
            return user
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = getUserByToken