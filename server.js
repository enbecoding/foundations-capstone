const express = require("express")
const cors = require("cors")
const app = express()

const Datastore = require('nedb');

const database = new Datastore('database.db');
database.loadDatabase();

app.use(cors())
app.use(express.json())
app.use(express.static("client"))

const { getHomePage, createToDo, } = require(`./server/controller/controller.js`)

app.post(`/api/toDos`, createToDo);


const PORT = 4000
app.listen(PORT, console.log(`Boss, server is running on ${PORT}`))