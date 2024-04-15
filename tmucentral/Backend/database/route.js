const router = require('express').Router();
const _user = require('./api_endpoints/user');
const _ad = require('./api_endpoints/ad');

// Routes for backend functionality
router
    // User Table API endpoints
    .get('/getUsers', _user.getUsers)
    .post('/postUser', _user.postUser)
    .post('/searchUser', _user.searchUser)
    .get('/users/id/:email', _user.getUserEmail)
    .get('/getUserById/:id', _user.getUserID)
    .patch('/patchUser/:id', _user.patchUser)
    .delete('/deleteUser/:id', _user.deleteUser)

    // Ad Table API endpoints
    .get('/getAds', _ad.getAds)
    .post('/postAds', _ad.postAds)
    .patch('/patchAd/:id', _ad.patchAds)
    .post('/searchAd', _ad.searchAd)
    .post('/searchAds', _ad.searchAds) 
    .delete('/deleteAd/:id', _ad.deleteAd)
    .get('/getAdById/:id', _ad.getAdById)

module.exports = router;
