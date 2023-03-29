var express = require('express');
var conn = require("../services/db");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


  // Récupération de tous les projets
  router.get('/', async function (req, res) {
    conn.query("SELECT * FROM employee", function (err, data, fields) {
      if(err) return next(new AppError(err))
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
  });

  // Ajout d'un projet
  router.post('/', async function(req, res) {
  });

  //Suppression de tous les projets
  router.delete('/', async function(req, res) {

  });  

module.exports = router;