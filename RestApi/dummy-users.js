var shortid = require('shortid');

let users = [
    {
        id: shortid.generate(),
        email: 'test@gmail.com',
        password: '123456789',
        role: 'admin',
    },
    {
        id: shortid.generate(),
        email: 'test2@hotmail.com',
        password: 'test1234',
        role: 'admin',
    },
];

module.exports = { users };
