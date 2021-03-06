require('dotenv').config({path:'variables.env'});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    console.log("Conectado com sucesso ao banco de dados!");
})
.catch( (err) => {
    console.log(`Houve um erro ao tentar se conectar com o banco de dados ${err}`);
});

const PassaportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        //require: true
    },
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    birth: {
        type: String,
        require: true
    },
    group: {
        type: Array,
        require: true,
        default: []
    },
    photo: {
        type: String,
        require: true,
        default: 'default.png'
    }
});


userSchema.plugin(PassaportLocalMongoose, {usernameField: 'email'});
exports.user = mongoose.model('user', userSchema);


const eventSchema = new mongoose.Schema({
   id: {
       type: Number,
   },
   name: {
       type: String,
       required: true
   },
   description: {
       type: String,
       required: false
   },
   type: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    }
});

exports.event = mongoose.model('event', eventSchema);