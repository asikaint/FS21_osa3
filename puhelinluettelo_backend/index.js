const express = require('express')
const app = express()
app.use(express.json())

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
          console.log(persons)
          console.log(persons)
          console.log("---------------");
  if (person) {
    console.log(`persons before`,persons);
    persons = persons.filter(per => (per.id != personId))
    console.log(`persons after filter`,persons);
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  return Math.floor(Math.random() * 100);
}

app.post('/api/persons',(request,response) => {
  const person = request.body
  person.id = generateId()

  persons.concat(person)
  response.json(person)

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
