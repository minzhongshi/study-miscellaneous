"use strict";
var fna = function (params) {
};
var fnb = function (params) {
};
// 这样一定是安全的
fnb = fna;
fna = fnb;
