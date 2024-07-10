const authRouter = require('./Auth')
const notificationsRouter = require('./Notifications')

const routeManager = (app)=>{
    app.use('/api',authRouter)
    app.use('/api',notificationsRouter)
}

module.exports = routeManager