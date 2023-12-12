import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import dbconnection from './database/dbconnection';
import userRouter from './routes/usersRoute';
import bookRouter from './routes/bookRoute';
import authRouter from './routes/authRoute';
import cors from 'cors';

import { Error } from 'mongoose';

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

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).send('BBookshelf API')
});

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', bookRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("AAAA")
    if (err instanceof SyntaxError) {
        res.status(400).send(err.message);
    } else if (err instanceof Error) {
        res.status(400).send(err.message);
    } else {
        res.status(500).send("Something went wrong on the server. Contact support");
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});