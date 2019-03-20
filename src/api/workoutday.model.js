const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Workout
let WorkoutDay = new Schema({
    workout_name: {
        type: String
    },
    workout_created_date: {
        type: Date
    },
},{
    collection: 'workout'
});

module.exports = mongoose.model('WorkoutDay', WorkoutDay);