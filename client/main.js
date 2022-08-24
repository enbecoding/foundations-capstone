//select all the elements
const mainContainer = document.querySelector(".main-container");
const toDoContainer = document.querySelector(".to-do-container");
const weeklyViewContainer = document.querySelector(".weekly-view-container");
const journalContainer = document.querySelector(".journal-container");

const form = document.querySelector("#new-item-form")
const list = document.querySelector("#list")
const input = document.querySelector("#item-input")

//set base url 
const baseURL = `http://localhost:4000/`

//when I submit, add a new element
form.addEventListener("submit", e => {
    e.preventDefault()

    const item = document.createElement("div")
    item.innerText = input.value
    item.classList.add("list-item")
    // console.log(item)
    list.appendChild(item)
    input.value = ''
    item.addEventListener("dblclick", () => {
        list.removeChild(item)
    })
})