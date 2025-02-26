const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
    },
    projectLanguage: {
        type: String,
        required: true,
        enum: ['python', 'javascript', 'java', 'c++', 'c#', 'go','other']
    },
    projectCode: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    projectDate: {
        type: Date,
        default: Date.now
    },
    version:{
        type:String,
        required:true
    }
   
});

const projectModel= mongoose.model('projectModel', projectSchema);


module.exports = projectModel;