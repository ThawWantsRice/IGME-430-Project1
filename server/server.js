const http = require('http');

const onRequest = (request, response) => {

}

http.createServer(onRequest).listen(3000, ()=>{
    console.log("Listening in at 127.0.0.1:3000");
})