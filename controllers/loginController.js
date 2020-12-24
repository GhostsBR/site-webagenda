exports.index = (req, res) => {
    res.render('login');
};

exports.loginAction = (req, res) => {
    res.json(req.body);
}