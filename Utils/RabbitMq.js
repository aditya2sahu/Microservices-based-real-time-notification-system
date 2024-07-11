const amqp = require('amqplib/callback_api');
require('dotenv').config()

const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

const rabbitMqSender = (id, message) => {
    try {
        const queue = id;
        amqp.connect(`amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`, (err0, connection) => {
            if (err0) throw new Error(err0)
            connection.createChannel((err1, channel) => {
                if (err1) throw new Error(err1)
                channel.assertQueue(queue, { durable: false });
                console.log('Message Send')
                channel.sendToQueue(queue, Buffer.from(message));
            });
        });
    } catch (err) {
        throw err
    }
}




module.exports = {
    rabbitMqSender,
}