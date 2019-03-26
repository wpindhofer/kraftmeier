const express = require('express');
const exerciseRoutes = express.Router();


// Require Workout model in our routes module
let Exercise = require('./exercise.model');
let logger = require('../mylogger').logger;

// Defined store route
exerciseRoutes.route('/add').post(function (req, res) {
    logger.debug("exercise Routes - Add");
    let exercise = new Exercise(req.body);
    exercise.save()
        .then(exercise => {
            res.status(200).json({'exercise': 'exercise is added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save exercise to database");
        });
});

// Defined get data(index or listing) route
exerciseRoutes.route('/').get(function (req, res) {
    logger.debug("Querying all exercises");
    Exercise.find(function (err, exercises) {
        if (err) {
            logger.error(err);
        } else {
            logger.debug("Exercises:" + exercises);
            res.json(exercises);
        }
    });
});

// Defined edit route
exerciseRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Exercise.findById(id, function (err, exercise) {
        res.json(exercise);
    });
});

//  Defined update route
exerciseRoutes.route('/update/:id').post(function (req, res) {
    Exercise.findById(req.params.id, function (err, exercise) {
        if (!exercise)
            res.status(404).send("Exercise data is not found");
        else {
            exercise.exercise_name = req.body.exercise_name;
            exercise.exercise_desc = req.body.exercise_desc;
            exercise.save().then(exercise => {
                res.json('Exercise update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update exercise in database");
                });
        }
    });
});

// Defined delete | remove | destroy route
exerciseRoutes.route('/delete/:id').get(function (req, res) {
    const _id = req.params.id;
    logger.debug("Route for delete exercise found - id: "+req.params.id);
    Exercise.findByIdAndRemove({_id: req.params.id}, function (err, exercise) {
        if (err) res.json(err);
        else res.json(exercise);
    });
});

module.exports = exerciseRoutes;