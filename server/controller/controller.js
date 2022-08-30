const TASKS = require("../config/daily_tasks.json");
const ENTRYDB = require("../config/entries.json");
let globalId = 4;

module.exports = {
  getTasks: (request, response) => {
    response.status(200).send(TASKS.tasks);
  },
  createTask: (request, response) => {
    // console.log(request)
    let { task } = request.body
    TASKS.tasks.push(task)
    console.log(TASKS)
    baseId++
    response.status(200).send(TASKS.tasks)
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
    getAllEntries: (req, res) => {
        res.status(200).send(ENTRYDB)
    },
    createEntry: (req,res) => {
        let { content } = req.body
        console.log(content)
        let newEntry = {
            id: globalId,
            content
        }
        ENTRYDB.push(newEntry)
        res.status(200).send(ENTRYDB)
        globalID++
    },
    // updateEntry: (req, res) => {
    //     let {id} = req.params;
    //     let {content} = req.body;
    //     let index = ENTRYDB.findIndex(element => +element.id === +id)

    //     if (ENTRYDB[index])
    // },
    deleteEntry: (req, res) => {
        let index = ENTRYDB.findIndex(element => element.id === +req.params.id)
        ENTRYDB.splice(index, 1)
        res.status(200).send(ENTRYDB)
    }
}

