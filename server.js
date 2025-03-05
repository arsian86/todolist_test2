const http = require('http');
const { v4: uuidv4 } = require('uuid');
const todos = [
    { id: uuidv4(),
    title: 'First todo'
    },
    { 
        id: uuidv4(),
    title: 'Second todo'
    },
    {
        id: uuidv4(),
        title: 'Third todo'
    }
];
const errorHandler = require('./errorHandler');

const requestListener = (req, res) => {
    const headers = {
        "Access-Control-Allow-Headers":"Content-Type, Authorization, Content-Length, X-Requested-With",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
        "Content-Type": "application/json",
    };
    let body = "";
    if (req.method === 'GET' && req.url === '/todos') {
        res.writeHead(200,headers);
        res.write(
            JSON.stringify({
                status:"sucess",
                todos,
            })
        );
        res.end();
    }else if (req.method === 'POST' && req.url === '/todos') {
        try{
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const todo = JSON.parse(body).title;
                if
                (   todo!== undefined &&
                    todo.trim()!== '' &&
                    typeof todo ==='string'
                ){
                    const todoProj= 
                    { 
                        id: uuidv4(),
                        title: todo,
                    };
                    todos.push(todoProj);
                    res.writeHead(200,headers);
                    res.write(
                        JSON.stringify({
                            status:"sucess",
                            todos,
                        })
                    );
                    res.end();
                }else{
                    errorHandler(res);
                }});
        }catch{
            errorHandler(res);
        }
    }else if (req.method === 'PATCH' && req.url.startsWith('/todos/')) {
        try{
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const todo = JSON.parse(body).title;
                const id = req.url.split('/').pop();
                const index = todos.findIndex((todo) => todo.id === id);
                if
                (   todo!== undefined &&
                    todo.trim()!== '' &&
                    typeof todo ==='string' &&
                    index!== -1
                ){
                    todos[index].title =todo;
                    res.writeHead(200,headers);
                    res.write(
                        JSON.stringify({
                            status:"sucess",
                            todos,
                        })
                    );
                    res.end();
                }else{
                    errorHandler(res);
                }});
        }catch{
            errorHandler(res);
        }
    }else if (req.method === 'DELETE' && req.url.startsWith('/todos/')) {
        try{
            const id = req.url.split('/').pop();
            const index = todos.findIndex((todo) => todo.id === id);
            if(index!== -1){
                todos.splice(index,1);
                res.writeHead(200,headers);
                res.write(
                    JSON.stringify({
                        status:"sucess",
                        todos,
                    })
                );
                res.end();

            }else{
                errorHandler(res);
            }
        }catch{
            errorHandler(res);
        }
    }else if (req.method === 'DELETE' && req.url.startsWith('/todos')){
        try{
            todos.length=0;
            res.writeHead(200,headers);
            res.write(
                JSON.stringify({
                    status:"sucess",
                    data:"All todos deleted"
                })
            )
            res.end();
        }
        catch{
            errorHandler(res);
        }
    }
}

const server = http.createServer(requestListener);
const port = process.env.PORT || 3005;

server.listen(port,()=>
console.log(`Server is running on port ${port}`));