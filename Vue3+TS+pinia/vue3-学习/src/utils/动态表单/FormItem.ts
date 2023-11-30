import {isReactive, reactive} from 'vue'

// 表单类型
export type FormItemType = 'input' | 'select' | 'checkbox' | 'radio';

export interface FormItem {
    type: FormItemType; // 表单类型
    payload: any; // 关联数据
    next: (current: FormItem, ancients:FormItem[]) => FormItem | null; // 表单信息； current： 当前表单项信息, ancients： 之前表单项信息
    parent: FormItem | null; // 当前表单的父级表单
}

/**
 * 创建表单项
 */
export function createFormItem(
    formItemType: FormItem['type'],
    payload: FormItem['payload'],
    next?: FormItem['next'],
    parent?: FormItem['parent']
) : FormItem {
    if(!next) {
        next = () => null
    }
    if (!parent) {
        parent = null
    }
    const nextFunc: FormItem['next'] = (current, acients) => {
        let nextItem = next!(current, acients); // 获取下一个表单项
        if (!nextItem) {
            return null
        }
        nextItem.parent = current // 设置父级表单
        if (!isReactive(nextItem)){ // 如果不是响应式对象，转换成响应式对象
            nextItem = reactive(nextItem)
        }
        return nextItem
    }

    return reactive({
        type: formItemType,
        payload,
        next: nextFunc,
        parent
    });
}