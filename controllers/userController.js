const { user } = require('../models/database');
const nodemail = require('../models/nodeMailer');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'variables.env'});

exports.login = (req, res) => {
    if(req.user) {
        res.redirect('/panel');
        return;
    }
    
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
        res.redirect('/panel');
    });
}

exports.register = (req, res) => {
    if(req.user) {
        res.redirect('/panel');
        return;
    }

    res.render('register');
}

exports.registerAction = async (req, res) => { 
    //req.body.username = req.body.email;
    //const existmail = await user.findOne({email:req.body.email});

    const name = req.body.fullname
    const email = req.body.email
    const password = req.body.password

    const token = jwt.sign({name, email, password}, process.env.ACTIVATE, {expiresIn:'20m'});

    nodemail.sendMail(req.body.email, 'Email de Confirmação!', `<h2>Copie o link a baixo e cole no seu navegador!</h2><p>${process.env.HTTP}/confirm/${token}</p>`);

    req.flash('success', 'Foi enviado um email de confirmação, copie e cole o link para confirmar sua conta!');
    res.redirect('/login');
}

exports.logoutAction = (req, res) => {
    req.logout();
    req.flash('sucess', 'Usuário desconectado com sucesso!');
    res.redirect('/');
}

exports.confirmAction = (req, res) => {
    const token = req.params.token;

    if(token) {
        jwt.verify(token, process.env.ACTIVATE, (err, decodedtoken) => {
            if(err) {
                req.flash('error', 'Sua chave de ativação está inválida ou expirou!');
                res.redirect('/');
            }
            const {name, email, password} = decodedtoken;
            const userData = {fullname: name, email, password}
            user.register(new user(userData), password, (error) => {
                if(error) {
                    console.log(error);
                    req.flash('error', 'Falha no registro, tente novamente mais tarde!');
                    res.redirect('/register');
                    return;
                } else {
                    const auth = user.authenticate();
        
                    auth(email, password, (error, result) => {
                        if(!result) {
                            req.flash('error', 'Falha no registro, tente novamente mais tarde!');
                            res.redirect('/register');
                            return;
                        }
                
                        //req.login(result, ()=>{});
                        req.flash('success', 'conta registrada com sucesso!');
                        res.redirect('/');
                    });
                }
            });
        });
    } else {
        req.flash('error', 'Não foi possível verificar a sua conta!');
        res.redirect('/');
    }

}