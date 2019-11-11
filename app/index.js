const router = require('express').Router();
const todoListRouter = require('./pages/to-do-list');
const { appErrorHandler } = require('../middlewares/error-handler');

router.use('/to-do-list', todoListRouter);
router.use(appErrorHandler);

module.exports = router;