const express = require('express');
const morgan = require('morgan');
const CsvDb = require('csv-db');
const bodyParser = require('body-parser');
const structure = ['id', 'date', 'from', 'until', 'task'];
const csvDb = new CsvDb('data/timer.db');

const app = express();

// use the logger before static middleware!
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/timer', (req, res) => {
    csvDb.get().then((data) => {
        res.send(data);
    }, (err) => {
        res.send(err);
    });    
})
app.post('/timer', (req, res) => {
    console.log(req.body);
    csvDb.insert(req.body).then((data) => {
        res.send({id: data});
    }, (err) => {
        console.log(err);
    });
});
app.put('/timer', (req, res) => {
    console.log(req.body);

    csvDb.update(req.body, req.body.id).then((data) => {
        res.send(data);
    });
});
app.delete('/timer/:id', (req, res) => {
    csvDb.delete(req.param('id')).then(() => {
        res.send();
    });
});


app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});