/**
 * 定义组合式API仓库
 * 务必返回一个对象：属性与方法可以提供给组件使用
 */
import {defineStore} from "pinia";
import {computed, reactive} from "vue";
let userTodoStore = defineStore("todo",()=>{

    let todos = reactive([{id:1,title:'吃饭'},{id:2,title:'睡觉'}])
   let arr = reactive([1,2,3,4,5,6])
    const total = computed(()=>{
        return arr.reduce((prev,next)=>{
            return prev+next
        },0)
    })
    return {
        todos,
        total,
        updateTodo(){
            todos.push({id:3,title: '组合式API'})
        }
    }
})
export default userTodoStore