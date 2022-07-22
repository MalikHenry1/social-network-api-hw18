const usernames = [
    "malikahenry",
    "billybob", 
    "johnsmith", 
    "milyvanily",
    "misnomer",
];

const emails = [

    "email@email.com",
    "test@test.com",
    "fake@fake.org",
    "foo@bar.net",
    "gary@snail.com",
];

// The following functions select a random username and email from the arrays above in order to populate the seeds.js file

const getRandArrayItem = (array) => array[Math.floor(Math.random()*array.length)];

const getRandUsername = () => `${getRandArrayItem(usernames)}`;

const getRandEmail = () => `${getRandArrayItem(emails)}`;

module.exports = { getRandUsername, getRandEmail };