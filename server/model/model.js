var mongoose= require('mongoose');
var Schema= mongoose.Schema;

const userSchema = new Schema({
    unique_id: Number,
    username : String,
    password : String,
    password_confirmation: String
});

User = mongoose.model('User', userSchema);

module.exports = User;