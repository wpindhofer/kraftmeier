const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Workout
let Workout = new Schema({
    workout_name: {
        type: String
    },
    workout_created_date: {
        type: Date
    },
},{
    collection: 'workout'
});

module.exports = mongoose.model('Workout', Workout);