//declare global elements

let addTaskBtn = document.querySelector("#add-task-btn");
let itemsBox = document.querySelector(".container .items-box");
let taskField = document.querySelector(".add-task-box input");
let tasks = JSON.parse(localStorage.getItem("tasks"));

loadTasks();

taskField.onkeypress = (event) => {
  if (event.key.toLowerCase() === "enter") {
    addTaskBtn.click();
  }
};

addTaskBtn.onclick = () => {
  if (taskField.value.trim() != "") {
    if (tasks === null) tasks = [];
    let task = { id: Date.now(), taskName: taskField.value.trim() };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    appendTask(task);
    taskField.value = "";
    taskField.focus();
  }
};

function loadTasks() {
  if (tasks === null) return;
  tasks.forEach((task) => {
    appendTask(task);
  });
}
function appendTask(task) {
  let element = document.createElement("div");
  element.classList.add("task-item");
  let text = document.createTextNode(task.taskName);
  element.append(text);
  itemsBox.appendChild(element);

  // move scroll to element y
  scrollTo(0, element.offsetTop);

  // add delete btn
  let delElement = document.createElement("span");
  delElement.classList.add("delete-btn");
  delElement.append(document.createTextNode("delete"));
  element.appendChild(delElement);

  // add delete event
  delElement.onclick = (event) => {
    tasks = tasks.filter((tas) => tas.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    element.remove();
  };
}

taskField.onfocus = () => {
  taskField.setAttribute(
    "placeholder-data",
    taskField.getAttribute("placeholder")
  );
  taskField.setAttribute("placeholder", "");
};

taskField.onblur = () => {
  taskField.setAttribute(
    "placeholder",
    taskField.getAttribute("placeholder-data")
  );
  taskField.removeAttribute("placeholder-data");
};
