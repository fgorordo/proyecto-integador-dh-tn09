const express = require('express');
const path = require('path');
const app = express();
const expressPort = 3000
const mainRouter = require('./routes/main.routes');
const methodOverride = require('method-override');
const session = require ('express-session');
const cookies = require('cookie-parser');
const autoLogin = require('./middlewares/autoLogin');
const mainApiRouter = require('./routes/api/indexApi.routes')
const cors = require('cors')

app.use(cors())

// Argumento para usar put y delete //
app.use(methodOverride('_method'));

// Argumento para usar post
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//Session Middleware
app.use(session({
  secret: "shhh, it's a secret",
  resave: true,
  saveUninitialized: false
}));

// Cookie middleware
app.use(cookies())

app.use(autoLogin);


// asignando la ruta para archivos publicos //
app.use(express.static(path.resolve(__dirname, '../public')))
app.use('/users/avatar/', express.static(path.resolve(__dirname, '../public/img/uploads/users')))
app.use('/products/image/', express.static(path.resolve(__dirname, '../public/img/uploads/products')))


// seteando el uso de plantillas ejs //
app.set('view engine', 'ejs');
app.set('views','./src/views')


// ROUTER PRINCIPAL //

app.use(mainRouter);


//Api Router
app.use(mainApiRouter)


// levantando el servidor //
app.listen(process.env.PORT || expressPort, () => {
  console.log(`Servidor inciado en puerto ${expressPort}`)
  console.log(`Link al sitio: http://localhost:${expressPort}`)
})





