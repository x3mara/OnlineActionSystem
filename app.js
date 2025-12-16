const express = require('express');
const session = require('express-session');
const usercontroller = require('./Controller/userController');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './View');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret:'secretKey',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.send('<p>Hello World</p>');
});

app.get('/error', (req, res) => {
  res.sendFile("./View/404.html" , { root: __dirname });
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/register');
  }
  res.render('dashboard', { user: req.session.user });
});

app.post('/register', usercontroller.register);

//error page
app.use((req, res) => {
  res.status(404).sendFile("./View/404.html" , { root: __dirname });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
});