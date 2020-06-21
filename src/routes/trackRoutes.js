const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks' ,async (req, res) => {
    const userId = req.user._id;
    const tracks = await Track.find({userId});
    res.send(tracks)
})

router.post('/tracks' , async (req, res) => {
    const {name , locations } = req.body;
    const userId = req.user._id;
    if(!name | !locations){
        return res.send('Must provide a name or locations');
    }
    try{
        const track = new Track({userId, name , locations });
        await track.save();
        console.log(name, locations)
        res.send(track);
    }
    catch(err){
        return res.send({err : err.messege})
    }
    
    
})
module.exports = router

