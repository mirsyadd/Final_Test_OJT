const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const produceRoute = require('./src/Routes/RabbitMqRoute')
const {consumeQueue} = require('./src/Modules/RabbitMQService')
const {get} = require('lodash')
const SMTPServices = require('./src/Modules/SMTPservice')

const port = 5000

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
    extended: true,
    })
);
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json())

app.use(produceRoute)
consumeQueue('Testing', async (ch, msg) => {
    try {
    console.log('Successfuly retrieve queue');
    const message = JSON.parse(msg.content.toString());
    const messageRabbitMq = get(message, 'params.message');
    
    const sendmail = {
        email: 'mr.irsyad29@gmail.com',
        subject: 'Rembestmen Ticket Success'
    }

    SMTPServices.sendMailfromHtml(sendmail, (err, result)=>{
        if(err) {
            console.log(err);
        }
    })

    console.log('Message retrieved : ', messageRabbitMq)
    ch.ack(msg)        
    } catch (error) {
    ch.ack(msg)
    }
})

app.listen(port, () => {
    console.log(`Server up and running on localhost ${port}`);
});
