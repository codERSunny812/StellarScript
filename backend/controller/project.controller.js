const projectModel = require("../models/project.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");



function getStartupCode(language) {
    if (language.toLowerCase() === "python") {
        return `print("Hello World")`;
    } else if (language.toLowerCase() === "java") {
        return `public class Main { public static void main(String[] args) { System.out.println("Hello World"); } }`;
    } else if (language.toLowerCase() === "javascript") {
        return `console.log("Hello World");`;
    } else if (language.toLowerCase() === "c++") {
        return `#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}`;
    } else if (language.toLowerCase() === "c") {
        return `#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}`;
    } else if (language.toLowerCase() === "go") {
        return `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}`;
    } else if (language.toLowerCase() === "bash") {
        return `echo "Hello World"`;
    } else {
        return `Language not supported`;
    }
}



module.exports.createProject = async (req, res) => {
    try {
        const {name,description,language,code,token} = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById({_id:decoded._id});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        const project = new projectModel({
            projectName:name,
            projectDescription:description,
            projectLanguage:language,
            projectCode:getStartupCode(language),
            createdBy:user
        })


        return res.status(200).json({
            success:true,
            message:"Project created successfully",
            data:await project.save()
        })


    } catch (error) {
        return res.status(500).json({
            sucess: false,
            msg: error.message})   
    }
}


module.exports.saveProject = async(req,res)=>{
try {
    const {token, projectId,code} = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById({_id:decoded._id});

    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })
    }

    let project = await projectModel.findById
    ({_id:projectId});

    project.projectCode = code;
    await project.save();

    return res.status(200).json({
        success:true,
        message:"Project saved successfully",
        data:project
    })
} catch (error) {
    return res.status(500).json({
        sucess: false,
        msg: error.message
    })
}
}


module.exports.getProjects = async (req, res) => {
    try {

        let { token } = req.body;
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await userModel.findOne({ _id: decoded._id });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        let projects = await projectModel.find({ createdBy: user._id });

        return res.status(200).json({
            success: true,
            msg: "Projects fetched successfully",
            projects: projects
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};


module.exports.getProject = async (req, res) => {
    try {
        let { token, projectId } = req.body;
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await userModel.findOne({ _id: decoded._id});


        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        let project = await projectModel.findOne({ _id: projectId });


        if (project) {
            return res.status(200).json({
                success: true,
                msg: "Project fetched successfully",
                project: project
            });
        }
        else {
            return res.status(404).json({
                success: false,
                msg: "Project not found"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

exports.deleteProject = async (req, res) => {
    try {

        let { token, projectId } = req.body;
        let decoded = jwt.verify(token, secret);
        let user = await userModel.findOne({ _id: decoded.userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        let project = await projectModel.findOneAndDelete({ _id: projectId });

        return res.status(200).json({
            success: true,
            msg: "Project deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

exports.editProject = async (req, res) => {
    try {

        let { token, projectId, name } = req.body;
        let decoded = jwt.verify(token, secret);
        let user = await userModel.findOne({ _id: decoded.userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        };

        let project = await projectModel.findOne({ _id: projectId });
        if (project) {
            project.name = name;
            await project.save();
            return res.status(200).json({
                success: true,
                msg: "Project edited successfully"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                msg: "Project not found"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};