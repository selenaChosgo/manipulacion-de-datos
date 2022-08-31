const { check } = require('express-validator');

module.exports = [
    check('title')
        .notEmpty().withMessage('El título es obligatorio'),
    check('rating')
        .notEmpty().withMessage('El rating es obligatorio'),
    check('awards')
        .notEmpty().withMessage('El awards es obligatorio'),   
    check('release_date')
        .notEmpty().withMessage('El release_date es obligatorio'),
]