const express = require('express');
const app = express();
const port = 3333;

// Falar para o Express que a Api vai receber informações no formato JSON
app.use(express.json());

const pokemons = [];

// get
app.get('/Pokemons', (req, res) => {
  const {name, type} = req.query;

  //console.log(name);
  //console.log(type);

  return res.json(pokemons);
});

// post
app.post('/Pokemons', (req, res) => {
  const {name, type} = req.body;

  const pokemon = {name, type}

  console.log(name);
  console.log(type);

  return res.json([
    'Pokemon 4',
    'Pokemon 5',
    'Pokemon 6'
  ])
})

// put
app.put('/Pokemons/:id', (req, res) => {
  const { id } = req.params;

  console.log(id);

  return res.json([
    'Pokemon 4',
    'Pokemon 5',
    'Pokemon 6'
  ])
});

// delete
app.delete('/Pokemons/:id', (req, res) => {

});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});
