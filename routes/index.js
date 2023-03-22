var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;






MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  var db = client.db('AgileZen');
  var projectsCollection = db.collection('projects');
  var tasksCollection = db.collection('tasks');

  // Récupération de tous les projets
  router.get('/', function (req, res) {
    projectsCollection.find().toArray((err, projects) => {
      if (err) throw err;
      res.json(projects);
    });
  });

  // Récupération d'un projet par ID
  router.get('/:id', function (req, res) {
    var id = req.params.id;
    var query = { _id: ObjectId(id) }; // Utilisation de ObjectId pour convertir l'ID en objet

    projectsCollection.findOne(query, (err, project) => {
      if (err) throw err;
      res.json(project);
    });
  });

  // Récupération de toutes les tâches
  router.get('/tasks', function (req, res) {
    tasksCollection.find().toArray((err, tasks) => {
      if (err) throw err;
      res.json(tasks);
    });
  });

  // Récupération des tâches d'un projet par ID
  router.get('/projects/:id/tasks', function (req, res) {
    const id = req.params.id;
    const query = { projectId: id }; // Utilisation de l'ID du projet

    tasksCollection.find(query).toArray((err, tasks) => {
      if (err) throw err;
      res.json(tasks);
    });
  });


});

module.exports = router;