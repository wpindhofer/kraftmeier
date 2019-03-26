const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Workout
let Exercise = new Schema({
    exercise_name: {
        type: String
    },
    exercise_desc: {
        type: String
    },
},{
    collection: 'exercise'
});

module.exports = mongoose.model('Exercise', Exercise);