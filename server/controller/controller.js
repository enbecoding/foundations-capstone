const TASKS = require("../config/daily_tasks.json");

module.exports = {
  getTasks: (request, response) => {
    response.status(200).send(TASKS.tasks);
  },
  createTask: (request, response) => {
    let { description } = request.body
    let newTask = {
        id: globalId,
        time,
        description
    }
    TASKS.tasks.push(newTask)
    response.status(200).send(TASKS.tasks)
    globalId++
  },
//   updateTask: (req, res) => {
//     let { id } = req.params;
//     let { type } = req.body;
//     let index = TASKS.tasks.findIndex(element => +element.id === +id)

//   },
//   deleteTask: (req, res) => {
//     let index = TASKS.tasks.findIndex(element => element.id === +req.params.id)
//     TASKS.splice(index, 1)
//     res.status(200).send(TASKS.tasks)
//   },
    // getAllEntries: (req, res) => {
    //     console.log("got the info");
    //     res.status(200).send(TASKS.journalEntries)
    // },
    // createEntry: (req,res) => {
    //     let { content } = req.body
    //     let newEntry = {
    //         id: globalId,
    //         content
    //     }
    //     TASKS.journalEntries.push(newEntry)
    //     res.status(200).send(TASKS.journalEntries)
    //     globalID++
    // },
    // updateEntry: (req, res) => {
    //     let {id} = req.params;
    //     let {type} = req.body;
    //     let index = TASKS.journalEntries.findIndex(element => +element.id === +id)

    //     if (TASKS.journalEntries[index])
    // }
    // deleteEntry: (req, res) => {
    //     let index = TASKS.journalEntries.findIndex(element => element.id === +req.params.id)
    //     TASKS.journalEntries.splice(index, 1)
    //     res.status(200).send(TASKS.journalEntries)
    // }
}

