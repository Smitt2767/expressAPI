require('./src/models/User');
require('./src/models/Track');

const express = (require('express'));
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const trackRoutes = require('./src/routes/trackRoutes')
const requireAuth = require('./src/middlewares/requireAuth');
const bodyParser = require('body-parser');

const app = express();

const createConnection = async () => {
    const mongoUri = 'mongodb+srv://smit:q3ctp$*2@cluster0-mbbqg.mongodb.net/Tracker?retryWrites=true&w=majority';
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true
    });
}
createConnection();
app.use(bodyParser.json())
app.use(authRoutes);
app.use(trackRoutes);


app.get ('/',requireAuth, (req, res) => {
    res.send(`Your email is : ${req.user.email}`)
});

app.listen (process.env.PORT || 3000);