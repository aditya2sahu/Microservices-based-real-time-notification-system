const express = require('express')
const MongoClient = require('./Config/DB')
const { rabbitMqConsumer, getUserByToken } = require('./Utils')
require('dotenv').config()
const routeManager = require('./Routes/RouteManager')
const bodyParser = require('body-parser')
const { createServer } = require('http')
const path = require('path')
const { Server } = require('socket.io');
const amqp = require('amqplib/callback_api');
const { Users } = require('./Models')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./sweggerConfig')

const RABBITMQ_HOST = 'localhost';
const RABBITMQ_PORT = 5672;


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

io.engine.use(async (req, res, next) => {
    try {
        const isHandshake = req._query.sid === undefined;
        if (!isHandshake) {
            return next();
        }
        const token = req.headers["authorization"];
        if (!token) {
            throw new Error("token is not provided");
        }
        const user = await getUserByToken(token)
        if (!user) {
            throw new Error("Not Authenticated.");
        }
        req.user = user
        next()
    } catch (err) {
        console.log(err.message)
        return next(new Error(err.message));
    }
});

io.on('connection', async (socket) => {
    try {
        const user = await Users.findOneAndUpdate({ _id: socket.request.user._id }, { connected: true }, { new: true })
        console.log("User Connected", { user })
        const queue = socket.request.user._id;
        amqp.connect(`amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`, (err0, connection) => {
            if (err0) {
                throw new Error(err0)
            }
            connection.createChannel((err1, channel) => {
                if (err1) throw new Error(err1)
                channel.assertQueue(queue, { durable: false });
                const consumeNotification = () => {
                    channel.consume(queue, (message) => {
                        if (message) {
                            const msgContent = message.content.toString();
                            if (socket) {
                                console.log({ msgContent }, "Notification Send")
                                socket.emit('backend-notifications', msgContent || " No Any Notification")
                            }
                        } else {
                            console.log('No Any Notifications')
                        }
                    });
                }
                consumeNotification()
            });
            socket.on('disconnect', () => {
                connection.close()
                console.log('Connection Closed');
            });
        });
    } catch (err) {
        console.log(err)
    } finally {
        socket.on('disconnect', async () => {
            const connectedFalse = await Users.findOneAndUpdate({ _id: socket.request.user._id }, { connected: false }, { new: true })
            console.log('user disconnected', { connectedFalse });
        });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

routeManager(app)

MongoClient();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// swagger(app)

httpServer.listen(process.env.PORT, () => {
    console.log(`🚀 Server runing at http://localhost:${process.env.PORT}`)
})


