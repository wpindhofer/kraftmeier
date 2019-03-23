const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Workout
let WorkoutDay = new Schema({
    workoutDay_name: {
        type: String
    },
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout'
    }
},{
    collection: 'workoutDay'
});

module.exports = mongoose.model('WorkoutDay', WorkoutDay);