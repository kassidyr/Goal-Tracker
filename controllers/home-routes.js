const router = require('express').Router();
const { Goals, Log, User } = require('../models');
const sequelize = require('../config/connection');
// // Import the custom middleware
const withAuth = require('../utils/auth');

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

module.exports = router;
