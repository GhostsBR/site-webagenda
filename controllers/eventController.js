const { event } = require("../models/database")

exports.addEvent = (req, res) => {
  event.create(req.body), err => {
    if(err){
      return res.send({
        status: false,
        message: err
      })
    }
  }

  return res.send({
    status: true,
    message: "Event created with success!"
  })
}

