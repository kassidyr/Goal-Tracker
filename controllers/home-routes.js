const router = require('express').Router();
const { Goals, Log } = require('../models');
const sequelize = require('../config/connection');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all goals for homepage
router.get('/', async (req, res) => {
  try {
    const dbGoalData = await Goals.findAll({
      include: [
        {
          model: Goals,
          attributes: [
            'objective',
            'hoursEstimate'
          ],
          model: Log,
          attributes: [
            'hoursCompleted',
            // include the total log count for the post
            // [sequelize.literal('(SELECT COUNT(*) FROM log WHERE post.id = log.post_id)'), 'total_Hours']
          ]
        },
      ],
    });

    const userGoals = dbGoalData.map((goals) =>
      goals.get({ plain: true })
    );

    res.render('homepage', {
      userGoals,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one goal
// Use the custom middleware before allowing the user to access the gallery
router.get('/goals/:id', withAuth, async (req, res) => {
  try {
    const dbGoalData = await Goals.findByPk(req.params.id, {
      include: [
        {
          model: Log,
          order: [['created_at', 'DESC']],
          attributes: [
            'id',
            'hoursCompleted',
            'created_at',
            // include the total log count for the post
            [sequelize.literal('(SELECT COUNT(*) FROM log WHERE post.id = log.post_id)'), 'total_Hours']
          ],
        },
      ],
    });

    const goal = dbGoalData.get({ plain: true });
    res.render('goal', { goal, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render("login")
})

module.exports = router;
