const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("client"));

const { getTasks, createToDo, getAllEntries, createEntry, updateEntry, deleteEntry } = require(`./server/controller/controller.js`);

app.get(`/api/tasks`, getTasks);

// app.post(`/api/toDos`, createTask);

//app.put(/api/tasks/:id, updateTask);

//app.delete(`/api/tasks/:id, deleteTask);

app.get(`/api/entries`, getAllEntries);

app.post(`api/entries`, createEntry);

// app.put(`/api/entries/:id`, updateEntry);

app.delete(`/api/entry/:id`, deleteEntry)


const PORT = 4000;
app.listen(PORT, console.log(`Boss, server is running on ${PORT}`));
