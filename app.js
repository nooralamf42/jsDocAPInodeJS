import http from "node:http";
import fs from "node:fs";

const PORT = 3000;
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const index = fs.readFileSync("index.html", "utf-8");
const api = fs.readFileSync("api.html", "utf-8");
const error = fs.readFileSync("404.html", "utf-8");

const server = http.createServer((req, res)=>{
    const param = req.url.split("/api/js/")[1];

    if(req.method!== "GET") 
        res.writeHead(404).end("Only GET requests are allowed!");
    else{   
        res.setHeader("content-type", "application/json")
        switch(req.url){

            case "/":
                res.setHeader("content-type", "text/html")
                res.writeHead(200).end(index);
                break;
                
            case "/api":
                res.setHeader("content-type", "text/html")
                res.writeHead(200).end(api)
                break;

            case "/api/js":
                res.writeHead(200).end(JSON.stringify(data.javascript));
                break;

            case "/api/js/" + param:
                if(param.includes("/")){
                    let newParam = param.split("/")
                    let path2 = JSON.stringify(data.javascript.elements[newParam[0]][newParam[1]]);
                    path2 === undefined? res.setHeader("content-type", "text/html").writeHead(404).end(error) : res.writeHead(200).end(path2)
                    break;
                }
                let path1 = JSON.stringify(data.javascript.elements[param]);
                path1 === undefined? res.setHeader("content-type", "text/html").writeHead(404).end(error): res.writeHead(200).end(path1)
                break;
            default:
                res.setHeader("content-type", "text/html").writeHead(404).end(error)
        }
    }
});

server.listen(PORT, ()=> console.log("Server is running at PORT : ",PORT));