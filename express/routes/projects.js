var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


  // Récupération de tous les projets
  router.get('/', async function (req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var projectsCollection = db.collection('projects');
      var projects = await projectsCollection.find().toArray();
      res.json(projects);
      client.close();
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });

  // Récupération d'un projet par son id
  router.get('/:id', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var projectsCollection = db.collection('projects');
      var id = req.params.id;
      var project = await projectsCollection.findOne({ _id: ObjectId(id) });
      res.json(project);
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });

  // Ajout d'un projet
  router.post('/', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var projectsCollection = db.collection('projects');
      var newProject = req.body;//Peut être à changer en fonction du formulaire fait après
      var result = await projectsCollection.insertOne(newProject);
      res.json(result.ops[0]); // Renvoi du document ajouté avec l'ID généré par MongoDB
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });


  // Modification d'un projet par son id
  router.put('/:id', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var projectsCollection = db.collection('projects');
      var id = req.params.id;
      var update = { $set: req.body }; //Peut être à changer en fonction du formulaire fait après
      var result = await projectsCollection.updateOne({ _id: ObjectId(id) }, update); 
      if (result.modifiedCount === 1) {
        res.json({ message: 'Projet mis à jour avec succès' });
      } else {
        res.status(404).json({ message: 'Projet non trouvé' });
      }
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });
  

  /**
   Peut être chiant à faire

  // Modification de plusieurs projets
  router.put('/', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var projectsCollection = db.collection('projets');
      var filter = req.body.filter; // Filtre à appliquer pour sélectionner les projets à mettre à jour (encore une fois il pourrait venir à changer en fonction des vues)
      var update = { $set: req.body.update }; // Données à mettre à jour (même commentaire)
      var result = await projectsCollection.updateMany(filter, update);
      res.json({ message: `${result.modifiedCount} projets ont été mis à jour` });
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });
  
 */

  // Suppression d'un projet par identifiant
  router.delete('/:id', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var projectsCollection = db.collection('projects');
      var id = req.params.id;
      var result = await projectsCollection.deleteOne({ _id: ObjectId(id) }); // Suppression du projet correspondant à l'ID
      if (result.deletedCount === 1) {
        res.json({ message: 'Projet supprimé avec succès' });
      } else {
        res.status(404).json({ message: 'Projet non trouvé' });
      }
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });

  //Suppression de tous les projets
  router.delete('/cleanAll', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var projectsCollection = db.collection('projects');
      var id = req.params.id;
      var result = await projectsCollection.deleteMany(); // Suppression du projet correspondant à l'ID
      res.json({ message: 'Projets supprimés avec succès' });
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });
  

module.exports = router;