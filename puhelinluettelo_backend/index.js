const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))


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

app.get('/',(req,res) => {
    res.send(`<h1>Welcome to test site</h1>`)
})
app.get('/api/persons',(req,res) => {
    res.json(persons)
})
app.get('/api/persons/:id',(request,response)=>{
  const personId = Number(request.params.id)
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

  // Return error if sane person on the phonebook already
  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'Person already on phonebook'
    })
  // PUT succesfull
  } else {
    console.log("not yet:",persons.includes(person => (person.name === body.name)));
    person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
    persons=persons.concat(person)
    console.log(persons);
    response.json(person)
  }
})
    


app.get('/api/info',(req,res) => {
    const sizePersons = persons.length
    console.log(persons.length);

    res.send(`<div> 
                <p>Phonebook has info for ${sizePersons} people</br>
                ${new Date().toString()} </p>
            </div>`)
})

const PORT = 3001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})
