var Transaction = require ('../models/Transaction')

module.exports = {
  all: function(req, res) {
    Transaction.find()
    .populate('booklist')
    .then(data=>{
      res.status(200).json({
        message:'list of transaction:',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  },
  create: function(req, res) {
    console.log(req.body.book1)
    console.log(req.body.book2)
    let obj = {
      memberid: req.body.memberid,
      days: req.body.days,
      price: req.body.price,
      booklist: [req.body.book1, req.body.book2]
    }
    // obj.price += booklist.length*15000
    var transaction = new Transaction(obj);
    transaction.save(function (err, result) {
      if (err) {
        res.send({err: err})
      } else {
        res.send(result)
      }
      res.send(result)
    })
  },
  update: function(req, res) {
    let target = {
      _id: req.params.id
    }
    let obj = {
      memberid: req.body.memberid,
      days: req.body.days,
      price: req.body.price,
      booklist: [req.body.book1, req.body.book2]
    }
    Transaction.findOneAndUpdate(target, {
      $set: obj
    }, function(err, result) {
      if (err) {
        res.send({err: err})
      }
      res.send(result)
    })
  },
  delete: function(req, res) {
    let target = {
      _id: req.params.id
    }
    Transaction.remove(target, function (err, result) {
      if (err) {
        res.send({err: err})
      }
      res.send(result)
    })
  }
}

