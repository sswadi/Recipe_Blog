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

//ABOUT
exports.about = async(req, res) => {

    return res.render('about');

}


//CONTACT
exports.contact = async(req, res) => {

    return res.render('contact');

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
        const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber);
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
        const recipe = await Recipe.findById(recipeId).exec();
        res.render('recipe', {
            title : 'Cooking Blog - Recipe',
            recipe
        });

    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

// Search page --> POST /search

exports.searchRecipe = async(req, res) => {

    //searchTerm

    try{
        let searchTerm = req.body.searchTerm;

        let recipe = await Recipe.find({$text: {$search: searchTerm, $diacriticSensitive: true}});

        res.render('search', {
            title : 'Cooking Blog - Search',
            recipe
        });

    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


// GET ---> /explore-latest

exports.exploreLatest = async(req, res) => {
    try{   
        
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render('explore-latest', {
            title : 'Cooking Blog - Explore Latest',
            recipe
        });

    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
}



// GET ---> /explore-random
//Explore Random as JSON

exports.exploreRandom = async(req, res) => {
    try{   
        
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);

        let recipe = await Recipe.findOne().skip(random).exec();
       
        res.render('explore-random', {
            title : 'Cooking Blog - Explore Latest',
            recipe
        });

    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


// GET ---> /submit-recipe

exports.submitRecipe = async(req, res) => {

    const inforErrorObj = req.flash('infoError');
    const inforSubmitObj = req.flash('infoSubmit');

    res.render('submit-recipe', {
        title : 'Cooking Blog - Submit Recipe',
        inforErrorObj,
        inforSubmitObj
    });
}


// POST ---> /submit-recipe

exports.submitRecipeOnPost = async(req, res) => {

    try{   


        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No files were uploaded');
        }else{
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/uploads' + newImageName;

            imageUploadFile.mv(uploadPath,function(err){
                if(err){
                    return res.status(500).send(err);
                }
            });
        }


        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        });

        await newRecipe.save();

        req.flash('infoSubmit', 'Recipe has been added.');
        res.redirect('/submit-recipe');

    }catch(error){
        req.flash('infoErrors', error);
        res.redirect('/submit-recipe');
    } 
}


// async function deleteRecipe(){
//     try{
//         const res = await Recipe.deleteOne({name: 'New Recipe Updated'});

//     }catch(error){
//         console.log(error);
//     }
// }

// deleteRecipe();





// async function updateRecipe(){
//     try{
//         const res = await Recipe.updateOne({ name: 'New Recipe'}, {name: 'New Recipe Updated'});
//         res.n //Number of documents matched
//         res.nModified;

//     }catch(error){
//         console.log(error);
//     }
// }

// updateRecipe();












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