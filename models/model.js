const mongoose = require('mongoose');
// uncommenyt if need oid
// var Schema = mongoose.Schema,
//     ObjectId = Schema.ObjectId;

const memberSchema = mongoose.Schema({
    id:     Number,
    post:   String
});
let Member = mongoose.model('members',memberSchema);

module.exports = {
    Member:Member
}