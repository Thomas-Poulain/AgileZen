const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3000;

// Middleware Body-parser pour gérer les données POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connexion à la base de données MongoDB
MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  const db = client.db('mydb');
  const projectsCollection = db.collection('projects');
  const tasksCollection = db.collection('tasks');

  // Récupération de tous les projets
  app.get('/projects', (req, res) => {
    projectsCollection.find().toArray((err, projects) => {
      if (err) throw err;
      res.json(projects);
    });
  });

  // Récupération d'un projet par ID
  app.get('/projects/:id', (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) }; // Utilisation de ObjectId pour convertir l'ID en objet

    projectsCollection.findOne(query, (err, project) => {
      if (err) throw err;
      res.json(project);
    });
  });

  // Récupération de toutes les tâches
  app.get('/tasks', (req, res) => {
    tasksCollection.find().toArray((err, tasks) => {
      if (err) throw err;
      res.json(tasks);
    });
  });

  // Récupération des tâches d'un projet par ID
  app.get('/projects/:id/tasks', (req, res) => {
    const id = req.params.id;
    const query = { projectId: id }; // Utilisation de l'ID du projet

    tasksCollection.find(query).toArray((err, tasks) => {
      if (err) throw err;
      res.json(tasks);
    });
  });

  app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
  });
});
