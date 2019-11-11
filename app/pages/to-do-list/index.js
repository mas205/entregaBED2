const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('to-do-list', {
        tasks: ['Mi primer tarea', 'Mi segunda tarea'],
    });
});

module.exports = router;