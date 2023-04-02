require('../models/database');
const Category = require('../models/Category');

// GET req | Homepage

exports.homepage = async(req, res) => {
    res.render('index', {
        title : 'Cooking Blog - Home'
    });
}



async function insertDummyCategoryData(){

    try{
        await Category.insertMany([
            {
                "name": "Thai",
                "image": "1.jpg"
            },
            {
                "name": "Indian",
                "image": "1.jpg"
            },
            {
                "name": "Chinese",
                "image": "1.jpg"
            },
            {
                "name": "American",
                "image": "1.jpg"
            },
            {
                "name": "Mexican",
                "image": "1.jpg"
            },
            {
                "name": "Continental",
                "image": "1.jpg"
            },
        ]);
    } catch(error){
        console.log('Error in adding details to the DB ', error);
    }
}

insertDummyCategoryData();