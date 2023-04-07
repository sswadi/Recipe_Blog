const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    ingredients: {
        type: Array,
        required: true
    },

    category: {
        type: String,
        enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian' ], //this is to add specific cateogry
        required: true
    },

    image: {
        type: String,
        required: true
    },
});

recipeSchema.index({name: 'text', description: 'text'});
//wildcard indexing

// recipeSchema.index({ "$**": 'text'});

module.exports = mongoose.model('Recipe' , recipeSchema);