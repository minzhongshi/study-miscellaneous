import {Component} from "react";

 class Counter extends Component{
    // 定义状态变量
    static = {
        count: 0
    }


    // 事件回调
    clickHandler = () =>{
        // 修改状态
        this.setState({
            count: this.state.count + 1
        })
    }

    // UI模板
    render (){
        return <button onClick={this.clickHandler}>{this.static.count}</button>
    }
}
export  default Counter