import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import clientController from './backend/controllers/clientController.js';
import multer from 'multer';
import path from 'path';


const app = express();
const ControllerCL = new clientController(); // Create an instance of the client controller

app.set('view engine', 'ejs');
app.set('views', path.join('frontend'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Create this folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.username = req.session.user?.username;
  res.locals.email = req.session.user?.email;
  next();
});

app.get('/', (req, res) => {
  res.render('landpage');
});

app.post('/landpage', (req, res) => {
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

app.post('/sellitemI', upload.array('images', 5), (req, res) => {
  console.log('Form data:', req.body);
  console.log('Uploaded files:', req.files);

});

app.get('/sellitem', (req, res) => {
  res.render('SellItem', {
  });
});


app.post('/clientdashboard', (req, res) => {
 
});

app.get('/clientdashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/landpage');
  }
  res.render('ClientDashboard', {
    username: req.session.user.username,
    email: req.session.user.email
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
