module.exports = {
    getHomePage: (req, res) => {
        res.render('index.ejs', {
            title: 'Mon tournoi de Tarot',
            message : ''
        });
    }
};

