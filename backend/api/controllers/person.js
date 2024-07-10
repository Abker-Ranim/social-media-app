const Person = require("../models/person");
const mongoose = require("mongoose");

exports.person_get_all = (req, res, next) => {
    Person.find()
      .select("firstname lastname email password_id")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          person: docs.map(doc => {
            return {
              firstname:doc.firstname,
              lastname:doc.lastname,
              email:doc.email,
              password:doc.password,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:5000/person/" + doc._id
              }
            };
          })
        };
  
        res.status(200).json(response);
  
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

  exports.person_create = (req, res, next) => {
    const person = new Person({
      _id: new mongoose.Types.ObjectId(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password:req.body.password
  
  
    });
    person
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created person successfully",
          createdperson: {
            firstname: result.firstname,
            lastname: result.lastname,
            email: result.email,
            password:result.password,
  
            _id: result._id,
            request: {
              type: 'GET',
              url: "http://localhost:5000/person/" + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };


  /*
router.get("/:personId", (req, res, next) => {
  const id = req.params.personId;
  Person.findById(id)
    .select('name  _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          person: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/person'
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

  router.patch("/:persontId", (req, res, next) => {
    const id = req.params.persontId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Person.updateOps({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Person updated',
            request: {
                type: 'GET',
                url: 'http://localhost:5000/person/' + id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
router.delete('/:personId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted person!'
    });
});
*/