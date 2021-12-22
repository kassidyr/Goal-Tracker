const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);

//collects all the endpoints and prefixes them with the path /api
router.use('/api', apiRoutes);

// if a request is made to an endpoint that doesn't exist, a 404 error will be received (RESTful API practice)
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
