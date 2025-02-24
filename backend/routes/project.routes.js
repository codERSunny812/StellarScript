const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const { createProject, getProjects, getProject, editProject, deleteProject, saveProject } = require('../controller/project.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.get('/',(req,res)=>{
    res.send('Project Route')
}
);


router.post('/create',authMiddleware,[
    body('name').not().isEmpty().withMessage('Project name is required'),
    body('language').not().isEmpty().withMessage('Project language is required'),
],createProject);
router.post('/saveproject',authMiddleware,saveProject)
router.post('/getprojects',authMiddleware,getProjects)
router.post('/getproject',authMiddleware,getProject)
router.post('/updateproject',authMiddleware,editProject)
router.post('/deleteproject',authMiddleware,deleteProject)




module.exports = router;
