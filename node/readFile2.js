const { transcode } = require('buffer');
const fs = require('fs')

function p1(){
    return new Promise((resolve,reject) => {
        console.log("promise1")
        fs.readFile('t1.txt',(err,data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

function p2(){
    return new Promise((resolve,reject) => {
        console.log("promise2")
        fs.readFile('t2.txt1',(err,data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

function p3(){
    return new Promise((resolve,reject) => {
        console.log("promise3")
        fs.readFile('t3.txt',(err,data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

async function transRead(){
    try{
        let data1 = await p1()
        console.log(data1.toString())
        let data2 = await p2()
        console.log(data2.toString())
        let data3 = await p3()
        console.log(data3.toString())
    }catch(err){
        console.log(err)
    }
    
}

transRead()