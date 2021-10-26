const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log(`Password missing as an argument`);
    process.exit(1)
} 

const password = process.argv[2]
const url =
    `mongodb+srv://fso21:${password}@cluster0.5c1o4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person',personSchema)

// Print persons
if (process.argv.length < 4)
{
    console.log('phonebook:');
    Person.find({}).then(res => {
        res.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
    })
}
else if ( process.argv.length >= 4) 
{
    const name = process.argv[3];
    const number = process.argv[4] ? process.argv[4] : 0;

    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(res => {
        console.log('person saved to phonebook')
        mongoose.connection.close()
    })

    console.log(`Added ${name} number ${number} to phonebook`);
}