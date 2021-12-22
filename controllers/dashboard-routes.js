const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Goals, User, Log } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
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

module.exports = router;