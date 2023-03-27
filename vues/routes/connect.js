var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('index', {message:'Test'});
});


router.post( '/', function(req, res, next){

    if(req.body.emailConnexion != undefined){

        fetch('http://localhost:8081/users/' + req.body.emailConnexion).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data)
            if (data[0] != undefined && data[0].motDePasse == req.body.pwdConnexion){
                console.log("ok")
                req.session.key = req.body.pwdConnexion
                req.session.connected = true;
                res.render('index');
            } else {
                res.render('connect', {title: "Sport Track", message: 'Adresse mail ou mot de passe incorrect'});
            }
        })

    } 
    
    /*else {
        var userData = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            dateNaissance: req.body.dateNaissance,
            sexe: req.body.sexe,
            taille: req.body.poids,
            poids: req.body.taille,
            email: req.body.emailCreation,
            motDePasse: req.body.passwordCreation
        }

        fetch('http://localhost:8081/users/', {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          
            //make sure to serialize your JSON body
            body: JSON.stringify({
                nom: req.body.nom,
                prenom: req.body.prenom,
                dateNaissance: req.body.dateNaissance,
                sexe: req.body.sexe,
                taille: req.body.taille,
                poids: req.body.poids,
                email: req.body.emailCreation,
                motDePasse: req.body.passwordCreation
            })
          }).then((ret) => {
            while(ret.body.stream == undefined) {

            }
            console.log(ret)
            ret.json().then(data => {
                if(ret != "User added successfully\n"){
                    res.render("connect", {message: data.error})
                } else {
                    req.session.key = userData.email;
                    req.session.connected = true;
                    res.render('index');
                }
            })
          });
    }
    */
});

module.exports = router;
