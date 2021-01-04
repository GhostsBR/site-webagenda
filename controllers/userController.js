const { user } = require('../models/database');

exports.login = (req, res) => {
    res.render('login');
};

exports.loginAction = (req, res) => {
    const auth = user.authenticate();

    auth(req.body.email, req.body.password, (error, result) => {
        if(!result) {
            console.log("falha!");
            return;
        }

        req.login(result, ()=>{});
        console.log("sucesso!");
        res.redirect('/');
    });
}

exports.register = (req, res) => {
    res.render('register');
}

exports.registerAction = (req, res) => { 
    //req.body.username = req.body.email;
    user.register(new user(req.body), req.body.password, (error) => {
        if(error) {
            console.log(error);
            return;
        } else {
            const auth = user.authenticate();

            auth(req.body.email, req.body.password, (error, result) => {
                if(!result) {
                    console.log("falha!");
                    return;
                }
        
                req.login(result, ()=>{});
                console.log("sucesso!");
                res.redirect('/');
            });
        }
    });  
}

exports.logoutAction = (req, res) => {
    req.logout();
    res.redirect('/');
}