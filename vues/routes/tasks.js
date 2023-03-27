var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


  // Récupération de toutes les tâches
  router.get('/', async function (req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var tasksCollection = db.collection('tasks');
      var tasks = await tasksCollection.find().toArray();
      res.json(tasks);
      client.close();
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });

  // Récupération d'une tâche par son id
  router.get('/:id', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var tasksCollection = db.collection('tasks');
      var id = req.params.id;
      var task = await tasksCollection.findOne({ _id: ObjectId(id) });
      res.json(task);
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });

  // Ajout d'une tâche
  router.post('/', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var tasksCollection = db.collection('tasks');
      var newTask = req.body;//Peut être à changer en fonction du formulaire fait après
      var result = await tasksCollection.insertOne(newTask);
      res.json(result.ops[0]); // Renvoi du document ajouté avec l'id générée
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });


  // Modification d'une tâche par son id
  router.put('/:id', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var tasksCollection = db.collection('tasks');
      var id = req.params.id;
      var update = { $set: req.body }; //Peut être à changer en fonction du formulaire fait après
      var result = await tasksCollection.updateOne({ _id: ObjectId(id) }, update); 
      if (result.modifiedCount === 1) {
        res.json({ message: 'Tâche mis à jour avec succès' });
      } else {
        res.status(404).json({ message: 'Tâche non trouvée' });
      }
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });
  

  /**
   Peut être chiant à faire

  // Modification de plusieurs tâches
  router.put('/', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var tasksCollection = db.collection('tasks');
      var filter = req.body.filter; // Filtre à appliquer pour sélectionner les tâches à mettre à jour (encore une fois il pourrait venir à changer en fonction des vues)
      var update = { $set: req.body.update }; // Données à mettre à jour (même commentaire)
      var result = await tasksCollection.updateMany(filter, update);
      res.json({ message: `${result.modifiedCount} tâches ont été mis à jour` });
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });
  
 */

  // Suppression d'une tâche par identifiant
  router.delete('/:id', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var tasksCollection = db.collection('tasks');
      var id = req.params.id;
      var result = await tasksCollection.deleteOne({ _id: ObjectId(id) });
      if (result.deletedCount === 1) {
        res.json({ message: 'Tâche supprimée avec succès' });
      } else {
        res.status(404).json({ message: 'Tâche non trouvée' });
      }
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });

  //Suppression de toutes les tâches
  router.delete('/cleanAll', async function(req, res) {
    try {
      var client = await MongoClient.connect('mongodb://localhost:27017');
      var db = client.db('AgileZen');
      var tasksCollection = db.collection('tasks');
      var id = req.params.id;
      var result = await tasksCollection.deleteMany(); // Suppression de la tâche correspondant à l'ID
      res.json({ message: 'Tâches supprimées avec succès' });
      client.close();
    } catch(err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    }
  });
  

module.exports = router;