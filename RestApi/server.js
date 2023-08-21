const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
var shortid = require('shortid');
var { Article, User } = require('./db');

var app = express();

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3005;
app.listen(port, () => {
    console.log('Server Work at ' + port + '. port');
});

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,' +
            'Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
    );

    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware

    next();
});

const folder = './pdfs/';

//Get all Articles
app.get('/articles', function (request, response) {
    Article.findAll()
        .then((articles) => {
            articles.sort((a, b) => (a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0));
            response.json(articles.length > 0 ? articles : []);
        })
        .catch((error) => response.json(error));
});

//Save new article
app.post('/article', function (request, response) {
    Article.findAll({
        where: { [Op.or]: [{ title: request.body.title }, { fileName: request.files.file.name }] },
    })
        .then((articles) => {
            let error = {};

            articles.forEach((article) => {
                if (request.body.title === article.dataValues.title) {
                    error.title = 'i6jtd';
                }

                if (request.files.file.name === article.dataValues.fileName) {
                    error.fileName = 'h5dcj';
                }
            });

            if (articles.length > 0) {
                throw error;
            }

            return Article.findOrCreate({
                where: { [Op.or]: [{ title: request.body.title }, { fileName: request.files.file.name }] },
                defaults: {
                    id: shortid.generate(),
                    title: request.body.title,
                    fileName: request.files.file.name,
                    explanation: request.body.explanation,
                },
            });
        })
        .then((article) => {
            let [result, isCreated] = article;

            if (isCreated) {
                let sampleFile = request.files.file;
                let uploadPath = folder + sampleFile.name;

                sampleFile.mv(uploadPath, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            }

            return Promise.resolve();
        })
        .then(() => {
            response.json({
                created: true,
            });
        })
        .catch((err) =>
            response.json({
                created: false,
                error: err,
            })
        );
});

//delete article
app.delete('/deleteArcticle/:id', function (request, response) {
    Article.findOne({
        where: { id: request.params.id },
    })
        .then((article) => {
            let direct = folder + article.dataValues.fileName;

            if (fs.existsSync(direct)) {
                fs.unlink(direct, function (error) {
                    if (error) {
                        throw error;
                    }
                });
            }

            return Article.destroy({
                where: { id: article.dataValues.id },
            });
        })
        .then(() => {
            response.json({
                deleted: true,
            });
        })
        .catch((error) =>
            response.json({
                deleted: false,
                error,
            })
        );
});

//update article
app.put('/changeArticle/:id', function (request, response) {
    Article.findAll({
        where: {
            [Op.not]: [{ id: request.params.id }],
            [Op.or]: [
                { title: request.body.title },
                ...(request.files ? [{ fileName: request.files.file.name }] : []),
            ],
        },
    })
        .then((articles) => {
            let error = {};

            articles.forEach((article) => {
                if (request.body.title && request.body.title === article.dataValues.title) {
                    error.title = 'i6jtd';
                }

                if (request.files && request.files.file.name === article.dataValues.fileName) {
                    error.fileName = 'h5dcj';
                }
            });

            if (articles.length > 0) {
                throw error;
            }

            return Article.update(
                {
                    title: request.body.title,
                    explanation: request.body.explanation,
                },
                {
                    where: { id: request.params.id },
                    returning: true,
                }
            );
        })
        .then(([updatedRow, result]) => {
            const article = result[0].dataValues;

            if (request.files) {
                let sampleFile = request.files.file;

                if (fs.existsSync(folder + article.fileName)) {
                    fs.unlink(folder + article.fileName, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                }

                sampleFile.mv(folder + sampleFile.name, function (err) {
                    if (err) {
                        throw err;
                    }
                });

                return Article.update(
                    {
                        fileName: sampleFile.name,
                    },
                    {
                        where: { id: request.params.id },
                    }
                );
            }

            return Promise.resolve();
        })
        .then(() => {
            response.json({ updated: true });
        })
        .catch((error) =>
            response.json({
                updated: false,
                error,
            })
        );
});

// check article if exists
app.post('/checkArticle', function (request, response) {
    Article.findOne({
        where: request.body,
    }).then((article) => {
        response.json({ isValid: article ? false : true });
    });
});

app.post('/login', (request, response) => {
    User.findOne({
        where: { email: request.body.email, password: request.body.password },
    })
        .then((user) => {
            response.json({
                login: user ? true : false,
                ...(user && { token: jwt.sign({ id: user.id, email: user.email, role: user.role }, 'shhhhh') }),
            });
        })
        .catch((error) => {
            response.json({ error });
        });
});

app.post('/verify', (request, response) => {
    jwt.verify(request.body.token, 'shhhhh', (err, decoded) => {
        response.json({ valid: err ? false : true });
    });
});

app.get('/file', (request, response) => {
    if (fs.existsSync(folder + request.query.name)) {
        response.sendFile(folder + request.query.name, { root: '.' });
    } else {
        response.json('No File');
    }
});
