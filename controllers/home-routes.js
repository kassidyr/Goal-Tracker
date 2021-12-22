const router = require('express').Router();
const { Goals, Log, User } = require('../models');
// const sequelize = require('../config/connection');
// // // Import the custom middleware
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('homepage', {
        loggedIn: req.session.loggedIn
      });
});

router.get('/login', (req, res) => {
    // check for a session and redirect to the homepage if one exists
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/goals/:id', (req, res) => {
    Goals.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'objective',
        'hoursEstimate',
        'created_at',
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
        if (!dbGoalData) {
          res.status(404).json({ message: 'No goal found with this id' });
          return;
        }
  
        // serialize the data
        const goal = dbGoalData.get({ plain: true });
  
        // pass data to template
        res.render('single-post', { 
            goal,
            loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
