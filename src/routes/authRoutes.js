const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

const SECRET_KEY ='very secret plz dont hack this..';

router.post('/signup', async (req, res) => {
    const { email , password } = req.body;
    try{
        const user = new User({email, password})
        await user.save()
        const token = jwt.sign({userId : user._id}, SECRET_KEY)
        res.send({token})
        console.log('New user : ', email , password)
    }   
    catch(err){
        return res.status(422).send('user name or password invalid...')
    }
    
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).send({err : 'invalid password or email'});
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error : 'invalid password or email'});
    }
    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId : user._id}, SECRET_KEY)
        res.send({token})
    }
    catch(err){
        return res.status(422).send({err : 'invalid password or email'})
    }

})

module.exports = router;
