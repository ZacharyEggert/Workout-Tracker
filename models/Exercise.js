const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EXERCISE_TYPES = [];
const STOPWATCH_REGEX = /[0-9]+(\:[0-9][0-9])?(\:[0-9][0-9])?\.?[0-9]?[0-9]?/;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Exercise Name Required',
    },
    type: {
        type: String,
        trim: true,
        enum: EXERCISE_TYPES,
    },
    weight: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
