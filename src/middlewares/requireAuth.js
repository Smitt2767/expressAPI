const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const SECRET_KEY ='very secret plz dont hack this..';

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
       return res.status(401).send({err : 'You must be logged in..'});
    }
    const token = authorization.replace('Bearer ', '');

    jwt.verify(token ,SECRET_KEY, async (err, payload) => {
        if(err){
            return res.status(401).send({err : 'You must be logged in..'})
        }
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    } 
    )
    
}