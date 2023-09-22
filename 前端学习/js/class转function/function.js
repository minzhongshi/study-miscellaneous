'use strict';

function Example(name) {
    if (!new.target){ // 非new调用
        throw new TypeError(
            `Class constructor Example cannot be invoked without 'new'`
        )
    }
    this.name = name
}

Object.defineProperty(Example.prototype,'func',{
    value: function () {
        if (new.target){ // 原型链调用方法
            throw new TypeError(
                ` Example.prototype.func is not a constructor`
            )
        }
        console.log(this.name)
    },
    enumerable: false // 不可枚举
})

