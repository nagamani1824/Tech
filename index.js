// const http=require('http')

// const server=surya.createServer((req, res)=>{
//     res.writeHead(200,{'content-type':'text/plain'})

//     res.end('hello')
// })

// const port=4000

// server.listen(port,()=>{
//     console.log(`servr listening ${port}`)
// })


 

// const server = http.createServer((req, res)=>{
//     fs.readFile(path.join(__dirname, 'index.html'), (err, data)=>{
//         if(err){
//             res.writeHead(500, {'content-type':'text/plain'})
//             res.end('error')
//         }
//         else{
//             res.writeHead(200, {'content-type':'text/html'})
//             res.end(data)
//         }
//     })
// })



// linking html 

// const server = http.createServer((req, res)=>{
//     fs.readFile(path.join(__dirname, 'index.html'), (err, data)=>{
//         if(err){
//             res.writeHead(500, {'content-type':'text/plain'})
//             res.end('error')
//         }
//         else{
//             res.writeHead(200, {'content-type':'text/html'})
//             res.end(data)
//         }
//     })
// })



// commom function

const fs = require('fs')
const path = require('path')
const http = require('http')

function servePage(res, filepath){
     fs.readFile(path.join(__dirname, filepath),(err, data)=>{
        if(err){
            res.writeHead(404,{'content-type':'text/plain'})
            res.end("page not found")
        }
        // else if{
        //     res
        // }
        else{
            res.writeHead(200,{'content-type':'text/html'})
            res.end(data)
        }
    })
}

const server = http.createServer((req, res)=>{
    if(req.url==='/home'){
        servePage(res, 'index.html')
    }
    else if(req.url==='/about')
        servePage(res,'about.html')
})

server.listen(3003,()=>{
    console.log('server running')
})

            