const  { register,login } = require('./Users');
const { addNotification , getNotifications, getNotificationById,markAsReadNotification } = require('./Notifications');
module.exports = {
    register,
    login,
    addNotification,
    getNotifications,
    getNotificationById,
    markAsReadNotification
};