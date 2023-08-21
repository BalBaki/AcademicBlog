var Sequelize = require('sequelize');
var ArticleModule = require('./models/article');
var UserModule = require('./models/user');
var { users } = require('./dummy-users');

//Db Connection String
//dbname,username,password
var sequelize = new Sequelize('AcademicBlog', 'baki', '123456789', {
    dialect: 'mssql',
    host: 'localhost',
    timezone: '+03:00',
    // define:{
    //     timestamps: false // zamanları kapatır.
    // }
});

//Db Connection Test
sequelize
    .authenticate()
    .then(() => {
        console.log('Db connected');
    })
    .catch((err) => {
        console.error('Not connected to db : ', err);
    });

let Article = ArticleModule(sequelize, Sequelize);
let User = UserModule(sequelize, Sequelize);

sequelize
    .sync()
    .then(() => {
        console.log('Tables created');
    })
    .then(() => {
        users.forEach((user) => {
            User.findOrCreate({
                where: {
                    email: user.email,
                },
                defaults: {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                },
            });
        });

        console.log('Dummy Users Created');
    })
    .catch(() => {
        console.log('Tables dont created');
    });

module.exports = {
    Article,
    User,
};
