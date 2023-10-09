const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const PORT = 3001;
const db = require('./db/db.json')


//Allows public folder to be unblocked
app.use(express.static('public'))
app.use(express.json())

//API Routes
// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        ///error logging
        if (err) throw err;
        let dbData = JSON.parse(data);
        //Returns new database
        res.json(dbData)
    });   
})

//POST 
///api/notes receives a new note to save on the request body and add it to db.json, then returns new note to the client.
app.post('/api/notes', (req, res) => {
    //grabs notes from body of request
    const updateNote = req.body

    //adds the note object to the array
    db.push(updateNote)

    //update the json file with the new object
    fs.writeFileSync('./db/db.json', JSON.stringify(db))

    //responds with the note object used
    res.json(db)
})


app.delete('/api/notes', (req, res) => {
    const updatedDb = db.filter((note) =>
        note.id !== req.params.id)

    fs.writeFileSync('./db/db.json', JSON.stringify(updatedDb))
    readFile.json(updatedDb)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
