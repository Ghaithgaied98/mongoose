
  
const mongoose = require("mongoose");
const express = require("express");

const PrototypeP = require("./person");
const app = express();
app.use(express.json());
mongoose.connect(
  "mongodb+srv://1234567890:1234567890@cluster0.tm28j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      throw err;
    }
    console.log("Database connected ...");
  }
);

let Prototype = new PrototypeP({
  name: "Ghaith Gaied",
  age: 23,
  favouriteFoods: ["couscous"],
});

Prototype.save()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
let ArrayOfPeople = [
  { name: "Ahmed", age: 27, favouriteFoods: ["Palade"] },
  { name: "Amin ", age: 17, favouriteFoods: ["Pasta"] },
  { name: "Salem", age: 47, favouriteFoods: ["Burger"] },
];
var createManyPeople = function (ArrayOfPeople, done) {
  Prototype.create(ArrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};
var findPeopleByName = function (personName, done) {
  Prototype.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

var findOneByFood = function (food, done) {
  Prototype.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

var findPersonById = function (personId, done) {
  Prototype.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Prototype.findById({ _id: personId }, (err, data) => {
    if (err) {
      console.error(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if (err) {
        console.error(err);
      }
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Prototype.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) {
        console.error(err);
      }
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Prototype.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      console.error(err);
    }
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Marry";
  Prototype.remove({ name: nameToRemove }, (err, data) => {
    if (err) {
      console.error(err);
    }
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Prototype.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) {
        console.error(err);
      }
      done(null, data);
    });
};


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
