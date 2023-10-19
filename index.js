const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb

app.get('/', (req, res) => {
    res.send('Brandshop running successfully')
})

app.listen(port, ()=>{
    console.log(`Brandshop runnign on port ${port}`);
})