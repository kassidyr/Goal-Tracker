const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Goals, User, Log } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log(req.session)
    Goals.findAll({
        where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'objective',
        'hoursEstimate',
        'created_at'
      ],
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
      .then(dbGoalData => {
        // serialize data before passing to template
        const goals = dbGoalData.map(goals => goals.get({ plain: true }));
        res.render('dashboard', { goals, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Goals.findByPk(req.params.id, {
    attributes: [
      'id',
      'objective',
      'hoursEstimate',
      'created_at',
    ],
    include: [
      {
        model: Log,
        attributes: ['id', 'hoursCompleted', 'goals_id', 'user_id', 'created_at'],
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
      if (dbGoalData) {
        const post = dbGoalData.get({ plain: true });
        
        res.render('edit-goal', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;