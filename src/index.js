const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const app = express();
const port = 3333;

// Falar para o Express que a Api vai receber informações no formato JSON
app.use(express.json());

const pokemons = [];

function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next(); //Próximo middleware

  console.timeEnd(logLabel);
} 

function validatePokemonId(req, res, next) {
  const { id } = req.params;

  if(!isUuid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  return next();
}

app.use('/projects/:id', validatePokemonId);

// get
app.get('/Pokemons', (req, res) => {
  const {type} = req.query;

  // Verificar se o titulo foi preenchido pelo usuario;
  const results = type
    ? pokemons.filter(pokemon => pokemon.type.includes(type))
    : pokemons;

  return res.json(results);
});

// post
app.post('/Pokemons', (req, res) => {
  const {name, type} = req.body;

  const pokemon = {id: uuid(), name, type}

  pokemons.push(pokemon);

  return res.json(pokemon);
})

// put
app.put('/Pokemons/:id', (req, res) => {
  const { id } = req.params;
  const {name, type} = req.body;

  // Procurar Pokemon no array
  const pokemonIndex = pokemons.findIndex(pokemon => pokemon.id === id);

  // Se ele não existir: 
  if(pokemonIndex < 0) {
    return res.status(400).json({ error: 'Pokemon not found.' })
  }

  // Se ele existir:
  const pokemon = {
    id,
    name, 
    type
  }

  pokemons[pokemonIndex] = pokemon;

  return res.json(pokemon)
});

// delete
app.delete('/Pokemons/:id', (req, res) => {
  const { id } = req.params;

  // Procurar Pokemon no array:
  const pokemonIndex = pokemons.findIndex(pokemon => pokemon.id === id);

  // Se ele não existir:
  if(pokemonIndex < 0) {
    return res.status(400).json({ error: 'Pokemon not found.' })
  }

  // Se ele existir:
  pokemons.splice(pokemonIndex, 1);

  return res.status(204).send();
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});
