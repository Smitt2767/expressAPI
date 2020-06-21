const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userschema = new mongoose.Schema({
    email :{
        type: String,
        unique : true,
        required : true
    },
    password : {
        type: String,
        required : true
    }
});

userschema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt , (err, hash)=>{
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
});

userschema.methods.comparePassword = function(candidatePassword){
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if(err){
                return reject(err)
            }
            if(!isMatch){
                return reject(false)
            }
            resolve(true)
        });
    })
}

mongoose.model('User', userschema);
