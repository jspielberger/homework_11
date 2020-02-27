const express = require('express');

const path = require("path");
// need fs to read and write to files
const fs = require("fs");
const PORT = 3000;
//express template
const app = express();
var notes = [];


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile('db/db.json', 'utf-8', function (err, data) {
        res.send(data);
    });
});

app.get("*", (req, res) => {
    res.redirect("/");
});


app.post("/api/notes", function (req, res) {
    fs.readFile('db/db.json', 'utf-8', function (err, data) {
        const db = JSON.parse(data);
        db.push(req.body)
        fs.writeFile('db/db.json', JSON.stringify(db), function (err) {
            if (err) {
                throw err
            }
            res.send('ok')
        });
    });
});

app.delete("/api/notes/:id", function (req, res) {
    fs.readFile('db/db.json', 'utf-8', function (err, data) {
        let db = JSON.parse(data);
        db.splice(req.params.id, 1)
        fs.writeFile('db/db.json', JSON.stringify(db), err => {
            if (err) throw err;
            res.send('yay')
        })
    })
})



app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});