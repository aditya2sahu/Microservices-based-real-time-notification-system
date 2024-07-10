const { Router } = require('express')
const { addNotification, getNotifications, getNotificationById, markAsReadNotification } = require('../Controller/index')
const isAuthenticated = require('../Middleware/Common')

const notificationsRouter = Router()

notificationsRouter.post('/notifications', isAuthenticated, addNotification)
notificationsRouter.get('/notifications', isAuthenticated, getNotifications)
notificationsRouter.get('/notifications/:id', isAuthenticated, getNotificationById)
notificationsRouter.put('/notifications/:id', isAuthenticated, markAsReadNotification)

module.exports = notificationsRouter

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     tags:
 *      - Notification
 *     summary: Create a new notification for a user
 *     description: This should push a message to the queue.
 *     securityDefinitons:
 *     bearerAuth:
*         type:"apiKey"
*         name:"authorization"
*         in:"header"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - userId
 *             properties:
 *               message:
 *                 type: string
 *                 description: The notification message (required)
 *                 example: "Hello World"
 *               userId:
 *                 type: string
 *                 description: The user ID to whom the notification will be sent (required)
 *                 example: "b9f5b6b6-922a-47de-8e68-0c92b4ea7b93"
 *     responses:
 *       200:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification created successfully for ExampleName"
 */


/**
 * @swagger
 * /api/notifications:
 *   get:
 *     tags:
 *      - Notification
 *     summary: Get a list of all notifications for the authenticated user
 *     description: Retrieve all notifications for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: string
 *         required: false
 *         description: The name to include in the message
 *       - in: query
 *         name: take
 *         schema:
 *           type: string
 *         required: false
 *         description: The name to include in the message
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notifications retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "dd1e9be7-4f54-449b-b7ee-51862567040d"
 *                       message:
 *                         type: string
 *                         example: "First Message1"
 *                       read:
 *                         type: boolean
 *                         example: false
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "b9f5b6b6-922a-47de-8e68-0c92b4ea7b93"
 *                           username:
 *                             type: string
 *                             example: "ExampleName"
 *                           email:
 *                             type: string
 *                             example: "example@gmail.com"
 *                           password:
 *                             type: string
 *                             example: "$2a$10$fZepbYnA9n24SxeC49thnOhcijn0L1TQg9LY3jZ5iUapQvuGCN4Di"
 *                           connected:
 *                             type: boolean
 *                             example: false
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-07-10T03:09:45.160Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-07-10T05:02:29.170Z"
 *                           __v:
 *                             type: integer
 *                             example: 0
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-10T03:24:40.276Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-10T03:24:40.276Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 */


/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     tags:
 *      - Notification
 *     summary: Get details of a specific notification
 *     description: Retrieve details of a specific notification by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the notification
 *     responses:
 *       200:
 *         description: Notification details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification details retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "dd1e9be7-4f54-449b-b7ee-51862567040d"
 *                     message:
 *                       type: string
 *                       example: "First Message1"
 *                     read:
 *                       type: boolean
 *                       example: false
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "b9f5b6b6-922a-47de-8e68-0c92b4ea7b93"
 *                         username:
 *                           type: string
 *                           example: "ExampleName"
 *                         email:
 *                           type: string
 *                           example: "example@gmail.com"
 *                         password:
 *                           type: string
 *                           example: "$2a$10$fZepbYnA9n24SxeC49thnOhcijn0L1TQg9LY3jZ5iUapQvuGCN4Di"
 *                         connected:
 *                           type: boolean
 *                           example: false
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-07-10T03:09:45.160Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-07-10T05:02:29.170Z"
 *                         __v:
 *                           type: integer
 *                           example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-10T03:24:40.276Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-10T03:24:40.276Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 */


/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     tags:
 *      - Notification
 *     summary: Mark a notification as read
 *     description: Mark a specific notification as read by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - read
 *             properties:
 *               read:
 *                 type: boolean
 *                 description: to update notification read field  (required)
 *                 example: true
 *     responses:
 *       200:
 *         description: Notification marked as read successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification marked as read successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "dd1e9be7-4f54-449b-b7ee-51862567040d"
 *                     message:
 *                       type: string
 *                       example: "First Message1"
 *                     read:
 *                       type: boolean
 *                       example: true
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "b9f5b6b6-922a-47de-8e68-0c92b4ea7b93"
 *                         username:
 *                           type: string
 *                           example: "ExampleName"
 *                         email:
 *                           type: string
 *                           example: "example@gmail.com"
 *                         password:
 *                           type: string
 *                           example: "$2a$10$fZepbYnA9n24SxeC49thnOhcijn0L1TQg9LY3jZ5iUapQvuGCN4Di"
 *                         connected:
 *                           type: boolean
 *                           example: false
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-07-10T03:09:45.160Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-07-10T05:02:29.170Z"
 *                         __v:
 *                           type: integer
 *                           example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-10T03:24:40.276Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-10T03:24:40.276Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 */
