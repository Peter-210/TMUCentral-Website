const model = require('../model');

// Retreive all users in the DB
exports.getUsers = async(req, res) => {
    try{
        const result = await model.User.find();
        if(result == 0){
            res.status(404).send({'error': 'No results returned'})
        }
        else {
            res.status(200).send({'Review': result});
        }
    }
    catch(err){
        res.status(500).send({'error': err.message});
    }
}

// Add user to DB
exports.postUser = async(req, res) => {
    try{
        const user = new model.User(req.body);          // Create new user
        await user.save();                         // Save user into DB. await added to wait for user to be saved before sending the response
        res.status(201).send({"Users": user});
    }
    catch(err){
        res.status(400).send(err.message);   // status 400 = user submitted bad request
    }
};

// Search user by attributes
exports.searchUser = async(req, res) => {
    try{
        console.log(req.body);
        const result = await model.User.find(req.body);
        console.log("Result: ", result);
        if(result == 0){
            res.status(404).send({'error': 'No results returned'})
        }
        else {
            res.status(200).send({'Review': result});
        }
    }
    catch(err){
        res.status(500).send({'error': err.message});
    }
}

// // Setting up parameterized URL and Query Stiring param
// // Return a single user based on their id
exports.getUserID = async(req, res) => {  
    try {
        const result = await model.User.findById(req.params.id);
        // Check to see if user with specified id exists in DB
        if(!result) {
            res.status(404).send({'error': `No user found with id ${userID}`});
        }
        else{
            res.status(200).send(result);
        }
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};

// Return user based on tmu email
exports.getUserEmail= async(req, res) => {  
    try{
        const userEmail = req.params.email;
        const result = await model.User.find({email: userEmail});
        // Check to see if user with specified id exists in DB
        if(!result) {
            res.status(404).send({'error': `No user found with email ${userEmail}`});
        }
        else{
            res.status(200).send(result);
        }
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};

// Update specific properties of user instead of replacing entire entry
exports.patchUser = async(req, res) => {
    try{
        const result = await model.User.findOneAndUpdate(
            {_id: req.params.id}, 
            req.body, 
            {new: true}
        );  // Find the object in DB and replace it. the new args is a flag returning the changed data
        console.log(result);
        res.status(200).send({result});
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};

// Delete user from DB
exports.deleteUser = async(req, res) => {
    try{
        const result = await model.User.deleteOne({_id: req.params.id});
        res.status(200).send({'deletedCount': result.deletedCount})
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};
