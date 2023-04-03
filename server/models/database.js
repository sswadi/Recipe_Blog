
const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true ,maxIdleTimeMS: 80000, serverSelectionTimeoutMS: 80000, socketTimeoutMS: 0, connectTimeoutMS: 0});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to db!!!!'));
db.once('open', function(){
  console.log('Connected')
});

// Models
require('./Category');
require('./Recipe');