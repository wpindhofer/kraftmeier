const express = require('express');
const workoutRoutes = express.Router();


// Require Workout model in our routes module
let Workout = require('./workoutplan.model');
let logger = require('./mylogger').logger;

// Defined store route
workoutRoutes.route('/add').post(function (req, res) {
    logger.debug("workout Routes - Add");
    let workout = new Workout(req.body);
    workout.save()
        .then(workout => {
            res.status(200).json({'workout': 'workout is added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save workout to database");
        });
});

// Defined get data(index or listing) route
workoutRoutes.route('/').get(function (req, res) {
    logger.debug("Route for index found");
    Workout.find(function (err, workouts) {
        if (err) {
            logger.error(err);
        } else {
            logger.debug("Workouts:" + workouts);
            res.json(workouts);
        }
    });
});

// Defined edit route
workoutRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Workout.findById(id, function (err, workout) {
        res.json(workout);
    });
});

//  Defined update route
workoutRoutes.route('/update/:id').post(function (req, res) {
    Workout.findById(req.params.id, function (err, workout) {
        if (!workout)
            res.status(404).send("Workout data is not found");
        else {
            workout.workout_name = req.body.workout_name;
            workout.workout_created_date = req.body.workout_created_date;

            workout.save().then(workout => {
                res.json('Workout update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
workoutRoutes.route('/delete/:id').get(function (req, res) {
    const _id = req.params.id;
    logger.debug("Route for delete workout found - id: "+req.params.id);
    Workout.findByIdAndRemove({_id: req.params.id}, function (err, workout) {
        if (err) res.json(err);
        else res.json(workout);
    });
});

module.exports = workoutRoutes;