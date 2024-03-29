// const mongoose = require("mongoose");
// const passport = require("passport");
// const uploadRouter = require("./routes/uploadRouter");
// const authenticate = require("./authenticate");
// const config = require("./config");

// app.use(passport.initialize());
// app.use(passport.session());
// app.use("/imageUpload", uploadRouter);

// function auth(req, res, next) {
//   console.log(req.user);

//   if (!req.user) {
//     const err = new Error("You are not authenticated!");
//     err.status = 401;
//     return next(err);
//   } else {
//     return next();
//   }
// }

// const config = require("./config");
// const connect = mongoose.connect(url, {
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// connect.then(
//   () => console.log("Connected correctly to server"),
//   (err) => console.log(err)
// );

// // app.js
// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// // Importing the new routers
// const campsiteRouter = require("./routes/campsiteRouter");
// // const promotionRouter = require("./routes/promotionRouter");
// // const partnerRouter = require("./routes/partnerRouter");

// var app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// // Using the new routers
// app.use("/campsites", campsiteRouter);
// // app.use("/promotions", promotionRouter);
// // app.use("/partners", partnerRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// // Secure traffic only
// app.all("*", (req, res, next) => {
//   if (req.secure) {
//     return next();
//   } else {
//     console.log(
//       `Redirecting to: https://${req.hostname}:${app.get("secPort")}${req.url}`
//     );
//     res.redirect(
//       301,
//       `https://${req.hostname}:${app.get("secPort")}${req.url}`
//     );
//   }
// });

// function auth(req, res, next) {
//   console.log(req.headers);
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     const err = new Error("You are not authenticated!");
//     res.setHeader("WWW-Authenticate", "Basic");
//     err.status = 401;
//     return next(err);
//   }

//   const auth = Buffer.from(authHeader.split(" ")[1], "base64")
//     .toString()
//     .split(":");
//   const user = auth[0];
//   const pass = auth[1];
//   if (user === "admin" && pass === "password") {
//     return next(); // authorized
//   } else {
//     const err = new Error("You are not authenticated!");
//     res.setHeader("WWW-Authenticate", "Basic");
//     err.status = 401;
//     return next(err);
//   }
// }

// app.use(auth);

// const session = require("express-session");
// const FileStore = require("session-file-store")(session);

// app.use(cookieParser("12345-67890-09876-54321"));

// app.use(
//   session({
//     name: "session-id",
//     secret: "12345-67890-09876-54321",
//     saveUninitialized: false,
//     resave: false,
//     store: new FileStore(),
//   })
// );

// function auth(req, res, next) {
//   console.log(req.session);

//   if (!req.session.user) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       const err = new Error("You are not authenticated!");
//       res.setHeader("WWW-Authenticate", "Basic");
//       err.status = 401;
//       return next(err);
//     }

//     const auth = Buffer.from(authHeader.split(" ")[1], "base64")
//       .toString()
//       .split(":");
//     const user = auth[0];
//     const pass = auth[1];
//     if (user === "admin" && pass === "password") {
//       req.session.user = "admin";
//       return next(); // authorized
//     } else {
//       const err = new Error("You are not authenticated!");
//       res.setHeader("WWW-Authenticate", "Basic");
//       err.status = 401;
//       return next(err);
//     }
//   } else {
//     if (req.session.user === "admin") {
//       return next();
//     } else {
//       const err = new Error("You are not authenticated!");
//       err.status = 401;
//       return next(err);
//     }
//   }
// }

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// function auth(req, res, next) {
//   console.log(req.session);

//   if (!req.session.user) {
//     const err = new Error("You are not authenticated!");
//     err.status = 401;
//     return next(err);
//   } else {
//     if (req.session.user === "authenticated") {
//       return next();
//     } else {
//       const err = new Error("You are not authenticated!");
//       err.status = 401;
//       return next(err);
//     }
//   }
// }

// module.exports = app;

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const mongoose = require("mongoose");
const passport = require("passport");
const authenticate = require("./authenticate");
const uploadRouter = require("./routes/uploadRouter");
const campsiteRouter = require("./routes/campsiteRouter");
const favoriteRouter = require("./routes/favoriteRouter");

const app = express();

const url = "your_mongodb_connection_string";
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  () => console.log("Connected correctly to server"),
  (err) => console.log(err)
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    name: "session-id",
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

app.all("*", (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    console.log(
      `Redirecting to: https://${req.hostname}:${app.get("secPort")}${req.url}`
    );
    res.redirect(
      301,
      `https://${req.hostname}:${app.get("secPort")}${req.url}`
    );
  }
});

function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
  }

  const auth = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const user = auth[0];
  const pass = auth[1];
  if (user === "admin" && pass === "password") {
    return next();
  } else {
    const err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
  }
}

function sessionAuth(req, res, next) {
  if (!req.session.user) {
    const err = new Error("You are not authenticated!");
    err.status = 401;
    return next(err);
  } else {
    if (req.session.user === "authenticated") {
      return next();
    } else {
      const err = new Error("You are not authenticated!");
      err.status = 401;
      return next(err);
    }
  }
}

app.use("/imageUpload", uploadRouter);
app.use("/campsites", campsiteRouter);
app.use("/favorites", favoriteRouter);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
