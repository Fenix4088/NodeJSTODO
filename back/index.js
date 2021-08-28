require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./roters/authRouter')
const app = express();

const {DB, PORT} = process.env;

const start = async () => {
    try {
        await mongoose.connect(DB, () => {
            console.log('Connected')
        })

    } catch(e) {
        console.log(e)
    }
}

app.use(express.json());
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})



start();