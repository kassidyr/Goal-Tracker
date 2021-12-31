const router = require('express').Router();
const { Log, Goals } = require('../../models');

router.get('/', (req, res) => {
    Log.findAll({
        attributes:
            [
                'id',
                'hoursCompleted',
                'created_at'
            ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Goals,
                attributes: ['objective']
            }
        ]
    })
        .then(dbLogData => res.json(dbLogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    console.clear()
    console.log("addHours")
    console.log(req.session.user_id)
    Log.create({
        hoursCompleted: req.body.hoursCompleted,
        user_id: req.session.user_id,
        goal_id: req.body.goal_id
    })
        .then(dbLogData => {
            console.log(dbLogData)
            res.json(dbLogData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Log.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbLogData => {
            if (!dbLogData) {
                res.status(404).json({ message: 'No log found with this id' });
                return;
            }
            res.json(dbLogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;