import {Names} from "../store-name";
import {defineStore} from 'pinia'

type User = {
    name:string
}
let result:User = {
    name: 'Pinia'
}
const Login = ():Promise<User> =>{
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({
                name:"1234"
            })
        },2000)
    })
}
export const useTestStore = defineStore(Names.TEST,{
    persist: true,
    state:()=>{
        return {
            current:1,
            name:'smz',
            user:<User>{}
        }
    },
    getters:{
        newName():string{
            return `name: ${this.name}`
        },
        newName2():string{
            return this.newName()
        }
    },
    actions:{
       setCurrent(number){
           this.current = number
       },
        setUser(){
           this.user = result
            this.setCurrent(666)
        },
        async setUser2(){
           this.user =await Login()
        }
    }
})