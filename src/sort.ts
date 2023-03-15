import {ITodo} from "./types"

// 比较函数 用于数组排序
export default function compare(item1: ITodo, item2: ITodo){
    if(item1.finished === item2.finished){
      return ( item1.ctime - item2.ctime > 0 ) ? -1 : 1
    }
    else{
      if(item1.finished === true){
        return 1;
      }
      else{
        return -1;
      }
    }
  }