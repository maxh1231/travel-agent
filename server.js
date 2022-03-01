const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/hotels', (req, res) => {
    res.sendFile(path.join(__dirname, './public/hotel.html'));
})

app.listen(PORT, () => console.log(`now listening on ${PORT}`))