const p = new Promise((resolve,reject) => {
    console.log('p1')
    reject('p1')
}).then((p)=>{
    console.log("p2",p)
    let x = 10/0
    console.log(x.x)},error=>{console.log('error2',error);return new Promise((resolve,reject) => {reject('p2-rej')})})
  .then((p)=>{
    console.log("p3",p)
},()=>{console.log('p3-rej')})