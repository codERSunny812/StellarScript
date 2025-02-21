const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const { createProject, getProjects, getProject, updateProject, deleteProject, saveProject } = require('../controller/project.controller');


router.get('/',(req,res)=>{
    res.send('Project Route')
}
);


router.post('/create',[
    body('name').not().isEmpty().withMessage('Project name is required'),
    // body('description').not().isEmpty().withMessage('Project description is required'),
    body('language').not().isEmpty().withMessage('Project language is required'),
    // body('code').not().isEmpty().withMessage('Project code is required'),
    body('token').not().isEmpty().withMessage('Token is required')
],createProject);
router.post('/saveproject',saveProject)
router.post('/getprojects',getProjects)
router.post('/getproject',getProject)




module.exports = router;
