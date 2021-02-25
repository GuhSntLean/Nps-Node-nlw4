import express from 'express';
import {router} from './routes';
// Importing type-orm for use database
import 'reflect-metadata';
import createConnection from "./database";
// Basic setting to run the serve
createConnection();
const app = express(); 
// Import routes and use routes
app.use(express.json());
app.use(router);

export {app}