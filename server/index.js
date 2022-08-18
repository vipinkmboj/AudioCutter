import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import env from 'dotenv'

import filesRoutes from './routes/files.js'
const app = express();


//.ENV
env.config();
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use('/files', filesRoutes)

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
.catch((error) => {
    console.log(error.message)
})
