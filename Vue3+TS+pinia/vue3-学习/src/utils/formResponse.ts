/**
 * 表单数据初始化
 * 将配置的表单数据转换成响应式对象
 * @param arr
 */
import {ref} from "vue";
export default  function (arr:Array<any>):Object {
    let formDataInit = {}
    let formItems = arr??[]
    formItems.map(item => {
       formDataInit[item.field] = ''
    })
    return ref(formDataInit)
}