# Microservices-based-real-time-notification-system

## Description

The system will handle high-volume message processing and deliver real-time notifications to users. Integrate message queues and implement real-time data streaming.

## Getting Started

### Prerequisites

Make sure you have the following software installed:

- Git
- Node.js
- npm or yarn
- Docker
- MongoDB
- Docker
- Postman

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/aditya2sahu/Microservices-based-real-time-notification-system.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Microservices-based-real-time-notification-system
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

    or if you are using yarn:

    ```bash
    yarn install
    ```

### Configuration

1. Create a `.env` file in the root directory of the project and add the following configuration:

    ```plaintext
    MONGO_URI='mongodb://localhost:27017/dbName'
    PORT=your_port_number
    SECRET_KEY=your_jwt_secret_key
    RABBITMQ_HOST='localhost'
    RABBITMQ_PORT=5672
    ```

### Setting up RabbitMQ using Docker

1. Pull the RabbitMQ Docker image:

    ```bash
    docker pull rabbitmq:3-management
    ```

2. Run the RabbitMQ container:

    ```bash
    docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
    ```

    This command will start a RabbitMQ container with the management plugin enabled, exposing the default ports 5672 (for AMQP) and 15672 (for the management UI).

3. Verify that RabbitMQ is running by opening the management UI in your browser at [http://localhost:15672](http://localhost:15672). The default username and password are both `guest`.

### Running the Application

1. Start the application:

    ```bash
    npm start
    ```

    or if you are using yarn:

    ```bash
    yarn start
    ```

### API Documentation

Once the application is running, you can access the API documentation at [http://localhost:your_port_number/api-docs](http://localhost:your_port_number/api-docs).

### Testing Notifications with Postman

To test notifications, follow these steps using Postman:

1. **Install Postman:**

   Download and install Postman from [https://www.postman.com/downloads/](https://www.postman.com/downloads/).

2. **Configure Socket.IO in Postman:**

   - Open Postman and click on ToP left `New` the select `Socket.IO`.
   - Enter the URL of your Socket.IO server, for example, `localhost:your_port_number`.
   - Click on `Events` and add an event with the name `backend-notifications` and its description.

3. **Testing Notifications:**

   - Before connect, make sure to listening event `backend-notifications`.
   - Connect to th server from Postman that trigger notifications and observe them in Postman under the `backend-notifications` event.

### Usage

Use the API documentation to understand and interact with the endpoints for managing and delivering real-time notifications. Test notifications using Postman to verify functionality.

### Contributing

If you want to contribute to this project, please fork the repository and create a pull request with your changes.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

<!-- ### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. -->
