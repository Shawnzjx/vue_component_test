/*
1). 2个引用变量指向同个对象,通过一个引用变量改变对象内部数据,另一个引用变量看到的是新的
2). 2个引用变量指向同个对象,让一个引用变量指向一个新的对象,另一个引用变量看到的还是原来的对象
*/

const o1 = {m:1}
const o2 = o1
o1.m = 2
console.log(o2.m)  //2

// let o3 = {m:1}
// let o4 = o3
// o3 = {m:2}
// console.log(o4.m) //1

//三个引用变量指向一个对象 (有函数的实参)
let o3 = {m:1}
let o4 = o3

function fn(o4) {
  o4.m = 3
}

fn(o4)
a = 2
console.log(o3.m,o4.m)  
//  3 , 3
//  1 , 3
