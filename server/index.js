import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'
import env from 'dotenv'

//import file url to path to fix __dirname error
import { fileURLToPath } from "url";

import filesRoutes from './routes/files.js'
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//.ENV
env.config();
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use('/files', filesRoutes)

//SERVE STATIC IF IN PRODUCTION
// app.use(express.static(path.join(__dirname, "client/build")))


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});



/* if(process.env.NODE_ENV === 'production') {
    //Set Static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} */

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
.catch((error) => {
    console.log(error.message)
})
