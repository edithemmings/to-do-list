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
    let queryText = `INSERT INTO "tasks" ("content") VALUES ($1);`;
    console.log(queryText)
    pool.query(queryText, [newTask.content])
        .then((result) => {
            console.log("POST query worked", result);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error making POST query', error);
            res.sendStatus(500)
        })
})// end post routing

router.delete('/:id', (req, res) => {
    console.log('deletes are talking! & sent back', req.params.id)
    let queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log("DELETE result", result);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error making query', error);
            res.sendStatus(500)
        })
})

router.put('/:id', (req, res) => {
    console.log('puts are talking! & sent back', req.params.id)
    let queryText = `UPDATE "tasks" SET "done" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [true, req.params.id])
        .then((result) => {
            console.log("DELETE result", result);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error making query', error);
            res.sendStatus(500)
        })
})// END PUT ROUTE


module.exports = router;