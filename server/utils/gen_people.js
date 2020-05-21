const mongoose = require("mongoose");
const faker = require("faker");
const PeopleModel = require("../models/PersonModel");

mongoose.connect('mongodb://localhost:27017/backfront', 
{useNewUrlParser: true});

async function add(n) {
    try {
        for(let i = 0; i< n; i++) {
            const p = new PeopleModel();
            p.name = faker.name.firstName();
            p.country = faker.address.country();
            p.email = faker.internet.email();
            p.company = faker.company.companyName();
            await p.save()
        }   
    } catch (error) {
        console.log(error);
    }
    
}

add(100)
    .then(() => {
        console.log("ok");
        mongoose.disconnect();
    });