const router = require('express').Router();
// include the user model to bring in user_id
const { Goals, User, Log } = require('../../models');
// const sequelize = require('../../config/connection');
// const req = require('express/lib/request');

// get all goals
router.get('/', (req, res) => {
    Goals.findAll({
        attributes:
            [
                'id',
                'objective',
                'hoursEstimate',
                'created_at'
            ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Log,
                attributes: ['id', 'hoursCompleted', 'goal_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get one goal
router.get('/:id', (req, res) => {
    Goals.findOne({
        where: {
            id: req.params.id
    },
        attributes: 
        [
            'id',
            'objective',
            'hoursEstimate',
            'created_at'
        ],
        include:
        [
            {
                model: Log,
                attributes: ['id', 'hoursCompleted', 'goal_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbGoalData => {
            if (!dbGoalData) {
                res.status(404).json({ message: 'No goal found with this id' });
            return;
            }
            res.json(dbGoalData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Create a goal
router.post('/', (req, res) => {
    Goals.create({
        objective: req.body.objective,
        hoursEstimate: req.body.hoursEstimate,
        user_id: req.body.user_id
    })
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create a log
// PUT /api/goals/log
// Place before /:id PUT route so that Express.js won't think "log" is a valid parameter for /:id
// router.put('/log', (req, res) => {
//     Log.create({
//         hoursCompleted: req.body.hoursCompleted,
//         user_id: req.body.user_id,
//         goal_id: req.body.goal_id
//       })
//         .then(dbGoalData => res.json(dbGoalData))
//         .catch(err => res.json(err));
// });
// router.put('/log', (req, res) => {
//     // create the log
//     Log.create({
//         hoursCompleted: req.body.hoursCompleted,
//         user_id: req.body.user_id,
//         goals_id: req.body.goals_id
//     }).then(() => {
//         // then find the goal we just created a log for
//         return Goals.findOne({
//         where: {
//             id: req.body.goals_id
//         },
//         attributes: [
//             'id',
//             'objective',
//             'hoursEstimate',
//             'created_at',
//             // use raw MySQL aggregate function query to get a count of how many logs the goal has and return it under the name `logged_hours`
//             [
//             sequelize.literal('(SELECT COUNT(*) FROM log WHERE goals.id = log.goals_id)'),
//             'logged_hours'
//             ]
//         ]
//         })
//         .then(dbGoalData => res.json(dbGoalData))
//         .catch(err => {
//         console.log(err);
//         res.status(400).json(err);
//         });
//     });
// });

// get all logs
// router.get('/log', (req, res) => {
//     Log.findAll({
//         attributes:
//             [
//                 'hoursCompleted',
//                 'created_at'
//             ],
//         order: [['created_at', 'DESC']],
//     })
//     .then(dbGoalData => res.json(dbGoalData))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// Update a goal
router.put('/:id', (req, res) => {
    Goals.update(
        {
            objective: req.body.objective,
            hoursEstimate: req.body.hoursEstimate
        },
        {
            where: {
            id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No goal found with this id' });
            return;
        }
        res.json(dbPostData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a goal
router.delete('/:id', (req, res) => {
    Goals.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbGoalData => {
        if (!dbGoalData) {
            res.status(404).json({ message: 'No goal found with this id' });
            return;
        }
        res.json(dbGoalData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;