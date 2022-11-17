const express = require('express');
const cors = require('cors');
const session = require("express-session");
const dotenv = require('dotenv');
const db = require('./src/config/database')
const SequelizeStore = require('connect-session-sequelize')
const UserRoute = require('./src/routes/UserRoute');
const AuthRoute = require('./src/routes/AuthRoute');
const TicketRoute = require('./src/routes/TicketRoute');
// const ActivityRoute = require('./src/routes/ActivityRoute');

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db: db
})

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store, 
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())

app.use(UserRoute)
app.use(TicketRoute)
// app.use(ActivityRoute)
app.use(AuthRoute)

// store.sync();

app.listen(process.env.APP_PORT, async ()=> {
    console.log('Server up and running .... ');
})