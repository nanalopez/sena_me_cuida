const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

// Database Connection
const Database = mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => {
    console.log('¡Connection Successfully!')
}).catch(err => {
    console.log(`Mongoose error : ${err}`)
});

module.exports = Database
