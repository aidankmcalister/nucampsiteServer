// const express = require("express");
// const Campsite = require("../models/campsite");
// const authenticate = require("../authenticate");
// const cors = require("./cors");

// const campsiteRouter = express.Router();

// campsiteRouter
//   .route("/")
//   .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Campsite.create(req.body)
//       .then((campsite) => {
//         console.log("Campsite Created ", campsite);
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(campsite);
//       })
//       .catch((err) => next(err));
//   })
//   .delete(
//     authenticate.verifyUser,
//     authenticate.verifyAdmin,
//     (req, res, next) => {
//       Campsite.deleteMany()
//         .then((response) => {
//           res.statusCode = 200;
//           res.setHeader("Content-Type", "application/json");
//           res.json(response);
//         })
//         .catch((err) => next(err));
//     }
//   );

// campsiteRouter
//   .route("/:campsiteId")
//   .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Campsite.findByIdAndUpdate(
//       req.params.campsiteId,
//       { $set: req.body },
//       { new: true }
//     )
//       .then((campsite) => {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(campsite);
//       })
//       .catch((err) => next(err));
//   })
//   .delete(
//     authenticate.verifyUser,
//     authenticate.verifyAdmin,
//     (req, res, next) => {
//       Campsite.findByIdAndDelete(req.params.campsiteId)
//         .then((response) => {
//           res.statusCode = 200;
//           res.setHeader("Content-Type", "application/json");
//           res.json(response);
//         })
//         .catch((err) => next(err));
//     }
//   );

// module.exports = campsiteRouter;

const express = require("express");
const Campsite = require("../models/campsite");
const authenticate = require("../authenticate");
const cors = require("./cors");

const campsiteRouter = express.Router();

campsiteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {})
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Campsite.create(req.body)
        .then((campsite) => {
          console.log("Campsite Created ", campsite);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(campsite);
        })
        .catch((err) => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {}
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Campsite.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );

campsiteRouter
  .route("/:campsiteId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {})
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {}
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {}
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {}
  );

module.exports = campsiteRouter;
