const mongoose = require('mongoose');

// const connect = () => {
//     return mongoose.connect('mongodb://localhost:27017/test');
// } ;

// module.exports = connect;

module.exports = () => {
    return mongoose.connect('mongodb://localhost:27017/test');
}