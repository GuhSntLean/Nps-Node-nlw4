import express from 'express';
const app = express() 
const port = process.env.PORT || 3001;

app.get('/users', (request, response) => {
  return response.json({message: "Hello man"});
});

app.post('/', (request, response) => {
  return response.json({message: "Mensagem salva"});
});

app.listen(port, '0.0.0.0', (error) => {
  if(error){
    return console.log(`Error try access server: ${error}`)
  }
  return console.log(`Server is running in port: ${port}`);
});