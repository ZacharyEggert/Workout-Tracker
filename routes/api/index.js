const router = require('express').Router();
const { Mongoose } = require('mongoose');
const { Workout, Exercise } = require('../../models');
const { log } = require('../../util/Log');

router.get('/workouts', (req, res) => {
    log(req.body);
    try {
        Workout.find({})
            .populate('exercises')
            .then((data) => {
                dataWithTotal = data.map(workout => {
                    const ex = [...workout.exercises]
                    // console.log(ex);
                    const totalDuration = ex.reduce((acc, cv) => {return (acc + cv.duration);}, 0, 0);
                    workout._doc.totalDuration = totalDuration;
                    return workout;
                })

                // console.log(dataWithTotal);
                
                res.json(dataWithTotal);

                log(dataWithTotal);
            });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/workouts', (req, res) => {
    log({ '/workouts': req.body });
    try {
        Workout.create({}).then((workout) => {
            res.json(workout);
            log(workout);
            return;
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.put('/workouts/:id', (req, res) => {
    log(req.body);
    try {
        const { id } = req.params;

        Exercise.create({ ...req.body }).then(({ _id }) => {
            Workout.findByIdAndUpdate(
                id,
                { $push: { exercises: _id } },
                { new: true }
            ).then((workout) => {
                log(workout);
                res.json(workout);
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/workouts/range', (req, res) => {
    // log(req.body);
    const range = 7;
    try {
        Workout.find({})
            .populate('exercises')
            .then((data) => {
                if (data.length > range){
                    data = data.slice(data.length - range, data.length);
                }

                dataWithTotal = data.map(workout => {
                    const ex = [...workout.exercises]
                    // console.log(ex);
                    const totalDuration = ex.reduce((acc, cv) => {return (acc + cv.duration);}, 0, 0);
                    workout._doc.totalDuration = totalDuration;
                    return workout;
                })

                // console.log(dataWithTotal);
                
                res.json(dataWithTotal);

                log(dataWithTotal);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

/** end of routes */

module.exports = router;
