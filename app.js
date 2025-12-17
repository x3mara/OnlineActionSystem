import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import clientController from './backend/controllers/clientController.js';
import path from 'path';


const app = express();
const ControllerCL = new clientController(); // Create an instance of the client controller

app.set('view engine', 'ejs');
app.set('views', path.join('frontend'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.render('AuctionDetails');
});

app.post('/landpage', (req, res) => {
  res.render('Landpage', {
  });
});
app.get('/landpage', (req, res) => {
  res.render('Landpage', {
  });
});

app.post('/signup', (req, res) => {
  res.render('SignUp', {
    username: req.body.username
  });
});

app.get('/signup', (req, res) => {
  res.render('SignUp', { username: '' });
});

app.post('/login', (req, res) => {
  res.render('Login', {
  });
});
app.get('/login', (req, res) => {
  res.render('Login', {
  });
});

app.post('/sellitem', (req, res) => {
  res.render('SellItem', {
  });
});
app.get('/sellitem', (req, res) => {
  res.render('SellItem', {
  });
});
app.post('/clientdashboard', (req, res) => {
  res.render('ClientDashboard', {
    username: req.body.username,
    email: req.body.email
  });
});
app.get('/clientdashboard', (req, res) => {
  res.render('ClientDashboard', { username: '', email: ''
  });
}); 
app.post('/wishlistedauctions', (req, res) => {
  res.render('WishlistedAuctions', {
  });
});
app.get('/wishlistedauctions', (req, res) => {
  res.render('WishlistedAuctions', {
  });
});

app.post('/SignUpI', ControllerCL.register.bind(ControllerCL));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
