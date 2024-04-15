const model = require('../model');

// Used for the searching ad query
const { removeStopwords } = require('stopword');

// Retreive all advertisements
exports.getAds = async(req, res) => {
    try{
        const result = await model.Ad.find();
        if(result == 0){
            res.status(404).send({'error': 'No results returned'});
        }
        else {
            res.status(200).send({'Ads': result});
        }
    }
    catch(err){
        res.status(500).send({'error': err.message});
    }
};


// Put product into DB
exports.postAds = async(req, res) => {
    try{
        const ad = new model.Ad(req.body);
        await ad.save();
        res.status(201).send({'Ads': ad});
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};

// Update single or multiple fields associated with ad based on its ID
exports.patchAds = async(req, res) => {
    try{
        const result = await model.Ad.findOneAndUpdate(
            {_id: req.params.id}, 
            req.body, 
            {new: true}
        );
        console.log(result);
        res.status(201).send({'Ads': result});
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};

exports.searchAd = async(req, res) => {
    try{
        console.log(req.body.email);
        const result = await model.Ad.find({email: req.body.email});
        if(result == 0){
            res.status(404).send({'error': 'No results returned'});
        }
        else {
            res.status(200).send({'Ad': result});
        }
    }
    catch(err){
        res.status(500).send({'error': err.message});
    }
};

exports.searchAds = async(req, res) => {
    try{
        const {title,location,category, fromPrice, toPrice } = req.body;

        let query = {};
        if (title!=="null") {
            const specialChars = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g;

            // Format title to not have uppercase or special characters
            let keywordTitle = title.toLowerCase().replace(specialChars, '');

            // Remove repeating words
            keywordTitle = keywordTitle.split(' ');
            keywordTitle = [...new Set(keywordTitle)];

            // Filter title to not have common english words (aka stopwords)
            titleResult = removeStopwords(keywordTitle);

            query.title = { "$regex": titleResult.join("|"), "$options": "i" };
        }

        console.log(req.body.email);
        const result = await model.Ad.find(query);
        if(result == 0){
            res.status(404).send({'error': 'No results returned'});
        }
        else {
            res.status(200).send({'Ad': result});
        }
    }
    catch(err){
        res.status(500).send({'error': err.message});
    }
};

// Search an ad base on their id
exports.getAdById = async (req, res) => {
    try {
        const ad = await model.Ad.findById(req.params.id);
        if (!ad) {
            return res.status(404).send({'error': 'Ad not found'});
        }
        res.status(200).send(ad);
    } catch (err) {
        res.status(500).send({'error': err.message});
    }
};

// Delete ad from DB
exports.deleteAd = async(req, res) => {
    try{
        const result = await model.Ad.deleteOne({_id: req.params.id});
        res.status(200).send({'deletedCount': result.deletedCount})
    }
    catch(err) {
        res.status(500).send({'error': err.message});
    }
};
