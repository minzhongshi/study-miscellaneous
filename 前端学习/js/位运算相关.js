const READ = 0b1; //（1）可读权限     00001
const CREATE = 0b10; //（2）可创建    00010
const UPDATE = 0b100; //（4）可更新   00100
const DELETE =0b1000; //（8）可删除   01000

// 或运算组合权限
const jurisdiction =  READ | UPDATE | DELETE | CREATE
console.log(jurisdiction.toString(2))

//与运算查询是否具有某个权限
const smz = 14;
if ((smz & READ) === 0) console.log("无可读权限")
else console.log("有可读权限")

//异或运算删除或者更改权限(原来有权限时是删除，原来没有时是更改，如果是更改时需要判断原来是否具有权限)
const smz2 = smz ^ READ
