import express from 'express';
import dotenv from 'dotenv';
import dbconnection from './database/dbconnection';

dotenv.config();

dbconnection()
    .then((conn) => {
        conn.on('error', console.error.bind(console, 'Mongoconn Connection Error:'));
        conn.once('open', () => {
            console.log('Successfully connected to MongoDB!');
        });
    })
    .catch((err) => {
        console.log(err)
    });

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('BBookshelf API')
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});