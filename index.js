require('dotenv').config();
const expressEdge = require("express-edge");
const express = require("express");
const edge = require("edge.js");
const cloudinary = require('cloudinary');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const mydataController = require("./controllers/mydata");
const addreminderController = require("./controllers/addreminder");
const viewremaindersController = require("./controllers/viewremainders");
const deleteController = require("./controllers/delete");
const deletePageController = require("./controllers/deletepage");
const modifypageController = require("./controllers/modifypage");
const modifyController = require("./controllers/modify");
const updateController = require("./controllers/update");
const enableController = require("./controllers/enableremainder");
const enablepageController = require("./controllers/enablepage");
const disablepageController = require("./controllers/disablepage");
const disableController = require("./controllers/disableremainder")

const app = new express();
mongoose.connect("mongodb://localhost/remainder");

app.use(connectFlash());

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

app.get("/", homePageController);
app.get("/auth/logout", auth, logoutController);
app.post("/posts/store", auth, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/addreminder",addreminderController)
app.get("/mydata",auth,mydataController);
app.get("/viewremainders",viewremaindersController);
app.get("/delete/:id",deleteController);
app.get("/modifypage",modifypageController)
app.get("/modify/:id",modifyController)
app.get("/deleteremainder",deletePageController);
app.post("/update/:id",updateController);
app.get("/enablepage",enablepageController)
app.get("/enablereminder/:id",enableController);
app.get("/disablepage",disablepageController)
app.get("/disablereminder/:id",disableController);


app.use((req, res) => res.render('not-found'));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
