exports.index = (req, res) => {
    if(!req.user) {
        res.redirect('/login');
        return;
    }

    res.render("panel", {user: req.user});
};