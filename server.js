const
    express = require('express'),
    app = express(),
    Handlebars = require('handlebars'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'), // pour requete en format json
    methodOverride = require('method-override'),
    router = express.Router(),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    helpers = require('handlebars-helpers'),


    //sharp = require('sharp'),

    // connectFlash = require('connect-flash'), //customize le message d'erreur
    //keys = require('./config/keys'),
    port = 3000;


//------------------------mongoose-------------------------------------

//const db = require('./config/keys.js').mongoUrl
const db = 'mongodb://localhost:27017/vanessa';
mongoose.connect(db, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connecter à MongoDB Cloud'))
    .catch((err) => console.log(err))

// ------------------------Handlebars----------------------------------
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));



var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

//------------------------Session-------------------------------------
app.use(session({
    secret: 'securite',
    //keys: [keys.session.cookieKeys],
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,
    maxAge: 24 * 60 * 60 * 1000,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use('*', (req, res, next) => {
    if (res.locals.user = req.session.userId) {
        if (req.session.status === 'user') {
            if (req.session.isAdmin === true) {
                res.locals.isAdmin = req.session.isAdmin
            }
            res.locals.user = req.session.status
        }
    }
    // La function next permet qu'une fois la condition effectuer il reprenne son chemin
    next()
})


// Connect-Flash (req.flash)
// app.use(connectFlash())

//app.use
app.use('/assets', express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const Router = require('./api/router')
app.use('/', Router)

//compteur d'objets
Handlebars.registerHelper("counter", function(db) {
    if (!Array.isArray(db)) { return [] }
    return db.length
});


app.listen(port, () => {
    console.log("le serveur tourne sur le port: " + port);
});