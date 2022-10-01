require('dotenv').config();

let mongoose
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
const Schema = mongoose.Schema


try{
  mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
  console.log('Conectado correctamente a la BD')
}catch(e){
  console.error('ERROR al tratar de conectarse a la BD')
}

let personSchema = new Schema({
  name :{
    type: String,
    required: true,
    unique: false,
  },
  age: {
    type: Number,
    required: false,
  },
  favoriteFoods: {
    type:Array,
    required: false
  }
})


let Person = mongoose.model('Person', personSchema)

const createAndSavePerson = function(done){
  let robertRamirez = new Person({
    name: 'Robert Ramirez',
    age: 26,
    favoriteFoods: ['pasta', 'coconout rice', 'beaf']
  })
  robertRamirez.save(function(err, data){
    if(err) return console.error(err)
    done(null,data);
  })
};

const arrayOfPeople = [
  {
    name: 'Albert',
    age:24,
    favoriteFoods:[
      "hot dogs",
      "hamburguers",
      "shrimps"
    ]
  },
  {
    name: 'Mary',
    age:20,
    favoriteFoods:[
      "crepes",
      "liver",
      "smoothie"
    ]
  },
  {
    name: 'Nadia',
    age:34,
    favoriteFoods:[
      "pizza",
      "khebab",
      "shrimps"
    ]
  }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if(err)return console.log(err)
    done(null, people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  },
  function(err, personFound){
    if(err) return console.log(err)
    done(null, personFound)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, function(err, personFound){
    if(err) return console.log(err)
    done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,
    function(err, data){
      if(err) return console.log(err)
      done(null, data)
    }
  )
};

const findEditThenSave = (personId, done) => {
  
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person){
    if(err) return console.log(err)

    person.favoriteFoods.push(foodToAdd)

    person.save((err, updatedPerson)=>{
      if(err) return console.log(err)
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet}, 
    {new: true}, 
    function(err, data){
      if(err) return console.log(err)
      done(null , data);
    })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, data){
    if(err) return console.log(err)
    done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({
    name: nameToRemove
  },
  function(err, data){
    if(err) return console.log(err)
    done(null, data)
  }
  )

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
