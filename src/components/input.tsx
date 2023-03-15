import React, { useRef } from "react"
import dayjs from "dayjs"
import { v4 as uuidv4 } from "uuid"
import { ITodo } from "../types"

function Input(props: {addList: (arg0: ITodo) => void }) {
  console.log("Input update")
  // 用useRef保持input在组件整个生命周期中不变
  const input = useRef<HTMLInputElement>(null)
  // 接收参数
  const { addList } = props
  function enterKey(key: string) {
    if (key === "Enter" && input.current.value !== "") {
      // 生成新的item对象
      const todoitem: ITodo = {
        id: uuidv4(),
        content: input.current.value,
        finished: false,
        ctime: dayjs().valueOf(),
        mtime: dayjs().valueOf(),
      }
      addList(todoitem) // 向父组件传递信息
      input.current.value = ""
    }
  }
  return (
    <input
      id="input"
      type="text"
      className="input"
      placeholder="What needs to be done?"
      autoComplete="off"
      ref={input}
      onKeyDown={(e) => enterKey(e.key)}
    />
  )
}
// 用React.memo对Input进行记忆
export default React.memo(Input)