const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './View');

app.get('/', (req, res) => {
  res.send('<p>Hello World</p>');
});

// Serve static files from the "View" directory

app.get('/error', (req, res) => {
  res.sendFile("./View/404.html" , { root: __dirname });
});

//error page
app.use((req, res) => {
  res.status(404).sendFile("./View/404.html" , { root: __dirname });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
});