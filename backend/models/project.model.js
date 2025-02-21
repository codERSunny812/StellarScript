const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        // required: true
    },
    projectLanguage: {
        type: String,
        required: true,
        enum: ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'HTML/CSS', 'Other']
    },
    projectCode: {
        type: String,
        // required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    projectDate: {
        type: Date,
        default: Date.now
    },
   
});

const projectModel= mongoose.model('projectModel', projectSchema);


module.exports = projectModel;