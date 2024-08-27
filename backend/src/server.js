import connection from './config/connectDB'
import bodyParser from "body-parser";
import express from "express";
import initApiRoutes from './routes/api.js'
const app = express();
const cookieParser = require('cookie-parser');
//const cors = require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();

// config cookie parse
app.use(cookieParser())

// Define the CORS options
const corsOptions = {
    // có cho phép các đường link define bên dưới có được gửi cookie hay không.
    credentials: true,
    // define các đường link được gửi request đến server
    origin: ['http://localhost:3000', 'http://localhost:8080'] // Whitelist the domains you want to allow
};
//app.use(cors(corsOptions)); // Use the cors middleware with your options

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type,Authorization"
    );


    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }

    // Pass to next layer of middleware
    next();
});
// connect to database
connection()

// init web route 
initApiRoutes(app);

const hostname = '127.0.0.1';
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World node version 19!')
})
app.listen(port, () => {
    console.log(`Server running at local:${port}/`);
});
