//select all the elements for ToDo list
const formToDo = document.querySelector("#new-item-form");
const list = document.querySelector("#list");
const input = document.querySelector("#item-input");
const toDoContainer = document.querySelector(".to-do-container");
const addbtn = document.querySelector(".submit-task");

//select elements for weekly container content
const weeklyForm = document.forms["list-submission"];
let menu = weeklyForm.days;
let options = weeklyForm.days.options;

const mondayItems = document.querySelector(".accordion-body-mon");
const tuesdayItems = document.querySelector(".accordion-body-tue");
const wednesdayItems = document.querySelector(".accordion-body-wed");
const thursdayItems = document.querySelector(".accordion-body-thu");
const fridayItems = document.querySelector(".accordion-body-fri");
const saturdayItems = document.querySelector(".accordion-body-sat");
const sundayItems = document.querySelector(".accordion-body-sun");
// menu.required = true;

const URL = `http://localhost:4000`;

const toDoCallback = ({ data: tasks }) => getToDoList(tasks);
const errCallback = (err) => console.log(err);

const createToDo = (body) =>
  axios.post(URL, body).then(toDoCallback).catch(errCallback);
const deleteToDoList = (id) =>
  axios.delete(`${URL}/task/${id}`).then(toDoCallback).catch(errCallback);
const updateToDoList = (id, type) =>
  axios
    .put(`${URL}/task/${id}`, { type })
    .then(toDoCallback)
    .catch(errCallback);

const checkOffTask = (element) => {
  element.addEventListener("click", () => {
    if (element.style.textDecoration === "line-through") {
      element.style.textDecoration = "none";
    } else {
      element.style.textDecoration = "line-through";
    }
  });
};

const removeTask = (element) => {
  element.addEventListener("dblclick", () => {
    element.remove();
  });
};
//creating the todoList function
const addToDoItem = (task) => {
  const value = input.value;
  const item = document.createElement("li");
  item.textContent = value;
  list.append(item);
  input.value = "";
  checkOffTask(item);
  removeTask(item);
};

const getToDoList = () => {
  axios.get(`${URL}/api/tasks`).then(toDoCallback).catch(errCallback);
//   addToDoItem();
};

const onAddTaskButtonClick = () => {
  addbtn.addEventListener("click", () => {
    e.preventDefault();
    addToDoItem();
  });
};

formToDo.addEventListener("submit", onAddTaskButtonClick);

//function to move list to weekday div

weeklyForm.onsubmit = function (e) {
  e.preventDefault();

  let optionValue = this.days.value;
  console.log(optionValue);
  if (optionValue === "Monday") {
    mondayItems.append(list);
  }
};

getToDoList();

//CODE FOR JOURNAL POSTS
const entriesContainer = document.querySelector("#entries-container")
const journalForm = document.querySelector("journal-posts")

const entriesCallback = ({ data: entries }) => displayEntries(entries)

const getAllEntries = () => axios.get(`${URL}/entries`).then(entriesCallback).catch(errCallback)
const createEntry = body => axios.post(`${URL}/entries`, body).then(entriesCallback).catch(errCallback)
const deleteEntry = id => axios.delete(`${URL}/${id}`).then(entriesCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let content = document.querySelector(".textarea")
    let contentObj = {
        content: content.value
    }
    createEntry(contentObj)

    content.value=''
}

function createEntryCard(entry) {
    const entryCard = document.createElement('div')
    entryCard.classList.add('entry-card')

    entryCard.innerHTML = `<p class="content">${entry.content}</p>
    <button onclick="deleteEntry(${entry.id})">Delete Post</button>`

    entriesContainer.appendChild(entryCard)
}

function displayEntries(arr) {
    entriesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createEntryCard(arr[i])
    }
}

journalForm.addEventListener("submit", submitHandler)

getAllEntries()
