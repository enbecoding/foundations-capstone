//select all the elements for ToDo list
const formToDo = document.querySelector("#new-item-form")
const list = document.querySelector("#list")
const input = document.querySelector("#item-input")

//select elements for weekly container content 
const weeklyForm = document.forms["list-submission"];
let menu = weeklyForm.days;
let options = weeklyForm.days.options;

const mondayItems = document.querySelector(".accordion-body-mon")
const tuesdayItems = document.querySelector(".accordion-body-tue")
const wednesdayItems = document.querySelector(".accordion-body-wed")
const thursdayItems = document.querySelector(".accordion-body-thu")
const fridayItems = document.querySelector(".accordion-body-fri")
const saturdayItems = document.querySelector(".accordion-body-sat")
const sundayItems = document.querySelector(".accordion-body-sun")
// menu.required = true;


const URL = `http://localhost:4000`

const toDoCallback = ({ data: toDos }) => displayToDoList(toDos)
const errCallback = err => console.log(err)

const getToDoList = () => axios.get(URL).then(toDoCallback).catch(errCallback)
const createToDo = body => axios.post(URL, body).then(toDoCallback).catch(errCallback)
const deleteToDoList = id => axios.delete(`${URL}/${id}`).then(toDoCallback).catch(errCallback)
const updateToDoList = (id, type) => axios.put(`${URL}/${id}`, {type}).then(toDoCallback).catch(errCallback)

//creating the todoList function
const addToDoItem = e => {
    e.preventDefault()
    const value = input.value
    const item = document.createElement("li")
    item.textContent = value
    item.addEventListener("click", () => {
        if (item.style.textDecoration === "line-through") {
            item.style.textDecoration = "none"
        } else {
            item.style.textDecoration = "line-through"
        }
    })
    item.addEventListener("dblclick", () => {
        item.remove()
    })
    list.append(item)
    input.value = ""
}


formToDo.addEventListener("submit", addToDoItem)

//function to move list to weekday div

weeklyForm.onsubmit = function(e) {
    e.preventDefault()

    let optionValue = this.days.value
    console.log(optionValue);
    if(optionValue === "Monday") {
        mondayItems.append(list)
    }
}




