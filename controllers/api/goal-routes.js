const router = require('express').Router();
// include the user model to bring in user_id
const { Goals, User } = require('../../models');

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

