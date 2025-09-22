import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { initWebsocket } from './wsServer';
import routes from './routes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });
initWebsocket(wss);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Questly backend listening on ${port}`));
