const http = require('http');
const { v4: uuidv4 } = require('uuid');
const todos = [
    { id: uuidv4(),
    title: 'First todo',
    completed: false},
    { 
        id: uuidv4(),
    title: 'Second todo',
    completed: false
    },
    {
        id: uuidv4(),
        title: 'Third todo',
        completed: true
    }
];

const requestListener = (req, res) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (req.method === 'GET' && req.url === '/') {


