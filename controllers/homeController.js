exports.index = (req, res) => {
    res.json(req.user);
    console.log(req.user);
}