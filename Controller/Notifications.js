const { Notifications, Users } = require('../Models/index');
const { rabbitMqSender } = require('../Utils');

const addNotification = async (req, res) => {
    try {
        const {
            message,
            userId,
        } = req.body;

        if (!message || !userId) {
            return res.status(400).json({ message: "Invalid data." });
        };

        const user = await Users.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User Not found." });
        };
        const createNotification = new Notifications({
            messgae: message,
            user: user,
        });
        // console.log(createNotification)
        await rabbitMqSender(userId,message);
        await createNotification.save();
        return res.status(200).json({ message: `Notification created successfully for ${user._id}` });
    } catch (err) {
        console.log(err, "notification controller");
        return res.status(500).json({ message: `${err}` });
    };
};

const getNotifications = async (req, res) => {
    try {
        const {
            skip,
            take
        } =  req.query

        const notifications = await Notifications.find({ user: req.query.userId }).populate('user').skip(skip || 0).limit(take || 10)
        return res.status(200).json({ message: `Notifications retrieved successfully`, data: notifications })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: `${err.message}` });
    }
};

const getNotificationById = async (req, res) => {
    try {   

        const { id } = req.params
        const { userId } = req.query
        const notification = await Notifications.findOne({_id:id,user:userId}).populate('user')
        
        if(!notification){
            return res.status(404).json({ message: `Notification not found`,data:null})
        }

        return res.status(200).json({ message: `Notification retrived successfully.`,data:notification})
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: `${err.message}` })
    }
}

const markAsReadNotification = async (req, res) => {
    try {   

        const { id } = req.params
        const { 
            read
        } = req.body
        const { userId } = req.query
        if(!read){
            return res.status(400).json({ message: ` read field is required`,data:null})
        }
        const notification = await Notifications.findOneAndUpdate({_id:id,user:userId},{read:read},{ new : true}).populate('user')
        if(!notification){
            return res.status(404).json({ message: `Notification not found`,data:null})
        }
        return res.status(200).json({ message: `Notification retrived successfully.`,data:notification})
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: `${err.message}` })
    }
}

module.exports = {
    addNotification,
    getNotifications,
    getNotificationById,
    markAsReadNotification
}