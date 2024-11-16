import WebSocket, { WebSocketServer } from 'ws';
import pg from 'pg';
import dotenv from 'dotenv';
import {PrismaClient} from "@prisma/client";
import {jsonStringify} from "./utils.js";

dotenv.config();
const { Pool } = pg;
const prisma = new PrismaClient();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    async function fetchAndSendDisputes(userId) {
        console.log(userId)
        const data = await prisma.dispute.findMany({
            where: {
                OR: [
                    {
                        user_1: userId,
                    },
                    {
                        user_2: userId,
                    },
                ]
            }
        });
        return data;
    }

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'register' && data.clientId) {
            ws.clientId = parseInt(data.clientId);
            if (ws.readyState === WebSocket.OPEN ) {
                fetchAndSendDisputes(data.clientId).then(data => {
                    ws.send(jsonStringify({
                        status: 'insert-many',
                        result: data
                    }))
                });
            }
        }
    })

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

pool.connect((err, client) => {
    if (err) throw err;

    client.on('notification', (msg) => {
        const payload = JSON.parse(msg.payload);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                if(client.clientId === payload.data.user_1 || client.clientId === payload.data.user_2) {
                    client.send(JSON.stringify({
                        status: payload.event,
                        result: payload.data
                    }));
                }
            }
        });
    });

    client.query('LISTEN new_message');
});
