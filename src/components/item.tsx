import { ITodo } from "../types"
import React from "react"
import dayjs from "dayjs"

function Item(props:{todos:ITodo[], item:ITodo, deleteList:(arg0: number)=>void, sortList:() => void } ) {
  console.log("Item update")
  // 接收参数
  const {todos, item, deleteList, sortList }= props
  const currentItem = item 
  // useState 驱动组件重新渲染
  const [finish, setFinish] = React.useState(currentItem.finished)
  // 当CheckBox被点击时，执行该函数，修改item的mtime和finished属性
  const finishItem = () => {
    setFinish((!finish))
    const index = todos.indexOf(currentItem);
    todos[index].finished = !finish
    todos[index].mtime = dayjs().valueOf()
    sortList()
  }
  // 当删除按钮被点击时，执行该函数，删除todos中对应的item
  const deleteItem = () => {
    const index = todos.indexOf(currentItem);
    console.log("delete...")
    deleteList(index) 
  }
  return (
    <div className={finish ? "todo-item todo-finished" : "todo-item"} id={currentItem.id}>
      <i className="iconfont icon-checkbox" onClick={finishItem}></i>
      <span className="todo-title">{currentItem.content}</span>
      <span className="time">{dayjs(currentItem.ctime).format('MM月DD日HH:mm:ss')}</span>
      <i className="iconfont icon-delete" onClick={deleteItem}></i>
    </div>
  )
}
// 用React.memo对Item进行记忆
export default React.memo(Item)