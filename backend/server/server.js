const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js');

const app = express();

const PORT = 5000;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

//create the get request
app.get('/api/Golfers', cors(), async (req, res) => {
    // const Golfers = [

    //     { id: 1, firstName: 'Lisa', lastName: 'Lee' },
    //     { id: 2, firstName: 'Eileen', lastName: 'Long' },
    //     { id: 3, firstName: 'Fariba', lastName: 'Dako' },
    //     { id: 4, firstName: 'Cristina', lastName: 'Rodriguez' },
    //     { id: 5, firstName: 'Andrea', lastName: 'Trejo' },
    // ];
    // res.json(Golfers);
    try{
        const { rows: Golfers } = await db.query('SELECT * FROM Golfers');
        res.send(Golfers);
    } catch (e){
        return res.status(400).json({e});
    }
});

//create the POST request
app.post('/api/Golfers', cors(), async (req, res) => {
    const newUser = { firstname: req.body.firstname, lastname: req.body.lastname }
    console.log([newUser.firstname, newUser.lastname]);
    const result = await db.query(
        'INSERT INTO Golfers(firstname, lastname) VALUES($1, $2) RETURNING *',
        [newUser.firstname, newUser.lastname]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
