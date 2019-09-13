let express = require('express');
let router = express.Router();
const pool = require('../modules/pool')

// get routing
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks";`;
    pool.query(queryText)
    .then((result) => {
        console.log("GET query worked:", result.rows);
        res.send(result.rows);
    }).catch((error) => {
            console.log('error making GET query', error);
            res.sendStatus(500)
        })
});// end get routing

// post routing
router.post('/', (req, res) => {
    console.log("req.body:", req.body);
    let newTask = req.body;
    let queryText = `INSERT INTO "tasks" ("content", "done") VALUES ($1, $2);`;
    console.log(queryText)
    pool.query(queryText, [newTask.content, newTask.done])
        .then((result) => {
            console.log("POST query worked", result);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error making POST query', error);
            res.sendStatus(500)
        })
})// end post routing



module.exports = router;