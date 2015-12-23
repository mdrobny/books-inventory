'use strict';

module.exports = function (stockRepo) {
    return {
        stock: {
            getAll(req, res, next) {
                stockRepo.getAll()
                    .then(result => {
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        next(err);
                    });
            },

            get(req, res, next) {
                const isbn = req.params.isbn;

                const returnHtml = req.headers.accept === 'html';

                stockRepo.getByIsbn(isbn)
                    .then(result => {
                        if (!result) {
                            return next();
                        }
                        if (returnHtml) {
                            const html = `<div class="stock-value">Count: ${result.count}</div>`;
                            res.status(200).send(html);
                        } else {
                            res.status(200).json(result);
                        }
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