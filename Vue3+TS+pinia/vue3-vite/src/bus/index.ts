//引入mitt插件：mitt一个方法，触发执行会返回bus对象
import mitt from 'mitt';
//挂在在$bus变量上
const $bus = mitt();
//导出
export default $bus;