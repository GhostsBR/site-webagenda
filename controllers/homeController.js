exports.index = (req, res) => {
    res.render('home');
    req.flash('sucess', 'Você será redirecionado para o login!');
}