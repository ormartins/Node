const fs = require('fs');

module.exports = {

    afficheTournois: (req,res) => {
        let query = "SELECT * FROM `tournoi` ORDER BY id ASC";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('tournoi.ejs', {
                title: 'Mon tournoi de Tarot'
                ,tournois: result
            });
        });
    },
    addTournoiPage: (req,res) => {
        res.render('add-tournoi.ejs', {
            title: 'Mon tournoi de Tarot'
            ,message: ''
        });
    },
    addTournoi: (req, res) =>{
        let message = '';
        let nb_tour = req.body.tour;

        let query = "INSERT INTO `tournoi` (tour,score) VALUES('"+nb_tour+"', '" + 0 +"')";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/tournois');
        });

    },
    deleteTournoi: (req, res) => {
        let tournoiId = req.params.id;
        let query = 'DELETE FROM tournoi WHERE id = "' + tournoiId + '"';

                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/tournois');
                });
    },
    afficheTournoi: (req,res) => {
        let tournoiId = req.params.id;

        let queryTournoiEnCours = "SELECT encours FROM `tournoi` WHERE id ="+tournoiId;
        let queryJoeurs = "SELECT * FROM `joueur`";

        db.queryTournoiEnCours(queryTournoiEnCours, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                if( row.encours == 0) {
                    res.render('tournoi-creation.ejs', {
                        title : 'Mon tournoi de Tarot',
                        tournoiId : tournoiId,

                    });
                } else {
                    res.send("<p>Le tournoi est déjà lancé</p>");
                }
            });
        });
    }

};