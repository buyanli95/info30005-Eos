const faker = require('faker');
const JobArea = [];

for(i=0; i<10; i++){
    JobArea[i] = faker.name.jobArea();
}

// for(i=0;i<11;i++){
//     console.log(cityName[i]);
// }

module.exports = JobArea;
