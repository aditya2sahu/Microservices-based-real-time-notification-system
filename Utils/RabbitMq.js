const amqp = require('amqplib/callback_api');

const RABBITMQ_HOST = 'localhost';
const RABBITMQ_PORT = 5672;

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

const rabbitMqConsumer = (socket) => {
    // try {
    //     const queue = `notificationNew`;
    //     amqp.connect(`amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`, (err0, connection) => {
    //         if (err0) throw new Error(err0)
    //         console.log("Connection Done")
    //         connection.createChannel((err1, channel) => {
    //             if (err1) throw new Error(err1)
    //             console.log("Channel Done")
    //             channel.assertQueue(queue, { durable: false });
    //             channel.consume(queue, async (message) => {
    //                 console.log("Message Done")
    //                 if (message) {
    //                     const msgContent = message.content.toString();
    //                     console.log(msgContent, "after decode");
    //                     connection.close();
    //                     if (socket) {
    //                         console.log({ msgContent }, "Socket Sended")
    //                         socket.emit('backend-notifications', msgContent || " No Any Notification")
    //                     }
    //                     // return msgContent;
    //                 } else {
    //                     console.log('No message received')
    //                     // return null;
    //                 }
    //             });
    //         });
    //     });
    // } catch (err) {
    //     console.log(err)
    //     throw err + "Consumer Error"
    // }
}



module.exports = {
    rabbitMqSender,
    rabbitMqConsumer
}