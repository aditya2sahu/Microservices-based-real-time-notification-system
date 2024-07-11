const { Router } = require('express');
const { register, login } = require("../Controller/index");

const authRouter = Router()

authRouter.post('/register', register)
authRouter.get('/login', login)

module.exports = authRouter


/**
 * @swagger
 * /api/register:
 *   post:
 *     tags:
 *      - User
 *     summary: Register a new user
 *     description: Register a new user with a username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "ExampleName"
 *               email:
 *                 type: string
 *                 example: "example@gmail.com"
 *                 description: "The user's email (required)"
 *               password:
 *                 type: string
 *                 example: "example123"
 *     responses:
 *       200:
 *         description: User added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User added successfully."
 */


/**
 * @swagger
 * /api/login:
 *   get:
 *     tags:
 *      - User
 *     summary: Login and receive a JWT.
 *     description:  Login with email and password and receive a JWT.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Use email to get token
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: Use password to get token
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Users retrieved successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "b9f5b6b6-922a-47de-8e68-0c92b4ea7b93"
 *                     username:
 *                       type: string
 *                       example: "ExampleName"
 *                     email:
 *                       type: string
 *                       example: "example@gmail.com"
 *                     password:
 *                       type: string
 *                       example: "$2a$10$iRWDkr6BN5YncQZ0.Ny1bOc463Y.kugiRpcKihWDsKUQooHfXWoPK"
 *                     connected:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-10T06:46:36.204Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-10T06:46:36.204Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI5ZjViNmI2LTkyMmEtNDdkZS04ZTY4LTBjOTJiNGVhN2I5MyIsImlhdCI6MTcyMDU5NDc2NCwiZXhwIjoxNzIzMTg2NzY0fQ.JNY9fkKPwAVCbziHyJQlS7uQNRe9gViA-MTeb6cHOmA"
 */