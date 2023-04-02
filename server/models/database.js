const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}); //?

// connect from mongodb
mongoose.connect('mongodb://localhost:27017/recipe_Blog_db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to db'));
db.once('open', function(){
    console.log('Successfully connected to DB');
});

//Models

require('./Category');