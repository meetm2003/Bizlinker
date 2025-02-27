const Message = require("../models/message.model");
const { messageValidator } = require("../validators/message.validator");

const sendMessage = async (req, res) => {
    const { err } = messageValidator.validate(req.body);
    if (err) { return res.status(400).json({ message: err.details[0].message }); }

    const { senderId, receiverId, message } = req.body;

    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    });

    try {
        await newMessage.save();
        res.status(201).json({ message: "Message sent successfully", data: newMessage });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error during sending message" });
    }
};

const getMessages = async (req, res) => {
    const { user1, user2 } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { senderId: user1, receiverId: user2 },
                { senderId: user2, receiverId: user1 },
            ],
        }).sort({ createdAt: 1 });

        if (!messages) {
            return res.status(404).json({ message: "Messages not found" });
        }

        res.status(200).json({ message: "Messages are getting successfully", message: messages });
    } catch (err) {
        console.error(err);
        res.status(200).json({ message: "Server error while getting messages"});
    }
};

const markAsSeen = async (req, res) => {
    const { messageId } = req.params;
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { seen: true },
            { new: true },
        );
        if (!updatedMessage) {
            return res.status(404).json({ messgae: "Message not found" });
        }
        res.status(200).json({ message: "Message marked as seen", date: updatedMessage });
    } catch (err) {
        res.status(200).json({ message: "Server error while marking seen message", date: updatedMessage });
    }
};

module.exports = { sendMessage, getMessages, markAsSeen };