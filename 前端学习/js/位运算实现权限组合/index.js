const READ = 0b1;   // 0001
const WRITE = 0b10;  // 0010
const UPDATE = 0b100; // 0100
const DELETE = 0b1000; // 1000

// 权限组合
let p = READ | WRITE; // 0011 可读可写

/**
 * 判断是否有某个权限 & 运算
 * @param per 权限
 * @param target 目标权限
 * @return {boolean}
 *
 */
function hasPermission(per, target) {
    return (per & target) === target;
}

console.log(hasPermission(p, READ)); // true
console.log(hasPermission(p, UPDATE)); // false
console.log(hasPermission(13, READ)); // true

// 权限切换 ^ 运算 存在就删除，不存在就添加
p = p ^ READ; // 0011 ^ 0001 = 0010