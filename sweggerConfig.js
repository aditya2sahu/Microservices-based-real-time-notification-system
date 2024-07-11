const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Microservices-based real-time notification system',
      version: '1.0.0',
      description: 'The system will handle high-volume message processing and deliver real-time notifications to users.Integrate message queues and implement real-time data streaming.',
    },
    components:{
      securitySchemes:{
        bearerAuth:{
          type:'http',
          scheme:"bearer",
          bearerFormate:'JWT'
        }
      }
    },
    tags:[
      {
        name:'User',
        description:"User Registration and login" 
      },
      {
        name:'Notification',
        description:" To add notfication, retrive particular notification deatils ,list of notification and mark notification read True" 
      }
    ]
  },
  apis: ['./Routes/*.js'], // Path to the API docs
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec