require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate= require("mongoose-findorcreate");
const FacebookStrategy = require("passport-facebook").Strategy;

const app = express();



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(session({
  secret:"Micul nostru secret.",
  resave: false,
  saveUninitialized:false
}));



app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema ({
  username:String,
  password:String,
  googleId:String,
  facebookId:String,
  secrets:String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      console.log(profile);

      User.findOrCreate({facebookId:profile.id}, function(err, user){
        return cb(err, user);
      });
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(profile);

      User.findOrCreate({googleId:profile.id}, function(err, user){
        return cb(err, user);
      });
    });
  }
));

app.get("/secrets", function(req, res){
  User.find({"secrets": {$ne: null}}, function(err, foundUsers){
    if(err){
      console.log(err);
    } else {
      if(foundUsers){
        res.render("secrets", {usersWithSecrets:foundUsers})
      }
    }
  });
});

app.route("/register").get(function(req, res){
  res.render("register");
}).post(function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.redirect("/register");
    } else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });
});

app.get("/", function(req, res){
  res.render("home",{});
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/secrets",
  passport.authenticate('facebook', { successRedirect: '/secrets',
                                      failureRedirect: '/login' }));

app.get("/auth/google",
  passport.authenticate('google', { scope: ['profile'] })
);

app.get("/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  });

app.route("/login").get(function(req, res){
  res.render("login", {});
}).post(function(req, res){
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/submit", function(req, res){
  const  submittedSecre = req.body.secret;

  User.findById(req.user.id, function(err, foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        foundUser.secrets = submittedSecre;
        foundUser.save(function(err){
          if(!err){
            res.redirect("/secrets");
          }
        })
      }
    }
  });
});

app.get("/submit", function(req, res){
  if(req.isAuthenticated()){
    res.render("submit");
  } else{
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res){

    req.logout();
    if(req.isAuthenticated()){
      console.log("conectat");
    } else{
      console.log("deconectat");
    }
    res.redirect("/");
});


app.listen(3000, function(){
});
