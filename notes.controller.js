const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(
    chalk.green.inverse(
      'Note was added',
      Object.values(note)
    )
  )
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {
    encoding: 'utf8'
  })

  return Array.isArray(JSON.parse(notes))
    ? JSON.parse(notes)
    : []
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach((note) => {
    console.log(
      chalk.bgWhite(note.id),
      chalk.blue(note.title)
    )
  })
}

async function removeNote(id) {
  const notes = await getNotes()

  const filtered = notes.filter((note) => note.id !== id)

  await saveNotes(filtered)
  console.log(
    chalk.red(`Note with id="${id}" has been removed.`)
  )
}

async function updateNote(id, newTitle) {
  const notes = await getNotes()

  const noteIndex = notes.findIndex(
    (note) => note.id === id
  )
  notes[noteIndex].title = newTitle
  await saveNotes(notes)
}

module.exports = {
  addNote,
  removeNote,
  getNotes,
  updateNote
}
