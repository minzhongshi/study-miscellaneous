class Example {
    constructor(name) {
        this.name = name
    }
    func(){
        console.log(this.name)
    }
}

new Example.prototype.func()