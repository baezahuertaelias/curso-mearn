const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern_curso';


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('La BD esta conectada'))
  .catch(error => console.error(error));

module.exports = mongoose;