import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

type WS = any;

export function initWebsocket(wss: WebSocketServer) {
  console.log('WS server ready');
  wss.on('connection', (ws: WS, req) => {
    const url = new URL(req.url ?? '', `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    try {
      const payload = token ? jwt.verify(token, process.env.JWT_SECRET || 'x') : null;
      if (!payload) { ws.close(4001, 'auth required'); return; }
      (ws as any).user = payload;
    } catch (e) { ws.close(4002, 'invalid token'); return; }

    ws.on('message', (m: Buffer) => {
      try {
        const data = JSON.parse(m.toString());
        if (data.type === 'ping') ws.send(JSON.stringify({ type: 'pong' }));
      } catch (e) {}
    });
  });
}
