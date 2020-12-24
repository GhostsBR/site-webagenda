require('dotenv').config({path:'variables.env'});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    console.log("Conectado com sucesso ao banco de dados!")
})
.catch( (err) => {
    console.log(`Houve um erro ao tentar se conectar com o banco de dados ${err}`)
});

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    fullname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    verifyed: {
        type: Boolean,
        require: true
    },
    group: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        require: true
    }
});

user = mongoose.model('user', userSchema);

exports.user = mongoose.model('user', userSchema);


new user({
    id: 1,
    fullname: 'Gustavo Lemos',
    username: 'GhostsBR',
    password: 'dawdfzsefgse',
    email: 'gustavo@hotmail.com',
    verifyed: true,
    group: 'UDESC',
    photo: 'photo#ddsf5hf25d25g'
}).save();
