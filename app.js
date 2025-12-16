import express from 'express';
import session from 'express-session';
import clientController from './backend/controllers/clientController.js';
import path from 'path';
import { fileURLToPath } from 'url';


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
  res.render('SellItem');
});

app.get('/SignUp.html', (req, res) => {
  res.render('SignUp');
});

app.post('/SignUpI', ControllerCL.register.bind(ControllerCL));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
