let a = 1;

(function () {
    if (typeof a === undefined){
        console.log(a)
        var a = 2

    }else {
        console.log(a)
    }
})()