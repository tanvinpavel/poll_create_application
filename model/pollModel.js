const {Schema, model} = require('mongoose');

const pollSchema = Schema({
    title: {
        type: String,
        require: true,
        trim: true  
    },
    description: {
        type: String,
        trim: true
    },
    totalVote: {
        type: Number,
        default: 0
    },
    options: {
        type: [{
            name: String,
            vote: {
                type: Number,
                default: 0
            }
        }]
    }
})

const polls = new model('poll', pollSchema);

module.exports = polls;