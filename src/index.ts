import express from "express";


const app = express();

app.get('/test', (req, res) => {
  return res.send("response test get");
});

app.post('/test-post', (req, res) => {
  return res.send("response test post");
});


app.listen(8080, () => console.log('Server is running'));

