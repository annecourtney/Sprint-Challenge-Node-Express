const actions = require('./data/helpers/actionModel.js');
const projects = require('./data/helpers/projectModel.js');

const express = require('express');
const cors = require('cors');
const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));


//Actions
server.get('/api/actions', (req, res) => {
    actions
    .get()
    .then(actions => {
        res.json({ actions })
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The actions information could not be retrieved."})
    })
}) 
server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    if(req.params.id == undefined) {
        res.status(404)
        res.json({ message: "The action with the specified ID does not exist." })
    }
    else {
    actions
    .get(id)
    .then(action => {
        res.json({ action })
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The actions information could not be retrieved."})
    })
}}) 
server.post('/api/actions', (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  actions
  .insert({ project_id, description, notes, completed }) 
  .then(action => {
      res.json({ action })
  })
  .catch(error => {
      res.status(500)
      res.json({ message: "The action information could not be added."})
  })
})
server.put('/api/actions/:id', (req, res) => {
 const { description, notes, completed } = req.body;
 const { id } = req.params;
 if(!description) {
    res.status(400)
    res.json({ message: "Please include a description." })
 }
 actions
 .update(id, req.body, req.params.id)
 .then(action => {
    res.json({ action })
 })
 .catch(error => {
     res.status(500)
     res.json({ message: "The action information could not be changed."})
 })
})
server.delete('/api/actions/:id', (req, res) => {
const { id } = req.params;
actions
.remove(id)
.then(action => {
    res.json({ action })
}) 
.catch(error => {
    res.status(500)
    res.json({ message: "The action information could not be deleted."})
}) 
})


//projects
server.get('/api/projects', (req, res) => {
    projects
    .get()
    .then(projects => {
        res.json({ projects })
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The projects information could not be retrieved."})
    })
}) 
server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    if(req.params.id == undefined) {
        res.status(404)
        res.json({ message: "The projects with the specified ID does not exist." })
    }
    else {
        projects
    .get(id)
    .then(projects => {
        res.json({ projects })
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The projects information could not be retrieved."})
    })
}}) 
server.post('/api/projects', (req, res) => {
    const { description, name, completed } = req.body;
    projects
    .insert(req.body) 
    .then(projects => {
        res.json({ projects })
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The projects information could not be added."})
    })
  })
server.put('/api/projects/:id', (req, res) => {
    const { description, name, completed } = req.body;
    const { id } = req.params;
    if(!description || !name) {
       res.status(400)
       res.json({ message: "Please include a description." })
    }
    projects
    .update(id, req.body)
    .then(projects => {
       res.json({ projects})
    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The projects information could not be changed."})
    })
   })
server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projects
    .remove(id)
    .then(projects => {
        res.json({ projects })
    }) 
    .catch(error => {
        res.status(500)
        res.json({ message: "The projects information could not be deleted."})
    }) 
    })
server.get('/api/projects/:id/actions', (req, res) => {
    const { id } = req.params;
    projects
    .getProjectActions(id)    
    .then(actions => {
        res.json({ actions })

    })
    .catch(error => {
        res.status(500)
        res.json({ message: "The project actions information could not be retrieved."})
    })
}) 

server.listen(port, () => console.log(`Server running on port ${port}`));