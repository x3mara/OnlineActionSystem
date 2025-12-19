import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import clientController from './backend/controllers/clientController.js';
import auctionController from './backend/controllers/auctionController.js';
import Client from './backend/Client.js';
import Item from './backend/Item.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getAllAuctions } from './backend/controllers/qol.js';

const app = express();
const ControllerCL = new clientController();
const ControllerAU = new auctionController();

// Create static directory and subdirectories
const staticDir = 'static';
const staticSubDirs = ['public', 'public/images', 'uploads'];

// Function to copy directory recursively
const copyDirectoryRecursive = (source, target) => {
  if (!fs.existsSync(source)) {
    return; // Source doesn't exist, nothing to copy
  }
  
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Recursively copy subdirectory
      copyDirectoryRecursive(sourcePath, targetPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
};

// Check if static directory exists
if (!fs.existsSync(staticDir)) {
  console.log('Creating static directory structure...');
  
  // Create main static directory
  fs.mkdirSync(staticDir, { recursive: true });
  
  // Create all subdirectories
  staticSubDirs.forEach(subDir => {
    const fullPath = path.join(staticDir, subDir);
    fs.mkdirSync(fullPath, { recursive: true });
  });
  
  console.log('Copying existing files...');
  
  // Copy Public folder if it exists
  if (fs.existsSync('Public')) {
    console.log('Copying Public/ to static/public/');
    copyDirectoryRecursive('Public', path.join(staticDir, 'public'));
  } else {
    console.log('Public/ folder not found, skipping...');
  }
  
  // Copy uploads folder if it exists
  if (fs.existsSync('uploads')) {
    console.log('Copying uploads/ to static/uploads/');
    copyDirectoryRecursive('uploads', path.join(staticDir, 'uploads'));
  } else {
    console.log('uploads/ folder not found, skipping...');
  }
  
  console.log('Static directory setup complete!');
} else {
  console.log('Static directory already exists, skipping setup...');
}

app.set('view engine', 'ejs');
app.set('views', path.join('frontend'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the static directory
app.use('/static', express.static(staticDir));

// Multer configuration - save to static/uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(staticDir, 'uploads');
    // Ensure upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + '-' + uniqueSuffix + ext);
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
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Rest of your code remains exactly the same...
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
  res.render('Landpage', {});
});

app.post('/landpage', (req, res) => {
  res.render('Landpage', {});
});

app.post('/signup', (req, res) => {
  res.render('SignUp', {
    username: req.body.username
  });
});

app.get('/signup', (req, res) => {
  res.render('SignUp', { username: '' });
});

app.post('/myauctions', (req, res) => {
    const myauctions = ControllerAU.getClientAuctions(req.session.user);
    myauctions.then(data => {
        res.render('MyAuctions', {myAuctions: data});
    }); 
})

app.get('/login', (req, res) => {
  res.render('Login', {});
});

app.post('/sellitemI', upload.array('images', 5), (req, res) => {
  console.log('Form data:', req.body);
  console.log('Uploaded files:', req.files);
  ControllerAU.startAuction(req,res);
});

app.get('/sellitem', (req, res) => {
  res.render('SellItem', {});
});

app.get('/clientdashboard', async (req, res) => {
  res.render('ClientDashboard', {
    username: req.session.user,
    recommendedAuctions: await getAllAuctions(),
    wishlistedAuctions: []
  });
});

app.get('/AuctionDetails', async (req, res) => {

        const auctionId = req.session.auctionData.auctionId;
                console.log(req.session.auctionData);
        const data = await ControllerAU.viewAuctionDetails(auctionId , req.session.user);
        
        

        res.render('AuctionDetails', {
            auction: data.auction[0] || {}, // Safe access,
            sellerName: data.sellerName,
            bidders: data.bidders || [],
            userBid: data.userBid[0],
            imgpath: data.imgpath[0]
        });
});

app.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
})

app.post('/wishlistedauctions', (req, res) => {
  res.render('WishlistedAuctions', {});
});

app.get('/wishlistedauctions', (req, res) => {
  res.render('WishlistedAuctions', {});
});

app.post('/SignUpI', ControllerCL.register.bind(ControllerCL));
app.post('/LoginI', ControllerCL.login.bind(ControllerCL));
app.post('/auction/details', (req, res) => {
    req.session.auctionData = req.body; // Store full auction data
    console.log(req.body);  
    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
            return res.status(500).send('Error');
        }
        res.redirect('/AuctionDetails');
    });
});

app.get('/manageprofile', (req, res) => {
  res.render('ManageProfile', {username: req.session.user, avatar: 'static/public/images/DefaultAvatar.png'});
});


app.post('/manageprofile', upload.single('profilePic'), (req, res) => {
  console.log('Form data:', req.body);
  console.log('Uploaded file:', req.file);
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
  console.log('Static files available at: http://localhost:3000/static/');
});