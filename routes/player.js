const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: 'Welcome to Socka | Add a new player'
            ,message: ''
        });
    },
    addPlayer: (req, res) => {

        let message = '';
        let prenom = req.body.first_name;
        let nom = req.body.last_name

        let query = "SELECT * FROM `joueur` WHERE prenom = '" + prenom + "' AND nom = '" + nom + "'";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Le joueur existe déjà';
                res.render('add-player.ejs', {
                    message,
                    title: 'Welcome to Socka | Add a new player'
                });
            } else {
                        // send the player's details to the database
                        let query = "INSERT INTO `joueur` (prenom, nom, score, classement) VALUES ('" +
                            prenom + "', '" + nom + "', '" + 0 + "', '" + 0 +"')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                }
        });
    },
    editPlayerPage: (req, res) => {
        let playerId = req.params.id;
        let query = "SELECT * FROM `joueur` WHERE id = '" + playerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: 'Edit  Player'
                ,joueur: result[0]
                ,message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let playerId = req.params.id;
        let prenom = req.body.first_name;
        let nom = req.body.last_name;

        let query = "UPDATE `joueur` SET `prenom` = '" + prenom + "', `nom` = '" + nom + "' WHERE `joueur`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePlayer: (req, res) => {
        let playerId = req.params.id;
        let deleteUserQuery = 'DELETE FROM joueur WHERE id = "' + playerId + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    }
};
