const express = require("express")

const SubtopicController = require("../controllers/Subtopic")
const api = express.Router()

api.post("/create-subtopic", SubtopicController.createSubtopic)
api.post("/delete-subtopic/:id", SubtopicController.deleteSubtopic)
api.put("/update-subtopic/:id", SubtopicController.updateSubtopic)
api.get("/get-subtopics", SubtopicController.getSubtopics)

module.exports = api