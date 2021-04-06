var fs = require("fs")

let fsop = new Promise((resolve,reject)=>{
    fs.open('out.txt','w',function(err,fd){
        if(err){
            reject(err)
        }else{
            resolve(fd);        
        }
    })
})

fsop
.then(fd => {
    return new Promise((resolve,reject)=>{
        fs.write(fd,'Promise异步写入的内容',function(err){
            if(err) reject(err)
            resolve(fd)
        })
    })
})
.then(fd => {
    return new Promise((resolve,reject)=>{
        fs.close(fd,err=>{
            if(err) reject(err)
            resolve()
        })
    })
})
.then(() => {
    console.log("File Write Operation is successful")
})
.catch(err => {
    console.log(err)
})