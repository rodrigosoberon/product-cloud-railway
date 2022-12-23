const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('./config');
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const hbs = require('express-handlebars');
const passport = require('passport')
const { initPassport } = require('./middlewares/passport.js')
const authWebRouter = require("./routers/web/auth.js");
const homeWebRouter = require("./routers/web/home.js");
const infoWebRouter = require("./routers/web/info.js");
const randomsWebRouter = require("./routers/web/randoms.js")


// ---------------------------------------------------------------------------------
// CONFIGURACION SERVIDOR

const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
initPassport()

// ----------------------------------------------------------------------------------
// MANEJO DE SESSION

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoRemote.cnxStr,
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

// ----------------------------------------------------------------------------------
// RUTAS

app.use(authWebRouter)
app.use(homeWebRouter)
app.use(infoWebRouter)
app.use(randomsWebRouter)

// ----------------------------------------------------------------------------------
// SETUP MOTOR PLANTILLAS (HANDLEBARS)

app.engine(
    "hbs",
    hbs.engine({
        extname: ".hbs",
        partialDir: "./views/partials",
        layoutDir: "./views/layouts",
        defaultLayout: "layout.hbs",
    })
);
app.set("views", "./views");
app.set("view engine", "hbs");


// ----------------------------------------------------------------------------------
// INICIO DEL SERVER

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));