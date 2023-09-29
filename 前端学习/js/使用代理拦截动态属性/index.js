function createProxy(value = []) {
    return new Proxy({},{
        get(target,propKey,receiver){
            if (propKey === Symbol.toPrimitive){
                return ()=>value.reduce((a,b)=> a +b,0)
            }
            return createProxy([...value,+propKey])
        }
    })
}
const add = createProxy()

const r1 = add[1][2][3] + 4 // 10
const r2 = add[10][20] + 30 // 60
const r3 = add[100][200][300] + 400// 1000

console.log(r1)
console.log(r2)
console.log(r3)