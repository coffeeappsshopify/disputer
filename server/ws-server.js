import WebSocket, { WebSocketServer } from 'ws';
import pg from 'pg';
import dotenv from 'dotenv';
import {PrismaClient} from "@prisma/client";

dotenv.config();
const { Pool } = pg;
const prisma = new PrismaClient();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    async function fetchAndSendDisputes() {
        const data = await prisma.dispute.findMany();
        return data;
    }
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            fetchAndSendDisputes().then(data => {
                client.send(JSON.stringify({
                    status: 'insert',
                    result: data
                }))
            });
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Listen for PostgreSQL notifications
pool.connect((err, client) => {
    if (err) throw err;

    client.on('notification', (msg) => {
        const payload = JSON.parse(msg.payload);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    status: payload.event,
                    result: payload.data
                }))
            }
        });
    });

    client.query('LISTEN new_message'); // Ensure you have this notification set up
});
