const mongoose = require('mongoose');

const entity1Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    entities2: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entity2'
    }]
});

module.exports = mongoose.model('Entity1', entity1Schema);
