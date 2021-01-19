exports.index = (req, res) => {
    res.render('home');
    console.log(req.user);
}