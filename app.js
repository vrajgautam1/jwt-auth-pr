const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/dbconnection");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const flashMiddleware = require("./middlewares/flashMiddleware");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(flash());
app.use(cookieParser());
app.use(flashMiddleware);


app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const mainRoutes = require("./routers/index");
app.use(mainRoutes);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (!err) {
    console.log(`Server running at http://localhost:${port}`);
    db();
  }
});
