require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person.js')

app.use(express.static('build'))
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    // console.log(error)
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'TypeError') {
    // console.log(error)
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

morgan.token('bodyJSON', req => JSON.stringify(req.body || {}));
morgan.token('method', req => req.method);
app.use((req,res,next) => {
  if (req.method === "POST") {
    return morgan(
      ':method :url :status :res[content-length] - :response-time ms :bodyJSON' 
    )(req, res, next)
  } else {
    return morgan(
      ':method :url :status :res[content-length] - :response-time ms' 
    )(req, res, next)
  }
});

let persons = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 5
      }
    ]
// Valmis
app.get('/',(request,response) => {
    res.send(`<h1>Welcome to test site</h1>`)
})

//Valmis
app.get('/api/persons',(request,response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//TODO
app.get('/api/persons/:id',(request,response,next) => {
  const personId = request.params.id
  Person.findById(personId)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

// Valmis
app.delete('/api/persons/:id',(request,response,next) => {
  const personId = request.params.id

  Person.findByIdAndRemove(personId)
    .then(person => {
      if (person) {
        console.log("Data deleted")
        response.status(204).end()
      } else {
        console.log("Person not found to remove")
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

//Valmis
app.post('/api/persons',(request,response,next) => {
  const body = request.body
  // Missing information
  if (!body.name && body.number) {
    return response.status(400).json({
       error: 'name missing' 
    })
  } 
  if (!body.number && body.name) {
    return response.status(400).json({
      error: 'number missing' 
   })
  }
  if (!body.name && !body.number) {
    return response.status(400).json({
      error: 'name and number missing'
    })
  }

  const name = { name: body.name };
  const number = { number: body.number };

  Person.findOneAndUpdate(name, number, {
    new: true,
    upsert: true
  })
  .then(updatedPerson => {
    response.json(updatedPerson)
    console.log(`${name} ${number} added to phonebook`)
  })
})
    
//Valmis
app.get('/api/info',(req,res) => {
  Person.countDocuments({}) // const sizePersons = 
  .then(count => { 
    res.send(`<div> 
      <p>Phonebook has info for ${count} people</br>
      ${new Date().toString()} </p>
      </div>`)
  console.log(`count: ${count}`)
  })
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})