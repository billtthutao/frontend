var fs = require("fs")

function fsOpen(path){
    return new Promise((resolve,reject)=>{
        fs.open('out.txt','w',function(err,fd){
            if(err){
                reject(err)
            }else{
                resolve(fd);        
            }
        })
    })
}

function fsWrite(fd){
    return new Promise((resolve,reject)=>{
        fs.write(fd,'Promise异步写入的内容',function(err){
            if(err) reject(err)
            resolve(fd)
        })
    })
}

function fsClose(fd){
    return new Promise((resolve,reject)=>{
        fs.close(fd,err=>{
            if(err) reject(err)
            resolve()
        })
    })
}

async function fileWriteOperation(){
    try{
    let fd = await fsOpen("out.txt")
    await fsWrite(fd)
    await fsClose(fd)
    console.log("File Write Operation is successful")
    }catch(err){
        console.log(err)
    }
}

fileWriteOperation()