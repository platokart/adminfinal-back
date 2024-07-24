const {GridFSBucket,ObjectID}=require("mongodb");

exports.addConsultantPage=async(req,res)=> {
    res.status(200).json({message:'show the add consultant page'});
}

exports.addConsultantDetails=async(req,res)=> {
    try {
        const {
            firstName,
            lastName,
            contact,
            orgName,
            industry,
            designation,
            functionName,
            skills,
            yearsOfExperience,
            highestEducation,
            yearOfPassing,
            instituteName,
          } = req.body;
          const photo = req.files['photo'] ? req.files['photo'][0] : null;
          const photoId = photo ? await uploadFileToGridFS(photo) : null;

        const basicDetails = {
        photo : photoId,
        firstName,
        lastName,
        contact,
        orgName,
        industry,
        designation,
        functionName,
        skills,
        yearsOfExperience,
        highestEducation,
        yearOfPassing,
        instituteName,
        registrationStatus:'approved',
        };
        const result=await mongoose.connection.db.collection('consultants').insertOne(basicDetails);
        res.status(201).json({message:'Consultant stored successfully'});
    } catch(error) {
        res.status(500).json({message:'An error occured while adding the consultant', error:error.message});
    }
}