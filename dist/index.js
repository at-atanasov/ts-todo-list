"use strict";
const btn = document.getElementById("btn");
//const btn = document.getElementById("btn")!; the "!" tells typescript that this variable cannot be null and it will exist for sure
const input = document.getElementById("todoinput"); // with as HTMLInputElemen we say to ts to treat it like HTMLInputElement because it doesn't know what type of element is that
// we can achive the same if when we try do get the value we write this: (<HTMLInputElement>input).value
const form = document.querySelector("form");
const list = document.getElementById("todolist");
const todos = readTodos();
todos.forEach(createTodo);
console.log("Hello I am hungry ");
// btn.addEventListener("click", function () {
//   //btn?.addEventListener("click", function () { The ? mean - if there is btn
//   alert(input.value);
//   input.value = "";
// });
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
}
function createTodo(todo) {
    const newLi = document.createElement("lI");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        saveTodos();
    });
    newLi.append(todo.text);
    newLi.append(checkbox);
    list.append(newLi);
}
form.addEventListener("submit", handleSubmit);
