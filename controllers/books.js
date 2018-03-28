const Book = require ('../models/Book')

module.exports = {
  all: function(req, res) {
    Book.find(function (err, books) {
      if (err) {
        res.send({err: err})
      }
      res.send(books)
    })
  },
  create: function(req, res) {
    let obj = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }
    var book = new Book(obj);
    console.log(book)
    book.save(function (err, result) {
      if (err) {
        res.send({err: err})
      }
      res.send(result)
    });
  },
  update: function(req, res) {
    let target = {
      _id:req.params.id
    }
    let obj = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }
    Book.update(target, {
      $set: obj
    }, function(err, result) {
      if (err) {
        res.send({err: err})
      }
      res.send(result)
    });
  },
  delete: function(req, res) {
    let target = {
      _id:req.params.id
    }
    Book.remove(target, function (err, result) {
      if (err) {
        res.send({err: err})
      }
      res.send(result)
    });
  }
}
