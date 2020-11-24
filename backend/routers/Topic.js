const express = require("express")

const TopicController = require("../controllers/Topic")
const api = express.Router()

api.post("/create-topic", TopicController.createTopic)
api.post("/delete-topic/:id", TopicController.deleteTopic)
api.put("/update-topic/:id", TopicController.updateTopic)
api.get("/get-topics", TopicController.getTopics)

module.exports = api