const express = require('express')
const morgan = require('morgan')

let persons = [
    { 
      name: "Arto Hellas", 
      number: "040-123456",
      id: 1
    },
    { 
      name: "Ada Lovelace", 
      number: "39-44-5323523",
      id: 2
    },
    { 
      name: "Dan Abramov", 
      number: "12-43-234345",
      id: 3
    },
    { 
      name: "Mary Poppendieck", 
      number: "39-23-6423122",
      id: 4
    }
  ]

  const app = express()

  app.use(express.json())
  app.use(morgan('tiny'))

  const getId = () => Math.floor(Math.random() * 100)

  app.get('/', (req, res) => {
      res.send('<h1>Phonebook</h1>')
  })

  app.get('/api/persons', (req, res) => {
      res.json(persons)
  })

  app.get('/info', (req, res) => {
      res.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${Date()}</p>
      `)
  })

  app.get('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)
      const person = persons.find(p => p.id === id)
      if (person) {
          res.json(person)
      } else {
          res.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)
      persons = persons.filter(p => p.id !== id)
      res.status(204).end()
  })

  app.post('/api/persons', (req, res) => {
      const body = req.body

      if (!body.name || !body.name) {
          return res.status(400).json({
              error: 'content missing'
          })
      }

      const hasDuplicate = persons.some(p => p.name === body.name)
      if (hasDuplicate) {
          return res.status(400).json({
              error: 'name must be unique'
          })
      }

      const person = {
          name: body.name,
          number: body.number,
          id: getId()
      }

      persons = persons.concat(person)
      res.json(person)
  })

  const PORT = 3001
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })
