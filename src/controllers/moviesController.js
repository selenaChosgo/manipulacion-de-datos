const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');
const { response } = require('express');

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        // TODO  
        res.render('moviesAdd.ejs');
    },
    create: function (req, res) {
        // TODO
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                length: req.body.length,
                awards: req.body.awards,
                release_date: req.body.release_date,
            })
            .then(movie => {
                res.redirect('/movies');
            })
            .catch(error => res.send(error));
        } else {
            res.send(errors);
        }
    },
    edit: function(req, res) {
        // TODO
        db.Movie.findByPk(req.params.id)
        .then(Movie => {
            res.render('moviesEdit', {
                Movie
            });
        })
        .catch(error => res.send(error));
    },
    update: function (req,res) {
        // TODO
        let errors = validationResult(req);

        if (errors.isEmpty()){
            db.Movie.update({
                title: req.body.title,
                rating: req.body.rating,
                length: req.body.length,
                awards: req.body.awards,
                release_date: req.body.release_date,
            },{
                where: {
                    id: req.params.id,
                }
            })
            .then(response => {
                if (response == 1) {
                    res.redirect('/movies');
                } else {
                    res.send('No se pudo actualizar');
                }
            })
            .catch(error => res.send(error));
        } else {
            
        }
    },
    delete: function (req, res) {
        // TODO
        db.Movie.findByPk(req.params.id)

        .then(Movie => {
            res.render('moviesDelete', {
                Movie
            });
        })
        .catch(error => res.send(error));
    },
    destroy: function (req, res) {
        // TODO
        db.Movie.destroy({
            where: {
                id: req.params.id,
        }})
        .then(response => {
            if (response == 1) {
                res.redirect('/movies');
            } else {
                res.send('No se pudo eliminar');
            }
        })
        .catch(error => res.send(error));
    }

}

module.exports = moviesController;