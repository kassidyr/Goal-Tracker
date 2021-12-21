const router = require('express').Router();
const { Goal, Painting } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all goals for homepage
router.get('/', async (req, res) => {
  try {
    const dbGoalData = await Goal.findAll({
      include: [
        {
          model: Painting,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const goals = dbGoalData.map((goal) =>
      goal.get({ plain: true })
    );

    res.render('homepage', {
      goals,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one goal
// Use the custom middleware before allowing the user to access the goal
router.get('/goal/:id', withAuth, async (req, res) => {
  try {
    const dbGoalData = await Goal.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
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

// GET one painting
// Use the custom middleware before allowing the user to access the painting
router.get('/painting/:id', withAuth, async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });

    res.render('painting', { painting, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
