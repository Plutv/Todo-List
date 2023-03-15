import React, { useCallback, useState } from "react"
import ReactDOM from "react-dom/client"
import compare from "../../sort"
import "../../assets/styles/main.css"
import "../../assets/styles/iconfont.css"
import Input from "../../components/input"
import { ITodo } from "../../types"
import List from "../../components/list"
import "../../assets/imgs/font.woff2"
import "../../assets/imgs/vite.svg"
// 获取根元素
const appDom: HTMLElement = document.getElementById("app") as HTMLElement

const app = ReactDOM.createRoot(appDom)
// 将本地缓存读取出来
let newlist: ITodo[] = []

if (localStorage.getItem("todos") != null) {
     newlist = JSON.parse(localStorage.todos);
}

function App() {
  console.log("App update")
  // 用newlist初始化todos
  const todos: ITodo[] = newlist
  // 用todo.length的变化驱动组件更新
  // eslint-disable-next-line no-unused-vars
  const [len, setLen] = useState(0)
  // 用useCallback对addList进行记忆，避免Input组件进行不必要的渲染
  const addList = useCallback((item: ITodo) => {
    todos.push(item)
    todos.sort(compare)
    setLen(todos.length)
    localStorage.setItem("todos",JSON.stringify(todos));
  },[])
  // 向Input组件中传入addList函数，向List组件中传入清单todos
  return (
    <>
      <header>
        <div className="title">Todo List</div>
        <Input addList={addList} />
      </header>
      <List todos={todos} />
    </>
  )
}

app.render(<App />)