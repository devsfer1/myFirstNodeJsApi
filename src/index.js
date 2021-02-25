const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');
const app = express();
const port = 3333;

// Falar para o Express que a Api vai receber informações no formato JSON
app.use(cors());
app.use(express.json());

const projects = [];

function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next(); //Próximo middleware

  console.timeEnd(logLabel);
} 

function validateProjectId(req, res, next) {
  const { id } = req.params;

  if(!isUuid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  return next();
}

app.use('/projects/:id', validateProjectId);

// get
app.get('/projects', (req, res) => {
  const {type} = req.query;

  // Verificar se o titulo foi preenchido pelo usuario;
  const results = owner
    ? projects.filter(project => project.owner.includes(owner))
    : projects;

  return res.json(results);
});

// post
app.post('/projects', (req, res) => {
  const {title, owner} = req.body;

  const project = {id: uuid(), title, owner}

  projects.push(project);

  return res.json(project);
})

// put
app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const {name, type} = req.body;

  // Procurar Project no array
  const projectIndex = projects.findIndex(project => project.id === id);

  // Se ele não existir: 
  if(projectIndex < 0) {
    return res.status(400).json({ error: 'Project not found.' })
  }

  // Se ele existir:
  const project = {
    id,
    title, 
    owner
  }

  projects[projectIndex] = project;

  return res.json(project)
});

// delete
app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  // Procurar Project no array:
  const projectIndex = projects.findIndex(project => project.id === id);

  // Se ele não existir:
  if(projectIndex < 0) {
    return res.status(400).json({ error: 'Project not found.' })
  }

  // Se ele existir:
  projects.splice(projectIndex, 1);

  return res.status(204).send();
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});
