const express = require('express');
const workoutDayRoutes = express.Router();


// Require Workout model in our routes module
let WorkoutDay = require('./workoutDay.model');
let logger = require('../mylogger').logger;

// Defined store route
workoutDayRoutes.route('/add').post(function (req, res) {
    logger.debug("workoutDay Routes - Add");
    let workoutDay = new WorkoutDay(req.body);
    workoutDay.save()
        .then(workoutDay => {
            res.status(200).json({'workoutDay': 'workoutDay is added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save workoutDay to database");
        });
});

// Defined get data(index or listing) route
workoutDayRoutes.route('/:workoutId').get(function (req, res) {
    let workoutId = req.params.workoutId;
    logger.debug("Querying for Workdays for workout:" + workoutId);
    WorkoutDay.find({ workout: workoutId}, function (err, workoutDays) {
        if (err) {
            logger.error(err);
        } else {
            logger.debug("WorkoutDays:" + workoutDays);
            res.json(workoutDays);
        }
    });
});

// Defined edit route
workoutDayRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    WorkoutDay.findById(id, function (err, workoutDay) {
        res.json(workoutDay);
    });
});

// Get workoutDay with populated exercises
workoutDayRoutes.route('/getPopulated/:id').get(function (req, res) {
    let id = req.params.id;
    WorkoutDay.findById(id).populate('exercises').exec(function (err, workoutDay) {
        logger.debug("populated Workday found");
        res.json(workoutDay);
    });
});

//  Defined update route
workoutDayRoutes.route('/update/:id').post(function (req, res) {
    WorkoutDay.findById(req.params.id, function (err, workoutDay) {
        if (!workoutDay)
            res.status(404).send("WorkoutDay data is not found");
        else {
            workoutDay.workoutDay_name = req.body.workoutDay_name;
            workoutDay.save().then(workoutDay => {
                res.json('WorkoutDay update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update workoutDay in database");
                });
        }
    });
});

// Defined delete | remove | destroy route
workoutDayRoutes.route('/delete/:id').get(function (req, res) {
    const _id = req.params.id;
    logger.debug("Route for delete workoutDay found - id: "+req.params.id);
    WorkoutDay.findByIdAndRemove({_id: req.params.id}, function (err, workoutDay) {
        if (err) res.json(err);
        else res.json(workoutDay);
    });
});

module.exports = workoutDayRoutes;