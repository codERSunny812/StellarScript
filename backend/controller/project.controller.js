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


// Function to calculate similarity between two code submissions
const calculateSimilarity = (hash1, hash2) => {
    let matches = 0;
    for (let i = 0; i < hash1.length; i++) {
        if (hash1[i] === hash2[i]) matches++;
    }
    return (matches / hash1.length) * 100;
};



module.exports.createProject = async (req, res) => {
    try {
        const {name,description,language,code,token,version} = req.body;

        const user = req.user; // Already extracted from middleware


        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        console.log(user)

     

        const project = new projectModel({
            projectName:name,
            projectDescription:description,
            projectLanguage:language,
            projectCode:code || getStartupCode(language),
            createdBy:user,
            version:version
        })

        await project.save()


        return res.status(200).json({
            success:true,
            message:"Project created successfully",
            projectId:project._id,
            data:project,
            projectId: project._id,
            version:version
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message})   
    }
}


module.exports.saveProject = async(req,res)=>{
try {
    const { projectId,code} = req.body;
    
    const user = req.user;

    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })
    }

    let project = await projectModel.findById(projectId);

    if (!project) {
        return res.status(404).json({ success: false, msg: "Project not found" });
    }

    // Ensure the user owns the project
    if (project.createdBy.toString() !== user._id.toString()) {
        return res.status(403).json({ success: false, msg: "Unauthorized" });
    }

    project.projectCode = code;
    await project.save();

    return res.status(200).json({
        success:true,
        message:"Project saved successfully",
        data:project
    })
} catch (error) {
    return res.status(500).json({
        success: false,
        msg: error.message
    })
}
}


module.exports.getProjects = async (req, res) => {
    try {

        let { token } = req.body;
        const user = req.user;

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
        const user = req.user;


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

        let {projectId } = req.body;
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        let project = await projectModel.findOneAndDelete({ _id: projectId });
        
        if (!project) {
            return res.status(404).json({ success: false, msg: "Project not found" });
        }
        
        if (project.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({ success: false, msg: "Unauthorized" });
        }
        

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
       
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        };

        let project = await projectModel.findById(projectId );

        if (!project) {
            return res.status(404).json({ success: false, msg: "Project not found" });
        }

        if (project.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({ success: false, msg: "Unauthorized" });
        }


        if (project) {
            project.projectName = name;
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