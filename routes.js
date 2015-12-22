'use strict';

module.exports = function (stockRepo) {
    return {
        stock: {
            get(req, res, next) {
                const isbn = req.params.isbn;

                stockRepo.getByIsbn(isbn)
                    .then(result => {
                        if (!result) {
                            return next();
                        }
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        next(err);
                    });
            },

            post(req, res, next) {
                let payload = req.body;

                stockRepo.upsert(payload)
                    .then((result) => {
                        console.log('inserted', result);
                        res.status(201).json({ status: 'ok' });
                    })
                    .catch(err => {
                        next(err);
                    });
            }
        },
        errors: {
            notFound(req, res) {
                res.status(404).json({
                    status: 404,
                    msg: '404 error'
                });
            },

            internal(err, req, res, next) {
                console.log(err.stack);
                res.status(500).json({
                    status: 500,
                    msg: err.message
                });
            }
        }
    }
};