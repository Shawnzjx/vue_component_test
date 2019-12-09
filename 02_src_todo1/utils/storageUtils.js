// 数据储存的工具模块

export function saveTodos(todos) {
  localStorage.setItem('todos_key',JSON.stringify(todos))
}

export function readTodos() {
  //json 数组
  return JSON.parse(localStorage.getItem('todos_key') || '[]')
}