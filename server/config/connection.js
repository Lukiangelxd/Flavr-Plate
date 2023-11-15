console.log('MONGODB_URI:', process.env.MONGODB_URI);
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://5dDvHjO0Q5ag5rGt:Mcarthur126@cluster0.dvepbo2.mongodb.net/flavr-plate_DB?retryWrites=true&w=majority');

module.exports = mongoose.connection;