const express = require('express');
const app = express();
const port = 3000;

//app.use(express.json());

// get
app.get('/', (req, res) => {
  res.send('Primeiro server Node')
});

// post

// put

// delete


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});
