//select all the elements for ToDo list
const formToDo = document.querySelector("#new-item-form");
let list = document.querySelector("#list");
const input = document.querySelector("#item-input");
const toDoContainer = document.querySelector(".to-do-container");
const addbtn = document.querySelector(".submit-task");

//select elements for weekly container content
const weeklyForm = document.forms["list-submission"];
let menu = weeklyForm.days;
let options = weeklyForm.days.options;

//weekly view list
const mondayItems = document.querySelector(".accordion-body-mon");
const tuesdayItems = document.querySelector(".accordion-body-tue");
const wednesdayItems = document.querySelector(".accordion-body-wed");
const thursdayItems = document.querySelector(".accordion-body-thu");
const fridayItems = document.querySelector(".accordion-body-fri");
const saturdayItems = document.querySelector(".accordion-body-sat");
const sundayItems = document.querySelector(".accordion-body-sun");

const URL = `http://localhost:4000`;

const toDoCallback = ({ data: tasks }) => {
  displayTasks(tasks);
};
const errCallback = (err) => console.log(err);

const createToDo = (body) =>
  axios.post(`${URL}/api/task`, body).then(toDoCallback).catch(errCallback);
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

//MAIN FUNCTION TO DISPLAY TASK LIST FROM DATABASE
const displayTasks = (tasks) => {
  const item = document.createElement("li");
  tasks.map((task) => {
    item.innerHTML = `<li onClick="${checkOffTask(item)}">${task}</li>
        <button ondblClick="${removeTask(item)}" class=">x</button>`;
  });
  list.append(item);
};

//AXIOS CALL TO GET DATA FROM DATABASE
const getToDoList = () => {
  axios.get(`${URL}/api/task`).then(toDoCallback).catch(errCallback);
};

//AXIOS POST CODE
const taskSubmitHandler = (e) => {
  e.preventDefault(e);

  let taskItem = {
    task: input.value,
  };
  console.log(taskItem);
  createToDo(taskItem);

  input.value = "";
};

formToDo.addEventListener("submit", taskSubmitHandler);
//function to move list to weekday div

weeklyForm.onsubmit = function (e) {
  e.preventDefault();

  let optionValue = this.days.value;
  console.log(optionValue);
  if (optionValue === "Monday") {
    mondayItems.append(list);
  } else if (optionValue === "Tuesday") {
    tuesdayItems.append(list);
  } else if (optionValue === "Wednesday") {
    wednesdayItems.append(list);
  } else if (optionValue === "Thursday") {
    thursdayItems.append(list);
  } else if (optionValue === "Friday") {
    fridayItems.append(list);
  } else if (optionValue === "Saturday") {
    saturdayItems.append(list);
  } else if (optionValue === "Sunday") {
    sundayItems.append(list);
  }
  list = document.createElement("ul");
  formToDo.append(list);
};

getToDoList();

//CODE FOR JOURNAL POSTS
const entriesContainer = document.querySelector("#entries-container");
const journalForm = document.querySelector("journal-posts");
const postBtn = document.querySelector(".entry-post")

const entriesCallback = ({ data: entries }) => displayEntries(entries);

const getAllEntries = () => axios.get(`${URL}/api/entries`).then(entriesCallback).catch(errCallback)
const createEntry = (body) =>
  axios.post(`${URL}/api/entries`, body).then(entriesCallback).catch(errCallback);
const deleteEntry = (id) =>
  axios.delete(`${URL}/api/entry/${id}`).then(entriesCallback).catch(errCallback);

function entrySubmitHandler(e) {
  e.preventDefault();

  let content = document.querySelector(".textarea");
  let contentObj = {
    content: content.value,
  };
  createEntry(contentObj);

  content.value = "";
}

function createEntryCard(entry) {
  const entryCard = document.createElement("div");
  entryCard.classList.add("entry-card");

  entryCard.innerHTML = `<div class="content">${entry.content}</div>
    <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete Post</button>`;

  entriesContainer.appendChild(entryCard);
}

function displayEntries(arr) {
  entriesContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    createEntryCard(arr[i]);
  }
}

postBtn.addEventListener("click", entrySubmitHandler)

getAllEntries()
