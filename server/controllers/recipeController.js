require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

// GET req | Homepage

exports.homepage = async(req, res) => {
    try{    
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);

        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber); //sort is used to sort the latest recipes

        const thai = await Recipe.find({ 'category': 'Thai'}).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American'}).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese'}).limit(limitNumber);

        const food = {latest, thai, american, chinese};

        res.render('index', {
            title : 'Cooking Blog - Home',
            categories, 
            food 
        });

    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

// GET CATEGORIES 

exports.exploreCategories = async(req, res) => {
    try{    
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', {
            title : 'Cooking Blog - Categories',
            categories
        });

    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


//exploreCategoriesById route ---> GET /categories/:id

exports.exploreCategoriesById = async(req, res) => {
    try{ 
        
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Category.find({'category': categoryId}).limit(limitNumber);
        res.render('categories', {
            title : 'Cooking Blog - Categories',
            categoryById
        });

    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


// Individual recipe page --> GET /recipe/:id
exports.exploreRecipe = async(req, res) => {
    try{   
        
        let recipeId = req.params.id;
        const recipe = await Recipe.findById({recipeId});
        res.render('recipe', {
            title : 'Cooking Blog - Recipe',
            recipe
        });

    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


















// async function insertDummyCategoryData(){

//     try{
//         await Category.insertMany([
//             {
//                 "name": "Thai",
//                 "image": "1.jpg"
//             },
//             {
//                 "name": "Indian",
//                 "image": "1.jpg"
//             },
//             {
//                 "name": "Chinese",
//                 "image": "1.jpg"
//             },
//             {
//                 "name": "American",
//                 "image": "1.jpg"
//             },
//             {
//                 "name": "Mexican",
//                 "image": "1.jpg"
//             },
//             {
//                 "name": "Continental",
//                 "image": "1.jpg"
//             },
//         ]);

//     } catch(error){
//         console.log('Error in adding details to the DB ', error);
//     }
// }

// insertDummyCategoryData();


//dummy data for Recipes DB

// async function insertDummyRecipeData(){
//      try{
//             await Recipe.insertMany([
//                       { 
//                         "name": "Recipe Name Goes Here",
//                         "description": `Recipe Description Goes Here`,
//                         "email": "recipeemail@raddy.co.uk",
//                         "ingredients": [
//                           "1 level teaspoon baking powder",
//                           "1 level teaspoon cayenne pepper",
//                           "1 level teaspoon hot smoked paprika",
//                         ],
//                         "category": "American", 
//                         "image": "southern-friend-chicken.jpg"
//                       },
//                       { 
//                         "name": "Recipe Name Goes Here",
//                         "description": `Recipe Description Goes Here`,
//                         "email": "recipeemail@raddy.co.uk",
//                         "ingredients": [
//                           "1 level teaspoon baking powder",
//                           "1 level teaspoon cayenne pepper",
//                           "1 level teaspoon hot smoked paprika",
//                         ],
//                         "category": "American", 
//                         "image": "southern-friend-chicken.jpg"
//                       },
//                     ]);
    
//         } catch(error){
//             console.log('Error in adding details to the DB ', error);
//     }
// }
    
// insertDummyRecipeData();