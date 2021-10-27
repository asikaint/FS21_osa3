require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person.js')

app.use(express.json())
app.use(express.static('build'))

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

app.get('/',(request,response) => {
    res.send(`<h1>Welcome to test site</h1>`)
})

app.get('/api/persons',(request,response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id',(request,response)=>{
  const personId = Number(request.params.id)

  console.log(personId);
  Person.findById(personId, (err, sample) => {
    console.log(`find: ${sample}`);
  })
  Person.countDocuments({id: 1}, (err, count) => { console.log(`count: ${count}`) })

  const person = persons.find(person => person.id === personId)
  if (person) {
      response.json(person)
  } else {
      response.status(404).end()
  }
})

app.delete('/api/persons/:id',(request,response) => {
  const personId = Number(request.params.id)
  const person = persons.find(person => person.id === personId)
  if (person) {
    persons = persons.filter(person => (person.id != personId))
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  return Math.floor(Math.random() * 100);
}


app.post('/api/persons',(request,response) => {
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

  const count = Number(Person.countDocuments({name: body.name}, (err, count) => {}))
// console.log(`${typeof count} ${typeof 0}`);
//   if (count>0) {
//     console.log(`on jo`);
//     return response.status(400).json({
//       error: 'Person already on phonebook'
//     })
//   // PUT succesfull
//   } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  //  }
})
    
app.get('/api/info',(req,res) => {
    const sizePersons = persons.length
    console.log(persons.length);

    res.send(`<div> 
                <p>Phonebook has info for ${sizePersons} people</br>
                ${new Date().toString()} </p>
            </div>`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
