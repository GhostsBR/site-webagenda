const { user } = require('../models/database');

exports.login = (req, res) => {
    res.render('login');
};

exports.loginAction = (req, res) => {
    const auth = user.authenticate();

    auth(req.body.email, req.body.password, (error, result) => {
        if(!result) {
            req.flash('error', 'Falha no login, o email e/ou senha são inválidos!');
            res.redirect('/login');
            return;
        }

        req.login(result, ()=>{});
        req.flash('success', 'Login efetuado com sucesso!');
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
            req.flash('error', 'Falha no registro, tente novamente mais tarde!');
            res.redirect('/register');
            return;
        } else {
            const auth = user.authenticate();

            auth(req.body.email, req.body.password, (error, result) => {
                if(!result) {
                    req.flash('error', 'Falha no registro, tente novamente mais tarde!');
                    res.redirect('/register');
                    return;
                }
        
                req.login(result, ()=>{});
                req.flash('success', 'Usuário registrado com sucesso!');
                res.redirect('/');
            });
        }
    });  
}

exports.logoutAction = (req, res) => {
    req.logout();
    req.flash('sucess', 'Usuário desconectado com sucesso!');
    res.redirect('/');
}