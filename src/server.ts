import { app } from "./app";
const port = process.env.PORT || 3001;
// Started server
app.listen(port, () => {
  return console.log(`Server is running in port: ${port}`);
}).on('error', (err) =>{
  return console.log(`Error when trying to start the server: ${err}`)
});