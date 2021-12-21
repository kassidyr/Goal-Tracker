const router = require('express').Router();

const userRoutes = require('./user-routes');
const goalRoutes = require('./goal-routes');
const logRoutes = require('./log-routes');

router.use('/users', userRoutes);
router.use('/goals', goalRoutes);
router.use('/log', logRoutes);

module.exports = router;
