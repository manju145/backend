const express = require("express");
const noteRouter = express.Router();
const { NoteModel } = require("../model/Note.model")


noteRouter.post("/create", async (req, res) => {
    try {
        const note = new NoteModel(req, res)
        await note.save()
        res.status(200).send({ "msg": "Note has been added" })
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }

})

noteRouter.get("/",async (req, res) => {
    try {
        const notes = await NoteModel.find()
             res.status(200).send(notes)
    } catch (err) {
        res.status(400).send({ "err": err.message }) 
    }
})

noteRouter.patch("/update/:noteID", async(req, res) => {
const {noteID} = req.params
try {
    await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
         res.status(200).send({"msg":`The note with id:${noteID} has been updated`})
} catch (err) {
    res.status(400).send({ "err": err.message })
}
})


noteRouter.delete("/delete/:noteID",async (req, res) => {
    const {noteID} = req.params
    try {
        await NoteModel.findByIdAndDelete({_id:noteID})
             res.status(200).send({"msg":`The note with id:${noteID} has been delete`})
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }
})

module.exports = {
    noteRouter
}