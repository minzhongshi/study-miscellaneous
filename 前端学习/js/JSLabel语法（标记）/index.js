outer: for (let i = 0; i < 10; i++) {
    console.log('顶层')
    for (let j = 0; j < 10; j++) {
        console.log('内层')
        if (i * j >30){
            console.log('退出顶层循环')
            break outer
        }
    }
}