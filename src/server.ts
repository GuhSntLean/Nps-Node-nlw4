import express from 'express';
import {router} from './routes';
// Importing type-orm for use database
import 'reflect-metadata';
import "./database";
// Basic setting to run the serve
const app = express(); 
const port = process.env.PORT || 3001;
// Import routes and use routes
app.use(express.json());
app.use(router);
// Started server
app.listen(port, () => {
  return console.log(`Server is running in port: ${port}`);
}).on('error', (err) =>{
  return console.log(`Error when trying to start the server: ${err}`)
});