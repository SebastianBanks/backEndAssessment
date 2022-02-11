document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

  document.getElementById("fortuneButton").onclick = function () {
      axios.get("http://localhost:4000/api/fortune/")
        .then(function (response) {
            const data = response.data;
            alert(data)
        })
  }

const form = document.querySelector("form")
const todoContainer = document.querySelector('#todo-container')
const baseURL = "http://localhost:4000/api/todo"

const todoCallback = ({ data: todo }) => displayTodo(todo)
const errCallback = err => console.log(err.response.data)

const getAllTodo = () => axios.get(baseURL).then(todoCallback).catch(errCallback)
const createTodo = body => axios.post(baseURL, body).then(todoCallback).catch(errCallback)
const deleteTodo = id => axios.delete(`${baseURL}/${id}`).then(todoCallback).catch(errCallback)
const editTodo = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(todoCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let item = document.querySelector('#todoItem')

    let bodyObj = {
        item: item.value
    }

    createTodo(bodyObj)

    item.value = ''
}


function addToList(item) {
    const todoCard = document.createElement('div')
    todoCard.classList.add('todo-card')

    todoCard.innerHTML = `
    <p class="todo-item">${item.item}</p>
    <div class="btns-container">
        <button onclick="editTodo(${item.id}, 'done')">Done</button>
        <button onclick="editTodo(${item.id}, 'undone')">Undone</button>
        <button onclick="deleteTodo(${item.id})">delete</button>
    </div>
    
    `
    todoContainer.appendChild(todoCard);
};

function displayTodo(arr) {
    todoContainer.innerHTML = ""
    for (let i = 0; i < arr.length; i++) {
        addToList(arr[i])
    }
}
form.addEventListener("submit", submitHandler)
getAllTodo()