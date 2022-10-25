import bodyParser from "body-parser"
import express from "express"
const cors = require ('cors');
import http from "http";
const app = express()

const server = http.createServer(app);

import {server} from "socket.io";
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(request,response) => {
    response.sendFile(`${__dirname}/public/chat.html`);
});
const customers = [{
    id: '1',
    name: 'Juan Francisco',
},
    {
        id: '2',
        name: 'Pedro algo'
    },
    {
        id: '3',
        name: 'Gregorio Ramon De Los Santos'
    }]
app.get('/customers/:id', (request,response) => {
    const customer = customers.find ((c) => c.id === request.params.id)
    if (customer){
        response.json(customer);
    }
    response.status(404).send('Not Found');
});

app.get('/customers', (request,response) => {
    response.json(customers);
});

app.put('/customers/:id',
    (request, response) => {
        const {name} = request.body;
        const customer = customers.find((c) => c.id === request.params.id);
        const isAlreadyName = customers.some((c) => c.name === name
            && c.id !== request.params.id);

        if (isAlreadyName) {
            response.status(409).send('There is another name like ${name')
        }
        if (!customers) {
            response.status(404).send(' Not found');
        } else {
            // @ts-ignore
            customer.name = name;
            response.status(200).send(' Name was updated successfully');
        }
    });

app.post('/customers', (request,response) => {
    const {name} = request.body;
    const isAlreadyName = customers.find((customer) => customer.name === name);
    if (isAlreadyName){
        response.status(409).send('Conflict')
    }
    else if (name === '' ){
        response.status(400).send(' Bad request' );
    }
    else{
        customers.push({id: `${customers.length + 1}`, name });
        response.status(201).send(`Created successfully with the id ${customers.length}`);
    }

});

app.delete('/customers/:id', (request,response) => {
    const idIndex = request.params.id;
    const customer = customers.findIndex ((c) => c.id === idIndex);
    if (customer === -1)  {
        response.status(404).send('Not found');
    }
    else {
        customers.splice(customer,1);
        response.status(201).send(`Deleted successfully with the id ${idIndex}`);
    }
});

app.get('/customers', (request,response) => {
    response.json(customers);
});

io.on('connection' ,(socket)=>{
    console.log("a new user connected");
});
const port = process.env.PORT || 3000
server.listen(port, () => console.log(`app listening on PORT ${port}`));
