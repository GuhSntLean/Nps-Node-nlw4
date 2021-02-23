import express from 'express';
const app = express() 
const port = process.env.PORT || 3001;

app.get('/users', (request, response) => {
  return response.json({message: "Hello man"});
});

app.post('/', (request, response) => {
  return response.json({message: "Mensagem salva"});
});

app.listen(port, () => {
  return console.log(`Server is running in port: ${port}`);
}).on('error', (err) =>{
  return console.log(`Error when trying to start the server: ${err}`)
});