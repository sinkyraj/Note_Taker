const router = require('express').Router()
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const file = path.join(__dirname, '..', 'db', 'db.json')

router.get('/notes', (req, res) => {
  fs.readFile(file,'utf8', (err, notes) => {
    //console.log(notes)
    if (err) { console.log(err) }
    res.json(JSON.parse(notes))
  })
})

router.post('/notes', (req, res) => {
  
  let note ={
    title: req.body.title,
    text: req.body.text
  }
  
  note.id =uuidv4()

  fs.readFile(file, 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let notes = JSON.parse(data)
    notes.push(note)

    fs.writeFile(file, JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      res.json(note)
    })
  })
})

router.delete('/notes/:id', (req, res) => {
  let id = req.params.id
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) { console.log(err) }
    let notes = JSON.parse(data)
    notes = notes.filter(note => note.id !== id)
    fs.writeFile(file, JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})

module.exports = router











