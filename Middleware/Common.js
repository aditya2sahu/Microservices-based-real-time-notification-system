const { getUserByToken } = require('../Utils')


const isAuthenticated = async (req, res, next) => {

    try {
        if(!req.headers.authorization){
            return res.json({ message: "Token is not given." }).status(400)
        }
        const user = await getUserByToken(req.headers.authorization)
        if (!user) {
            return res.json({ message: "Not Authenticated." }).status(403)
        }
        req.query =  {...req.query,userId: user.id}
        next()
    } catch (err) {
        return res.json({ message: err.message }).status(500)
    }

}

module.exports =  isAuthenticated