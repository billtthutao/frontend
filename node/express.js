const express = require('express');

const app = express();

app.get('/',(request,response) => {
    response.setHeader("Access-Control-Allow-Origin","*")
    var data = {name: "test json data",age: 10}
    response.send(JSON.stringify(data));
});

app.listen(8000,()=>{
    console.log("Server is started.....")
});