import React, { useCallback, useState } from "react"
import Item from "./item"
import { ITodo } from "../types"
import compare from "../sort"

export default function List(props:{ todos: ITodo[] }){
    console.log("List update")
    // 接收参数
    const { todos } = props
    let n = 0
    // 用state驱动List组件的重新渲染
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useState(0)
    // 对修改后的todos进行排序，并修改state的值，驱动组件的重新渲染
    const sortList = useCallback(() => {
        todos.sort(compare)
        console.log(todos)
        setState(++n)
        localStorage.setItem("todos",JSON.stringify(todos)); // 改动后存入本地存储空间
    },[])
    // 删除指定的item，并修改state的值，驱动组件的重新渲染
    const deleteList = useCallback((deleteIndex: number) => {
        todos.splice(deleteIndex, 1)
        setState(++n)
        localStorage.setItem("todos",JSON.stringify(todos)); // 改动后存入本地存储空间
      }, []);
    return (
        <section id="todos">
            {todos.map(item => <Item key={item.id} todos={todos} item={item} deleteList={deleteList} sortList={sortList} /> ) }
        </section>
    )
}