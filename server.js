const path = require('path');
const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('./controllers'))

app.listen(PORT, () => console.log(`now listening on ${PORT}`))