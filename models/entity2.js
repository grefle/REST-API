const mongoose = require('mongoose');

const entity2Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    entities1: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entity1'
    }]
});

module.exports = mongoose.model('Entity2', entity2Schema);
