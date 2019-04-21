const fs = require('fs');

module.exports = {
    listPlayerPage: (req, res) => {
        let query = "SELECT * FROM `joueur` ORDER BY id ASC";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('players.ejs', {
                title: 'Mon tournoi de Tarot'
                ,joueurs: result
            });
        });
    },
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: 'Mon tournoi de Tarot'
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
                    title: 'Mon tournoi de Tarot'
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
                title: 'Mon tournoi de Tarot'
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
            res.redirect('/players');
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
