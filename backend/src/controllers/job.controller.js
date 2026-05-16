import { Job } from "../models/job.model.js"

const postJob = async (req, res) => {
    try {
       const { title, description, requirement, salary, location, jobType, experience, position, companyId } = req.body || {};
       const userId = req.id;
       if(!title || !description || !requirement || !salary || !location || !jobType || !experience || !position || !companyId){
        return res.status(400).json({
            message: "Something is missing",
            success: false
        })
       }

       const job = await Job.create({
        title,
        description,
        requirement: requirement.split(","),
        salary: Number(salary),
        location,
        jobType,
        experience,
        position,
        company: companyId,
        createdBy: userId
       });

       return res.status(201).json({
        message: "New job created successfully",
        job,
        success :true
       })

    } catch (error) {
        console.log(error);
        
    }
}

const getJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: {$regex: keyword, $options: "i"} },
                { description: {$regex: keyword, $options: "i"} }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if(!jobs){
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);   
    }
}

const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application"
        })

        if(!job){
            return res.status(404).json({
                message: "job not found",
                success: true
            })
        };

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

// admin
const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({createdBy: adminId}).populate({
            path: "company",
            createdAt: -1
        })
        if(!jobs){
            return res.status(404).json({
                message: "jobs not found",
                success: true
            })
        };

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

const updateJob = async (req, res) => {
    try {
        const { title, description, requirement, salary, location, jobType, experience, position } = req.body;
        const jobId = req.params.id;

        const updateData = {
            title,
            description,
            requirement: requirement ? requirement.split(",") : undefined,
            salary,
            location,
            jobType,
            experience,
            position
        };

        // Remove undefined fields
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully",
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export {
    postJob,
    getJob,
    getJobById,
    getAdminJobs,
    updateJob
} 