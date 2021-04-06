const fs = require('fs')

const p = new Promise((resolve,reject) => {
    console.log("promise1")
    fs.readFile('t1.txt1',(err,data) => {
        if(err) reject(err);
        resolve(data);
    })
})

p.then(value => {
    return new Promise((resolve,reject) => {
        console.log("promise2")
        fs.readFile('t2.txt',(err,data) => {
            if(err) reject(err);
            resolve([value,data]);
        })
    })
},error=>{console.log("222");console.log(error);return new Promise(()=>{})})
.then(value => {
    return new Promise((resolve,reject) => {
        console.log("promise3")
        fs.readFile('t3.txt',(err,data) => {
            if(err) reject(err);
            value.push(data);
            resolve(value);
        })
    })
}).then(value => {
    console.log(value.join('\r\n'))
})
// .catch(reason => {console.log("333");console.log(reason)})

