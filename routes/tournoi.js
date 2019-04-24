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
      let query = "SELECT * FROM `joueur`";

      db.query(query, (err, result) => {
          if (err) {
              res.redirect('/');
          }
          res.render('add-tournoi.ejs', {
              title: 'Mon tournoi de Tarot'
              ,players: result
              ,message: ''
          });
      });
    },
    addTournoi: (req, res) =>{
        let nb_tour = req.body.tour;
        let nb_table = req.body.table;
        let joueurs_nord = req.body.nord;
        let joueurs_sud = req.body.sud;
        let joueurs_est = req.body.est;
        let joueurs_ouest = req.body.ouest;
        let tmp = "";


        // Cas particulier ou on n'ajoute que une table
        if(nb_table == 1){
            console.log(joueurs_nord);
            for (let i=0; i<joueurs_nord.length; i++){
                tmp += joueurs_nord[i];
            }
            joueurs_nord = Array(1);
            joueurs_nord[0]=tmp;
            tmp="";
        }

        if(nb_table == 1){
            for (let i=0; i<joueurs_sud.length; i++){
                tmp += joueurs_sud[i];
            }
            joueurs_sud = Array(1);
            joueurs_sud[0]=tmp;
            tmp="";
        }

        if(nb_table == 1){
            for (let i=0; i<joueurs_est.length; i++){
                tmp += joueurs_est[i];
            }
            joueurs_est = Array(1);
            joueurs_est[0]=tmp;
            tmp="";
        }

        if(nb_table == 1){
            for (let i=0; i<joueurs_ouest.length; i++){
                tmp += joueurs_ouest[i];
            }
            joueurs_ouest = Array(1);
            joueurs_ouest[0]=tmp;
            tmp="";
        }

        // Création d'un tournoi
        let queryCreationTournoi = "INSERT INTO `tournoi` (tour,score) VALUES('"+nb_tour+"', '" + 0 +"')";

        db.query(queryCreationTournoi, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            id_tournoi = result.insertId;
            ajoutNord(id_tournoi);
            ajoutSud(id_tournoi);
            ajoutEst(id_tournoi);
            ajoutOuest(id_tournoi);
        });

        // Ajout des joueurs Nord
        function ajoutNord(id_tournoi){
            console.log(joueurs_nord);
            for (let i=0; i<joueurs_nord.length; i++){
                nom_prenom_nord = joueurs_nord[i].split(' ');
                let queryAjoutJoueurNord = "INSERT INTO `joueur` (nom, prenom, score, classement, id_tournoi) VALUES ('"+nom_prenom_nord[0]+"' , '"+nom_prenom_nord[1]+"','"+0 +"', '"+ 0 + "' , '"+id_tournoi+"')";

                db.query(queryAjoutJoueurNord, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    joueurs_nord[i] = result.insertId;
                });
            }
        }

        // Ajout des joueurs Sud
        function ajoutSud(id_tournoi){
            for (let i=0; i<joueurs_sud.length; i++){
                nom_prenom_sud = joueurs_sud[i].split(' ');
                let queryAjoutJoueurSud = "INSERT INTO `joueur` (nom, prenom, score, classement, id_tournoi) VALUES ('"+nom_prenom_sud[0]+"' , '"+nom_prenom_sud[1]+"','"+0 +"', '"+ 0 + "' , '"+id_tournoi+"')";

                db.query(queryAjoutJoueurSud, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    joueurs_sud[i] = result.insertId;
                });
            }
        }

        // Ajout des joueurs Est
        function ajoutEst(id_tournoi){
            for (let i=0; i<joueurs_est.length; i++){
                nom_prenom_est = joueurs_est[i].split(' ');
                let queryAjoutJoueurEst = "INSERT INTO `joueur` (nom, prenom, score, classement, id_tournoi) VALUES ('"+nom_prenom_est[0]+"' , '"+nom_prenom_est[1]+"','"+0 +"', '"+ 0 + "' , '"+id_tournoi+"')";

                db.query(queryAjoutJoueurEst, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    joueurs_est[i] = result.insertId;
                });
            }
        }

        // Ajout des joueurs Ouest
        function ajoutOuest(id_tournoi){
            for (let i=0; i<joueurs_ouest.length; i++){
                nom_prenom_ouest = joueurs_ouest[i].split(' ');
                let queryAjoutJoueurOuest = "INSERT INTO `joueur` (nom, prenom, score, classement, id_tournoi) VALUES ('"+nom_prenom_ouest[0]+"' , '"+nom_prenom_ouest[1]+"','"+0 +"', '"+ 0 + "' , '"+id_tournoi+"')";

                db.query(queryAjoutJoueurOuest, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    joueurs_ouest[i] = result.insertId;
                });
            }
        }

        // Création des tables
        setTimeout(function(){
            for (let i=0; i<nb_table; i++){
                let queryCreationTable = "INSERT INTO `table`(somme_point, nord, sud, est, ouest, id_tournoi) VALUES("+0+", "+joueurs_nord[i]+" , "+joueurs_sud[i]+" , "+joueurs_est[i]+" , "+joueurs_ouest[i]+" , "+id_tournoi+" )";

                db.query(queryCreationTable, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }

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
                });
            }
        }, 500);
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

        db.query(queryTournoiEnCours, (err, result) => {
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
