const appErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.render('error', {
        msg: 'Ocurrió un error inesperado. Intente nuevamente',
    });
};

const apiErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.json({
        msg: 'Internal Server Error',
    });
};

module.exports = {
    appErrorHandler,
    apiErrorHandler,
};