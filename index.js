const loadData = async() => {
    fetch("https://jsonplaceholder.typicode.com/users", { method: "POST" })
        .then((res) => res.json())
        .then((res) => buildUi(res));
};

const buildUi = (users) => {
    const container = document.querySelector(".container");

    users.forEach((user) => {
        const row = document.createElement("li");
        const p = document.createElement("p");
        const button = document.createElement("button");
        p.textContent = `${user.name}(${user.email})`;
        button.textContent = "Showo Todos";
        button.addEventListener("click", () => getTodosOfUser(user.id));
        row.appendChild(p);
        row.appendChild(button);
        container.appendChild(row);
    });
};

const getTodosOfUser = async(userid) => {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((res) => {
            showTodosOfUser(res.filter(todo => todo.userId == userid));
        });
};

const showTodosOfUser = async(todos) => {
    // const todos = await getTodosOfUser(userid);
    console.log(todos)
    const container = document.querySelector(".todos");
    container.innerHTML = "";
    todos.forEach((todo) => {
        const listItem = document.createElement("li");
        listItem.textContent = todo.title;
        if (todo.completed) {
            listItem.style.color = "gray"
        }
        container.appendChild(listItem);
    });
};
loadData();