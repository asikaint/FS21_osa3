require('dotenv').config()

const express = require('express')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person.js')

app.use(express.static('build'))
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'TypeError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(409).send(error)
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

//Valmis
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

  const person = Person({
    name: body.name,
    number: body.number,
  })

  person.save()
  .then(result => {
    console.log(`Saved`)
    response.json(result)
  })
  .catch(error => next(error)) // Nimi on jo

  // Person.findOneAndUpdate(name, number, {
  //   new: true,
  //   upsert: true
  // })
  // .then(updatedPerson => {
  //   response.json(updatedPerson)
  //   console.log(`${name} ${number} added to phonebook`)
  // })
  // .catch(error => next(error))
})

app.put('/api/persons',(request,response,next) => {
  const body = request.body
  // Missing body
  const name = {name: body.name}
  console.log(`name`, name.name)
  const number = {number: body.number}
  const id = Person.findOne({name: name})

  Person.updateOne(name,number)
  .then(updatedPerson => {
    response.json({
      name: name.name,
      number: number.number
    })
    console.log(`${name} number updated ${number}`)
  })
  .catch(error => next(error))
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