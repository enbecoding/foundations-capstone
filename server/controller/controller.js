

module.exports = {
    createToDo: (request, response) => {
        console.log("request received.");
        const data = request.body;

        database.insert(data);
        console.log(database)
        response.json({
            status: 'success',
            textInput: ""
        })
    }
}