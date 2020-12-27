const { user } = require('../models/database');

exports.index = (req, res) => {
    res.render('register');
}

exports.registerAction = (req, res) => {
    user.register(new user(req.body), req.body.password, (error) => {
        if(error) {
            console.log(error);
            return;
        } else {
            res.redirect('/');
        }
    });
}