import express from 'express';
import path from 'path';;
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import  {fileURLToPath}  from  'url' ;
import cors from 'cors';

// const __filename = fileURLToPath(import.meta.url);
const __dirname  =  path.dirname(fileURLToPath(import.meta.url)); 

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json())

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use('/api', apiRoutes)

server.use((req, res) => {
    res.status(404);
    res.json({error: 'endpoint não encontrado'});
});

let port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})