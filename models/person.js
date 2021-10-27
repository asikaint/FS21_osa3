const mongoose = require('mongoose')

const password = process.argv[2]
const url = process.env.MONGODB_URI


mongoose.connect(url).then( result => {
    console.log(`connected to mongoDB`);
}).catch((e) => {
    console.log(`error connecting mongoDB ${e.message}`);
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)
